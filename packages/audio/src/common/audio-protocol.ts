import { RpcServer } from "@theia/core/lib/common/messaging/proxy-factory";

export const FFmpegPath = "/services/audio-recorder";
export const FFmpegServer = Symbol("FFmpegServer");

export interface RecordingOptions {
  sampleRate?: number;
  channels?: number;
  format?: string;
  device?: string;
  storyId?: string;
  filename?: string;
  bookName?: string;
  chapterDir?: string;
}

export interface FileNode {
  name: string;
  type: "file" | "folder";
  path: string;
  children?: FileNode[];
}

export interface FFmpegServer extends RpcServer<void> {
  setSelectedDevice(device: string): Promise<void>;
  startRecording(options?: RecordingOptions): Promise<string>;
  stopRecording(): Promise<string>;
  getFFmpegPath(): Promise<string>;
  getAudioFiles(): Promise<string[]>;
  deleteFile(path: string): Promise<void>;
  createFolder(path: string): Promise<void>;
  setWorkspacePath(path: string): Promise<void>;
  resumeRecording(): Promise<string>;
  pauseRecording(): Promise<string>;
  getSystemOS(): Promise<string>;
  getAudioDevices(): Promise<Array<{ name: string; alternativeName: string }>>;
  openAudioSettings(): Promise<void>;
  getOutputDir(): Promise<string>;
}
