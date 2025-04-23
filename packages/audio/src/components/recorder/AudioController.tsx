import { FFmpegServer, RecordingOptions } from "../../common/audio-protocol";
import path from "path";

export class AudioController {
  private isRecording: boolean = false;
  private isPaused: boolean = false;
  private audioFile: string | undefined = undefined;
  private selectedDevice: string | null = null;
  private devices: Array<{ name: string; alternativeName: string }> = [];

  constructor(private server: FFmpegServer) {}

  // Enhanced createFolders method that returns the created paths
  async createFolders(
    bookName: string,
    chapter: string
  ): Promise<{ bookDir: string; chapterDir: string }> {
    if (!bookName) {
      throw new Error("Book name is required");
    }

    const outputDir = await this.server.getOutputDir();
    const bookDir = path.join(outputDir, bookName);

    // Create book directory if it doesn't exist
    await this.server.createFolder(bookDir);

    let chapterDir = bookDir;
    if (chapter) {
      chapterDir = path.join(bookDir, chapter);
      // Create chapter directory if it doesn't exist
      await this.server.createFolder(chapterDir);
    }

    return { bookDir, chapterDir };
  }

  async stopRecording(): Promise<string | undefined> {
    try {
      if (this.isRecording) {
        const audioFilePath = await this.server.stopRecording();
        this.audioFile = audioFilePath;
        this.isRecording = false;
        this.isPaused = false;
        return audioFilePath;
      }
      return undefined;
    } catch (error) {
      console.error("Error stopping recording:", error);
      throw error;
    }
  }

  async startRecording(bookName: string, chapter: string, verse: string): Promise<void> {
    try {
      if (!this.isRecording) {
        // Create the directory structure for book and chapter
        const { chapterDir } = await this.createFolders(bookName, chapter);

        const options: RecordingOptions = {
          sampleRate: 48000,
          channels: 1,
          format: "wav",
          storyId: `${chapter}_${verse}`,
          bookName: bookName,
          chapterDir: chapterDir, // Pass the chapter directory path
        };

        await this.server.startRecording(options);
        this.isRecording = true;
        this.isPaused = false;
        this.audioFile = undefined;
        return;
      }
      throw new Error("Recording is already in progress.");
    } catch (error) {
      console.error("Error starting recording:", error);
      throw error;
    }
  }

  // Rest of the AudioController methods remain the same
  async pauseRecording(): Promise<void> {
    try {
      if (this.isRecording && !this.isPaused) {
        await this.server.pauseRecording();
        this.isPaused = true;
      }
    } catch (error) {
      console.error("Error pausing recording:", error);
      throw error;
    }
  }

  async resumeRecording(): Promise<void> {
    try {
      if (this.isRecording && this.isPaused) {
        await this.server.resumeRecording();
        this.isPaused = false;
      }
    } catch (error) {
      console.error("Error resuming recording:", error);
      throw error;
    }
  }

  async getAudioDevices(): Promise<Array<{ name: string; alternativeName: string }>> {
    try {
      this.devices = await this.server.getAudioDevices();
      return this.devices;
    } catch (error) {
      console.error("Error getting audio devices:", error);
      throw error;
    }
  }

  async setSelectedDevice(alternativeName: string): Promise<void> {
    try {
      await this.server.setSelectedDevice(alternativeName);
      this.selectedDevice = alternativeName;
    } catch (error) {
      console.error("Error setting selected device:", error);
      throw error;
    }
  }

  // Getter methods for state
  getIsRecording(): boolean {
    return this.isRecording;
  }

  getIsPaused(): boolean {
    return this.isPaused;
  }

  getCurrentAudioFile(): string | undefined {
    return this.audioFile;
  }

  getSelectedDevice(): string | null {
    return this.selectedDevice;
  }

  getDevices(): Array<{ name: string; alternativeName: string }> {
    return this.devices;
  }
}
