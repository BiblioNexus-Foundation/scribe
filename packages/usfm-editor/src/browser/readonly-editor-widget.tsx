import * as React from '@theia/core/shared/react';
import {
  injectable,
  postConstruct,
  inject,
} from '@theia/core/shared/inversify';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import { Message } from '@phosphor/messaging';
import URI from '@theia/core/lib/common/uri';
import { FileService } from '@theia/filesystem/lib/browser/file-service';
import LexicalEditor from './lexical-editor';
import { Emitter } from '@theia/core';
import { Usj } from '@biblionexus-foundation/scripture-utilities';
import { VerseRefUtils, VerseRefValue } from '@scribe/theia-utils/lib/browser';

@injectable()
export class ReadOnlyEditorWidget extends ReactWidget {
  static readonly ID = 'readonly-editor-widget';
  static readonly LABEL = 'Source Editor';

  private lastVerseRef: VerseRefValue | null = null;
  private bookId: string;
  private currentUsj: Usj | null = null;
  protected uri: URI | undefined;
  protected fileContent: string = '';
  protected processedContent: any = null;

  @inject(FileService)
  protected readonly fileService: FileService;

  @inject(VerseRefUtils)
  protected readonly verseRefUtils: VerseRefUtils;

  @postConstruct()
  protected init(): void {
    this.id = ReadOnlyEditorWidget.ID;
    this.title.closable = true;
    this.title.iconClass = 'fa fa-book-reader';
    this.update();

    this.setupVerseRefMonitoring();
  }

  private setupVerseRefMonitoring(): void {
    if (this.verseRefUtils) {
      this.verseRefUtils.getVerseRef().then((verseRef) => {
        this.lastVerseRef = verseRef;
        console.log('ReadOnly: Initial verse ref:', verseRef);
      });

      this.verseRefUtils.onVerseRefChange((verseRef) => {
        const wasExternalChange =
          !this.lastVerseRef ||
          this.lastVerseRef.book !== verseRef.book ||
          this.lastVerseRef.chapter !== verseRef.chapter ||
          this.lastVerseRef.verse !== verseRef.verse;

        this.lastVerseRef = verseRef;

        if (!wasExternalChange) {
          console.log('ReadOnly: Verse reference updated:', verseRef);
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
    this.title.label = `Source: ${fileName}`;
    this.title.caption = `Source: ${fileName}`;
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
    this.title.label = `Source: ${fileName}`;
    this.title.caption = `Source: ${fileName}`;

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

    this.update();
  }

  protected async getBookID(): Promise<void> {
    if (this.uri) {
      console.log('ReadOnly: Getting book ID from URI:', this.uri);
      const path = this.uri.path.toString();
      const parts = path.split('/');
      this.bookId = parts[parts.length - 1].split('.')[0];
      console.log('ReadOnly: Book:', this.bookId);
    }
  }

  protected async readFile(): Promise<void> {
    if (this.uri) {
      console.log('ReadOnly: Reading file:', this.uri);
      try {
        const content = await this.fileService.read(this.uri);
        this.fileContent = content.value;
      } catch (error) {
        console.error('ReadOnly: Error reading file:', error);
        this.fileContent = '{"type":"USJ","version":"3.1","content":[]}';
      }
    }
  }

  protected async parseContent(): Promise<void> {
    try {
      this.processedContent = JSON.parse(this.fileContent);
      console.log('ReadOnly: Processed content received');
    } catch (error) {
      console.error('ReadOnly: Error parsing content:', error);
      this.processedContent = { type: 'USJ', version: '3.1', content: [] };
    }
  }

  handleUsjUpdate = (newUsj: Usj) => {
    console.log('ReadOnly: Usj updated (unexpected)', newUsj);
    this.currentUsj = newUsj;
  };

  protected render(): React.ReactNode {
    return (
      <div className='readonly-editor-widget'>
        {this.processedContent && (
          <LexicalEditor
            usjInput={this.processedContent}
            isDirty={false}
            onDirtyChangedEmitter={new Emitter<void>()}
            onUsjUpdate={this.handleUsjUpdate}
            verseRefUtils={this.verseRefUtils}
            readOnly={true}
          />
        )}
      </div>
    );
  }

  protected onActivateRequest(msg: Message): void {
    super.onActivateRequest(msg);
    this.node.focus();

    setTimeout(() => {
      const editorElement = this.node.querySelector(
        '.lexical-editor-container .editor-wrapper'
      );
      if (editorElement) {
        (editorElement as HTMLElement).focus();
      }
    }, 50);
  }
}
