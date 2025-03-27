import * as React from "@theia/core/shared/react";
import { ReactWidget } from "@theia/core/lib/browser/widgets/react-widget";
import { injectable, postConstruct, inject } from "@theia/core/shared/inversify";
import { Message } from "@phosphor/messaging";
import URI from "@theia/core/lib/common/uri";
import { FileService } from "@theia/filesystem/lib/browser/file-service";
import {
  FileProcessorService,
  FileProcessorServiceInterface,
} from "../common/file-processor-protocol";
import LexicalEditor from "./lexical-editor";
import { Saveable, SaveOptions } from "@theia/core/lib/browser";
import { Emitter, Event } from "@theia/core";
import { Usj } from "@biblionexus-foundation/scripture-utilities";

@injectable()
export class CustomFileWidget extends ReactWidget implements Saveable {
  dirty: boolean = false;
  public readonly onDirtyChangedEmitter = new Emitter<void>();
  public readonly onContentChangedEmitter = new Emitter<void>();
  onDirtyChanged: Event<void> = this.onDirtyChangedEmitter.event;
  onContentChanged: Event<void> = this.onContentChangedEmitter.event;
  autosave: "off";

  async save(options?: SaveOptions): Promise<void> {
    console.log("Frontend: Save called?");
    if (this.currentUsj && this.uri) {
      console.log("Frontend: Saving file");
      try {
        await this.serializeContent();
        // Save the USFM content to file
        console.log("Frontend: Writing to file:", this.uri, this.editedUsj);
        await this.fileService.write(this.uri, this.editedUsj);
        // await this.fileService.write(fileToWrite, content);

        this.dirty = false;
        this.onDirtyChangedEmitter.fire(undefined);
        console.log("File saved successfully");
      } catch (error) {
        console.error("Error saving file:", error);
        throw error;
      }
    }
  }
  private editedUsj: string;
  private bookId: string;
  private currentUsj: Usj | null = null;
  static readonly ID = "custom-file-widget";
  static readonly LABEL = `${CustomFileWidget.ID} Widget`;

  protected uri: URI | undefined;
  protected fileContent: string = "";
  protected processedContent: any = null;

  @inject(FileService)
  protected readonly fileService: FileService;

  @inject(FileProcessorService)
  protected readonly fileProcessorService: FileProcessorServiceInterface;

  @postConstruct()
  protected init(): void {
    this.id = CustomFileWidget.ID;
    this.title.closable = true;
    this.update();
  }

  public async setUri(uri: URI): Promise<void> {
    this.uri = uri;
    await this.getBookID();

    const fileName = uri.path.base;
    this.title.label = fileName;
    this.title.caption = fileName;
    await this.readFile();
    await this.parseContent();
    this.update();
  }

  protected async getBookID(): Promise<void> {
    if (this.uri) {
      console.log("Frontend: Getting book ID from URI:", this.uri);
      const path = this.uri.path.toString();
      const parts = path.split("/");
      this.bookId = parts[parts.length - 1].split(".")[0];
      console.log("Frontend: Book:", this.bookId);
    }
  }
  protected async readFile(): Promise<void> {
    if (this.uri) {
      console.log("Frontend: Reading file:", this.uri);
      const content = await this.fileService.read(this.uri);
      this.fileContent = content.value;
    }
  }

  protected async parseContent(): Promise<void> {
    console.log("Frontend: parseContent called", this.fileContent);
    this.processedContent = JSON.parse(this.fileContent);
    console.log("Frontend: Processed content received");
    this.dirty = true;
    this.onDirtyChangedEmitter.fire(undefined);
  }

  protected async serializeContent(): Promise<void> {
    console.log("Frontend: serializeContent called");
    if (this.currentUsj) {
      // const usfm = await this.fileProcessorService.serializeUsj(
      //   this.currentUsj
      // );
      const usj = JSON.stringify(this.currentUsj);
      this.editedUsj = usj;
      console.log("Frontend: Serialized content:", usj);
    }
  }

  protected makeDirty(): void {
    this.dirty = true;
    this.onDirtyChangedEmitter.fire(undefined);
  }
  handleUsjUpdate = (newUsj: Usj) => {
    console.log("Usj updated", newUsj);
    this.currentUsj = newUsj;
    this.dirty = true;
    this.onDirtyChangedEmitter.fire(undefined);
  };
  protected render(): React.ReactNode {
    return (
      <div className="custom-file-widget">
        {this.processedContent && (
          <LexicalEditor
            usjInput={this.processedContent}
            isDirty={this.dirty}
            onDirtyChangedEmitter={this.onDirtyChangedEmitter}
            onUsjUpdate={this.handleUsjUpdate}
          />
        )}
      </div>
    );
  }
  protected onActivateRequest(msg: Message): void {
    super.onActivateRequest(msg);
    this.node.focus();
  }
}
