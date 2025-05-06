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
import { VerseRefUtils, VerseRefValue } from "@scribe/theia-utils/lib/browser";
import { BIBLE_BOOKS } from "../utils/books";

@injectable()
export class CustomFileWidget extends ReactWidget implements Saveable {
  dirty: boolean = false;
  public readonly onDirtyChangedEmitter = new Emitter<void>();
  public readonly onContentChangedEmitter = new Emitter<void>();
  onDirtyChanged: Event<void> = this.onDirtyChangedEmitter.event;
  onContentChanged: Event<void> = this.onContentChangedEmitter.event;
  autosave: "off";

  private lastVerseRef: VerseRefValue | null = null;
  private scope: Array<string> = [];

  async save(options?: SaveOptions): Promise<void> {
    if (this.currentUsj && this.uri) {
      try {
        await this.serializeContent();
        await this.fileService.write(this.uri, this.editedUsj);
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

  @inject(VerseRefUtils)
  protected readonly verseRefUtils: VerseRefUtils;

  @postConstruct()
  protected init(): void {
    this.id = CustomFileWidget.ID;
    this.title.closable = true;
    this.update();

    this.setupVerseRefMonitoring();
  }

  private setupVerseRefMonitoring(): void {
    if (this.verseRefUtils) {
      this.verseRefUtils.getVerseRef().then((verseRef) => {
        this.lastVerseRef = verseRef;
        console.log("Initial verse ref:", verseRef);
      });

      this.verseRefUtils.onVerseRefChange((verseRef) => {
        const wasExternalChange =
          !this.lastVerseRef ||
          this.lastVerseRef.book !== verseRef.book ||
          this.lastVerseRef.chapter !== verseRef.chapter ||
          this.lastVerseRef.verse !== verseRef.verse;

        this.lastVerseRef = verseRef;

        if (!wasExternalChange) {
          console.log("Editor updated the verse reference to:", verseRef);
        }
      });
    }
  }

  public async setUri(uri: URI): Promise<void> {
    this.uri = uri;
    await this.getBookID();

    if (this.bookId) {
      const currentVerseRef = await this.verseRefUtils.getVerseRef();
      if (currentVerseRef.book !== this.bookId) {
        await this.verseRefUtils.setVerseRef({
          book: this.bookId,
          chapter: 1,
          verse: 1,
        });
      }
    }

    const fileName = uri.path.base;
    this.title.label = fileName;
    this.title.caption = fileName;
    await this.readFile();
    await this.parseContent();
    this.update();
  }

  public async setDefaultContent(usj: Usj, uri: URI): Promise<void> {
    this.uri = uri;
    await this.getBookID();

    this.processedContent = usj;
    this.currentUsj = usj;

    const fileName = uri.path.base;
    this.title.label = fileName;
    this.title.caption = fileName;

    if (this.bookId) {
      const currentVerseRef = await this.verseRefUtils.getVerseRef();
      if (currentVerseRef.book !== this.bookId) {
        await this.verseRefUtils.setVerseRef({
          book: this.bookId,
          chapter: 1,
          verse: 1,
        });
      }
    }

    this.dirty = true;
    this.onDirtyChangedEmitter.fire(undefined);

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
    this.processedContent = JSON.parse(this.fileContent);
    console.log("Frontend: Processed content received");
    this.dirty = false;
    this.onDirtyChangedEmitter.fire(undefined);
  }

  protected async serializeContent(): Promise<void> {
    if (this.currentUsj) {
      const usj = JSON.stringify(this.currentUsj);
      this.editedUsj = usj;
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

  public setScope(scope: Array<string>): void {
    this.scope = scope;
  }

  protected render(): React.ReactNode {
    return (
      <div className="custom-file-widget">
        {this.processedContent && (
          <LexicalEditor
            usjInput={this.processedContent}
            isDirty={this.dirty}
            onDirtyChangedEmitter={this.onDirtyChangedEmitter}
            onUsjUpdate={this.handleUsjUpdate}
            verseRefUtils={this.verseRefUtils}
            scope={this.scope}
          />
        )}
      </div>
    );
  }

  protected onActivateRequest(msg: Message): void {
    super.onActivateRequest(msg);
    this.node.focus();

    setTimeout(() => {
      const editorElement = this.node.querySelector(".lexical-editor-container .editor-wrapper");
      if (editorElement) {
        (editorElement as HTMLElement).focus();
      }
    }, 50);
  }
}
