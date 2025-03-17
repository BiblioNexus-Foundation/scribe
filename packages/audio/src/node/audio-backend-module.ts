import { injectable } from '@theia/core/shared/inversify';
import {
  FFmpegServer,
  RecordingOptions,
  FileNode,
} from '../common/audio-protocol';
import { spawn, execSync, ChildProcess } from 'child_process';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs/promises';
@injectable()
export class FFmpegServerImpl implements FFmpegServer {
  private recordingProcess: ChildProcess | null = null;
  private playbackProcess: ChildProcess | null = null;
  private currentOutputFile: string | null = null;
  private outputDir: string = '';
  private readonly ffmpegPath = this.getPlatformSpecificFFmpegPath();
  private tempRecordings: string[] = [];
  private isRecordingPaused: boolean = false;
  private currentStoryId: string | null = null;
  private segmentCounter: number = 1;
  private selectedDevice: string | null = null;
  public defaultWinDevices: string | null = null;

  constructor() {
    this.checkFFmpegInstallation();
    this.initializeDefaultWinDevices();
  }
  private async initializeDefaultWinDevices(): Promise<void> {
    try {
      const devices = await this.getAudioDevices();
      this.defaultWinDevices = devices[0]?.alternativeName || null;
      console.log(this.defaultWinDevices, 'defaultWinDevices');
    } catch (error) {
      console.error('Failed to initialize default Windows devices:', error);
    }
  }
  // Add method to set selected device
  async setSelectedDevice(device: string): Promise<void> {
    this.selectedDevice = device;
  }
  async setWorkspacePath(workspacePath: string): Promise<void> {
    try {
      this.outputDir = path.join(workspacePath, 'audio-recordings');
      await fs.mkdir(this.outputDir, { recursive: true });
      console.log('Audio recordings directory set to:', this.outputDir);
    } catch (error) {
      console.error('Failed to set workspace path:', error);
      throw error;
    }
  }
  async getFileTree(rootPath: string): Promise<FileNode> {
    const buildTree = async (dirPath: string): Promise<FileNode[]> => {
      try {
        const entries = await fs.readdir(dirPath, { withFileTypes: true });
        const items = await Promise.all(
          entries.map(async (entry) => {
            const fullPath = path.join(dirPath, entry.name);
            if (entry.isDirectory()) {
              const children = await buildTree(fullPath);
              return {
                name: entry.name,
                type: 'folder' as const,
                path: fullPath,
                children,
              };
            } else {
              return {
                name: entry.name,
                type: 'file' as const,
                path: fullPath,
              };
            }
          }),
        );
        return items;
      } catch (error) {
        console.error('Error reading directory:', dirPath, error);
        return [];
      }
    };
    try {
      const audioFolder = path.join(rootPath, 'audio-recordings');
      await fs.access(audioFolder);
      const children = await buildTree(audioFolder);
      return {
        name: 'audio-recordings',
        type: 'folder',
        path: audioFolder,
        children,
      };
    } catch (error) {
      console.error('Failed to get file tree:', error);
      throw error;
    }
  }
  async getAudioFiles(): Promise<string[]> {
    try {
      const files = await fs.readdir(this.outputDir);
      return files
        .filter((file) => file.endsWith('.wav'))
        .map((file) => path.join(this.outputDir, file));
    } catch (error) {
      console.error('Error reading audio files:', error);
      return [];
    }
  }
  async startRecording(options: RecordingOptions = {}): Promise<string> {
    this.validateOutputDir();
    if (this.recordingProcess && !this.isRecordingPaused) {
      throw new Error('Recording already in progress');
    }
    const audioInput = this.getAudioInputFormat();
    console.log(audioInput, 'audioInput');
    this.currentStoryId = options.storyId?.toString() ?? 'default';
    if (!this.isRecordingPaused && this.tempRecordings.length === 0) {
      this.segmentCounter = 1;
    }
    if (!this.isRecordingPaused) {
      this.currentOutputFile = path.join(
        this.outputDir,
        `temp_${this.segmentCounter.toString().padStart(3, '0')}_story-${
          this.currentStoryId
        }.wav`,
      );
    }
    const command = [
      '-f',
      audioInput.format,
      '-i',
      audioInput.device,
      '-thread_queue_size',
      '4096',
      '-acodec',
      'pcm_s24le',
      '-ar',
      '48000',
      '-ac',
      '1',
      '-avoid_negative_ts',
      'make_zero',
      '-y',
      this.currentOutputFile!,
    ];
    if (os.platform() === 'win32') {
      command.splice(2, 0, '-audio_buffer_size', '50');
    }
    return new Promise((resolve, reject) => {
      try {
        this.recordingProcess = spawn(this.ffmpegPath, command);
        this.isRecordingPaused = false;
        this.recordingProcess.stderr?.on('data', (data) => {
          console.log('FFmpeg stderr:', data.toString());
        });
        this.recordingProcess.on('error', (err) => {
          console.error('Recording process error:', err);
          this.recordingProcess = null;
          this.currentOutputFile = null;
          reject(new Error(`Recording failed: ${err.message}`));
        });
        if (this.currentOutputFile) {
          resolve(this.currentOutputFile);
        } else {
          reject(new Error('Output file path is null'));
        }
      } catch (error) {
        console.error('Failed to start recording:', error);
        this.recordingProcess = null;
        this.currentOutputFile = null;
        reject(error);
      }
    });
  }

