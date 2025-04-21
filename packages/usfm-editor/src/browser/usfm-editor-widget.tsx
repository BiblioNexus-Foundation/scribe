import * as React from 'react';
import {
  injectable,
  postConstruct,
  inject,
} from '@theia/core/shared/inversify';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import { MessageService } from '@theia/core';
import { Message } from '@theia/core/lib/browser';
import { Emitter } from '@theia/core';
import { Usj } from '@biblionexus-foundation/scripture-utilities';
import LexicalEditor from './lexical-editor';
import { VerseRefUtils } from '@scribe/theia-utils/lib/browser';

@injectable()
export class UsfmEditorWidget extends ReactWidget {
  static readonly ID = 'usfm-editor:widget';
  static readonly LABEL = 'USFM Editor';

  @inject(MessageService)
  protected readonly messageService!: MessageService;

  @inject(VerseRefUtils)
  protected readonly verseRefUtils!: VerseRefUtils;

  protected usj: Usj | undefined;
  protected isDirty = false;
  protected readonly onDirtyChangedEmitter = new Emitter<void>();

  @postConstruct()
  protected init(): void {
    this.doInit();
  }

  protected async doInit(): Promise<void> {
    this.id = UsfmEditorWidget.ID;
    this.title.label = UsfmEditorWidget.LABEL;
    this.title.caption = UsfmEditorWidget.LABEL;
    this.title.closable = true;
    this.title.iconClass = 'fa fa-book';

    this.usj = {
      type: 'USJ',
      version: '3.1',
      content: [],
    };

    this.update();
    this.open();
  }

  render(): React.ReactElement {
    return (
      <div id='usfm-editor-container' className='usfm-editor-container'>
        <LexicalEditor
          usjInput={this.usj}
          isDirty={this.isDirty}
          onDirtyChangedEmitter={this.onDirtyChangedEmitter}
          onUsjUpdate={this.handleUsjUpdate}
          verseRefUtils={this.verseRefUtils}
        />
      </div>
    );
  }

  protected handleUsjUpdate = (newUsj: Usj): void => {
    this.usj = newUsj;
    this.isDirty = true;
    this.onDirtyChangedEmitter.fire();
  };

  protected onActivateRequest(msg: Message): void {
    super.onActivateRequest(msg);
    const editorContainer = document.getElementById('usfm-editor-container');
    if (editorContainer) {
      editorContainer.focus();
    }
  }

  public loadContent(usj: Usj): void {
    this.usj = usj;
    this.isDirty = false;
    this.update();
  }

  public getContent(): Usj | undefined {
    return this.usj;
  }

  public isDirtyContent(): boolean {
    return this.isDirty;
  }

  public open(): void {
    this.activate();
  }
}
