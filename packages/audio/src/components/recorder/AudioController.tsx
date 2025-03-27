import { FFmpegServer, RecordingOptions } from "../../common/audio-protocol";

export class AudioController {
  private isRecording: boolean = false;
  private isPaused: boolean = false;
  private audioFile: string | undefined = undefined;
  private selectedDevice: string | null = null;
  private devices: Array<{ name: string; alternativeName: string }> = [];

  constructor(private server: FFmpegServer) {}

  async startRecording(): Promise<void> {
    try {
      if (!this.isRecording) {
        const options: RecordingOptions = {
          sampleRate: 48000,
          channels: 1,
          format: "wav",
          storyId: Date.now(),
        };
        await this.server.startRecording(options);
        this.isRecording = true;
        this.isPaused = false;
        this.audioFile = undefined;
      }
    } catch (error) {
      console.error("Error starting recording:", error);
      throw error;
    }
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