  async stopRecording(): Promise<string> {
    if (!this.recordingProcess) {
      throw new Error('No recording in progress');
    }

    const currentProcess = this.recordingProcess;
    let processExited = false;

    const killProcess = async (): Promise<void> => {
      return new Promise((resolve, reject) => {
        let exitHandled = false;

        const handleExit = () => {
          if (exitHandled) return;
          exitHandled = true;
          processExited = true;
          this.recordingProcess = null;
          resolve();
        };

        currentProcess.on('exit', handleExit);
        currentProcess.on('error', (err) => {
          if (!exitHandled) {
            exitHandled = true;
            reject(new Error(`Process error: ${err.message}`));
          }
        });

        if (os.platform() === 'win32') {
          try {
            execSync(`taskkill /pid ${currentProcess.pid} /T /F`);
          } catch (err) {
            if (!processExited) {
              currentProcess.kill('SIGKILL');
            }
          }
        } else {
          // On Unix-like systems, try graceful shutdown first
          try {
            currentProcess.stdin?.write('q');
          } catch (err) {
            // Continue with force termination if writing to stdin fails
          }

          const terminateProcess = async () => {
            if (processExited) return;

            try {
              currentProcess.kill('SIGTERM');
              await new Promise((resolve) => setTimeout(resolve, 500));

              if (!processExited) {
                currentProcess.kill('SIGKILL');
              }
            } catch (err) {
              // If process is already terminated, ignore errors
            }
          };

          terminateProcess();
        }

        // Global timeout for the entire termination process
        setTimeout(() => {
          if (!exitHandled) {
            exitHandled = true;
            reject(new Error('Process termination timed out'));
          }
        }, 2000);
      });
    };

    try {
      await killProcess();
      // Wait for filesystem to release handles
      await new Promise((resolve) =>
        setTimeout(resolve, os.platform() === 'win32' ? 1000 : 500),
      );

      if (!this.currentOutputFile) {
        throw new Error('No output file available');
      }

      // Verify the current output file exists
      await fs.stat(this.currentOutputFile);
      this.tempRecordings.push(this.currentOutputFile);
      this.currentOutputFile = null;

      if (this.tempRecordings.length === 0) {
        throw new Error('No recordings to process');
      }

      const finalOutputFile = path.join(
        this.outputDir,
        `story-${this.currentStoryId || 'default'}.wav`,
      );

      const sortedRecordings = [...this.tempRecordings].sort((a, b) => {
        const segmentA = parseInt(path.basename(a).split('_')[1]) || 0;
        const segmentB = parseInt(path.basename(b).split('_')[1]) || 0;
        return segmentA - segmentB;
      });

      const fileListPath = path.join(
        this.outputDir,
        `filelist_${Date.now()}.txt`,
      );
      await fs.writeFile(
        fileListPath,
        sortedRecordings.map((f) => `file '${f}'`).join('\n'),
      );

      await new Promise<void>((resolve, reject) => {
        const mergeProcess = spawn(this.ffmpegPath, [
          '-f',
          'concat',
          '-safe',
          '0',
          '-i',
          fileListPath,
          '-y',
          finalOutputFile,
        ]);

        mergeProcess.stderr?.on('data', () => {
          // Log stderr if needed for debugging
        });

        mergeProcess.on('close', async (code) => {
          try {
            if (code === 0) {
              await Promise.all([
                ...sortedRecordings.map((f) => fs.unlink(f)),
                fs.unlink(fileListPath),
              ]);
              resolve();
            } else {
              reject(new Error(`Merge process failed with code ${code}`));
            }
          } catch (error) {
            reject(error);
          }
        });
      });

      // Reset state
      this.tempRecordings = [];
      this.isRecordingPaused = false;
      this.currentStoryId = null;
      this.segmentCounter = 1;

      return finalOutputFile;
    } catch (error) {
      console.error('Error in stopRecording:', error);
      throw error;
    }
  }

