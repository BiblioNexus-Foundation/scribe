import { injectable, inject } from '@theia/core/shared/inversify';
import { KeybindingContext, ApplicationShell } from '@theia/core/lib/browser';
import { CommandService } from '@theia/core/lib/common/command';
import { CustomFileWidget } from './custom-file-widget';

@injectable()
export class LexicalEditorKeybindingContext implements KeybindingContext {
  static readonly ID = 'lexical-editor-keybinding-context';
  readonly id = LexicalEditorKeybindingContext.ID;

  @inject(ApplicationShell)
  protected readonly shell: ApplicationShell;

  isEnabled(): boolean {
    const activeWidget = this.shell.activeWidget;

    if (activeWidget && activeWidget.id === CustomFileWidget.ID) {
      return true;
    }
    return false;
  }
}