  async pauseRecording(): Promise<string> {
    if (!this.recordingProcess || this.isRecordingPaused) {
      throw new Error('No active recording to pause');
    }

    const currentProcess = this.recordingProcess;
    let processExited = false;

    const killProcess = async (): Promise<void> => {
      return new Promise((resolve, reject) => {
        let exitHandled = false;

        const handleExit = () => {
          if (exitHandled) return;
          exitHandled = true;
          processExited = true;
          this.recordingProcess = null;
          resolve();
        };

        currentProcess.on('exit', handleExit);
        currentProcess.on('error', (err) => {
          if (!exitHandled) {
            exitHandled = true;
            reject(new Error(`Process error: ${err.message}`));
          }
        });

        if (os.platform() === 'win32') {
          try {
            execSync(`taskkill /pid ${currentProcess.pid} /T /F`);
          } catch (err) {
            if (!processExited) {
              currentProcess.kill('SIGKILL');
            }
          }
        } else {
          try {
            currentProcess.kill('SIGINT');

            setTimeout(() => {
              if (!processExited) {
                currentProcess.kill('SIGTERM');

                setTimeout(() => {
                  if (!processExited) {
                    currentProcess.kill('SIGKILL');
                  }
                }, 500);
              }
            }, 500);
          } catch (err) {
            // If process is already terminated, ignore errors
          }
        }

        setTimeout(() => {
          if (!exitHandled) {
            exitHandled = true;
            reject(new Error('Process termination timed out'));
          }
        }, 2000);
      });
    };

    try {
      await killProcess();
      await new Promise((resolve) =>
        setTimeout(resolve, os.platform() === 'win32' ? 1000 : 500),
      );

      if (!this.currentOutputFile) {
        throw new Error('No output file available');
      }

      await fs.stat(this.currentOutputFile);
      this.tempRecordings.push(this.currentOutputFile);

      this.isRecordingPaused = true;
      this.segmentCounter++;
      const currentFile = this.currentOutputFile;
      this.currentOutputFile = null;
      return currentFile;
    } catch (error) {
      console.error('Error in pauseRecording:', error);
      throw error;
    }
  }
  async resumeRecording(): Promise<string> {
    if (!this.isRecordingPaused) {
      throw new Error('No paused recording to resume');
    }
    this.currentOutputFile = path.join(
      this.outputDir,
      `temp_${this.segmentCounter.toString().padStart(3, '0')}_story-${
        this.currentStoryId
      }.wav`,
    );
    return this.startRecording({
      storyId: this.currentStoryId ? parseInt(this.currentStoryId) : undefined,
    });
  }
  getFFmpegPath(): Promise<string> {
    throw new Error('Method not implemented.');
  }
  setClient(client: void | undefined): void {
    throw new Error('Method not implemented.');
  }
  getClient?(): void | undefined {
    throw new Error('Method not implemented.');
  }
  private getPlatformSpecificFFmpegPath(): string {
    const ffmpegDir = path.resolve(__dirname, '../../../../ffmpeg');
    switch (os.platform()) {
      case 'win32':
        return path.join(ffmpegDir, 'win', 'ffmpeg.exe');
      case 'darwin':
        return path.join(ffmpegDir, 'mac', 'ffmpeg');
      case 'linux':
        return path.join(ffmpegDir, 'linux', 'ffmpeg');
      default:
        throw new Error('Unsupported OS platform for FFmpeg');
    }
  }
  async getSystemOS() {
    const currentOS = os.platform();
    console.log('current os', currentOS, os.version());
    return currentOS;
  }
  private async checkFFmpegInstallation(): Promise<void> {
    try {
      await fs.access(this.ffmpegPath, fs.constants.F_OK);
      if (os.platform() !== 'win32') {
        try {
          await fs.chmod(this.ffmpegPath, 0o755);
        } catch (chmodErr) {
          console.warn(
            'Warning: Failed to set executable permissions:',
            chmodErr,
          );
        }
      }
      await fs.access(this.ffmpegPath, fs.constants.X_OK);
      execSync(`${this.ffmpegPath} -version`);
    } catch (err) {
      console.error('FFmpeg installation check failed:', err);
      throw new Error('FFmpeg is not installed or not functioning correctly');
    }
  }

  private getAudioInputFormat(): { format: string; device: string } {
    switch (os.platform()) {
      case 'win32':
        console.log('selectedDevice', this.selectedDevice);
        return {
          format: 'dshow',
          device:
            'audio=' +
            (this.selectedDevice || this.defaultWinDevices || 'default'),
        };
      case 'linux':
        return { format: 'alsa', device: this.selectedDevice || 'default' };
      case 'darwin':
        return { format: 'avfoundation', device: this.selectedDevice || '0' };
      default:
        throw new Error('Unsupported OS platform for FFmpeg');
    }
  }
  private validateOutputDir(): void {
    if (!this.outputDir) {
      throw new Error(
        'Workspace path not set. Please call setWorkspacePath first.',
      );
    }
  }

  async getAudioDevices(): Promise<
    Array<{ name: string; alternativeName: string }>
  > {
    return new Promise((resolve, reject) => {
      try {
        const platform = os.platform();
        const command = [
          '-list_devices',
          'true',
          '-f',
          platform === 'darwin'
            ? 'avfoundation'
            : platform === 'win32'
            ? 'dshow'
            : 'alsa',
          '-i',
          platform === 'darwin' ? '' : 'dummy',
        ];

        const process = spawn(this.ffmpegPath, command);
        let output = '';

        process.stderr?.on('data', (data) => {
          output += data.toString();
        });

        process.on('close', (code) => {
          if (code === 0 || code === 1) {
            // FFmpeg may exit with code 1 for device listing
            const devices: Array<{ name: string; alternativeName: string }> =
              [];
            const lines = output.split('\n');

            let currentDevice: {
              name: string;
              alternativeName: string;
            } | null = null;

            for (let i = 0; i < lines.length; i++) {
              const line = lines[i].trim();

              // Match device name with (audio) designation
              const deviceMatch = line.match(/"([^"]+)".*?\(audio\)/);
              if (deviceMatch) {
                currentDevice = {
                  name: deviceMatch[1],
                  alternativeName: '',
                };
                continue;
              }

              // Match alternative name for the current device
              const alternativeMatch = line.match(
                /Alternative name "([^"]+)"|Alternative name (@[^"]+)/,
              );
              if (alternativeMatch && currentDevice) {
                currentDevice.alternativeName =
                  alternativeMatch[1] || alternativeMatch[2];
                devices.push(currentDevice);
                currentDevice = null;
              }
            }

            console.log('Found audio devices:', devices);
            resolve(devices);
          } else {
            reject(new Error('Failed to get audio devices'));
          }
        });

        process.on('error', (error) => {
          console.error('Error in FFmpeg process:', error);
          reject(error);
        });
      } catch (error) {
        console.error('Error getting audio devices:', error);
        reject(error);
      }
    });
  }
  async deleteFile(path: string): Promise<void> {
    try {
      await fs.unlink(path);
    } catch (error) {
      console.error('Failed to delete file:', error);
      throw error;
    }
  }
  async createFolder(path: string): Promise<void> {
    this.validateOutputDir();
    try {
      await fs.mkdir(path, { recursive: true });
    } catch (error) {
      console.error('Failed to create folder:', error);
      throw error;
    }
  }
  dispose(): void {
    if (this.recordingProcess) {
      this.recordingProcess.kill();
      this.recordingProcess = null;
    }
    if (this.playbackProcess) {
      this.playbackProcess.kill();
      this.playbackProcess = null;
    }
  }
}
