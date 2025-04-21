import { injectable, inject } from '@theia/core/shared/inversify';
import {
  KeybindingContribution,
  KeybindingRegistry,
  KeyCode,
} from '@theia/core/lib/browser';
import { Command, CommandRegistry, CommandContribution } from '@theia/core';
import { LexicalEditorKeybindingContext } from './lexical-editor-keybinding-context';

export const LEXICAL_CUT_COMMAND: Command = { id: 'lexical-editor:cut' };
export const LEXICAL_COPY_COMMAND: Command = { id: 'lexical-editor:copy' };
export const LEXICAL_PASTE_COMMAND: Command = { id: 'lexical-editor:paste' };
export const LEXICAL_UNDO_COMMAND: Command = { id: 'lexical-editor:undo' };
export const LEXICAL_REDO_COMMAND: Command = { id: 'lexical-editor:redo' };

@injectable()
export class LexicalEditorKeybindingContribution
  implements KeybindingContribution, CommandContribution
{
  @inject(LexicalEditorKeybindingContext)
  protected readonly keybindingContext: LexicalEditorKeybindingContext;

  registerKeybindings(registry: KeybindingRegistry): void {
    const whenActiveEditor = "activeEditorId == 'custom-file-widget'";

    registry.registerKeybinding({
      command: LEXICAL_CUT_COMMAND.id,
      keybinding: 'ctrl+x',
      when: whenActiveEditor,
    });

    registry.registerKeybinding({
      command: LEXICAL_COPY_COMMAND.id,
      keybinding: 'ctrl+c',
      when: whenActiveEditor,
    });

    registry.registerKeybinding({
      command: LEXICAL_PASTE_COMMAND.id,
      keybinding: 'ctrl+v',
      when: whenActiveEditor,
    });

    registry.registerKeybinding({
      command: LEXICAL_UNDO_COMMAND.id,
      keybinding: 'ctrl+z',
      when: whenActiveEditor,
    });

    registry.registerKeybinding({
      command: LEXICAL_REDO_COMMAND.id,
      keybinding: 'ctrl+shift+z',
      when: whenActiveEditor,
    });

    registry.registerKeybinding({
      command: LEXICAL_REDO_COMMAND.id,
      keybinding: 'ctrl+y',
      when: whenActiveEditor,
    });
  }

  registerCommands(registry: CommandRegistry): void {
    registry.registerCommand(LEXICAL_CUT_COMMAND, {
      execute: () => {
        console.log('Intercepted shortcut: Cut (Ctrl+X)');
        /* No-op, let the event pass through */
      },
    });

    registry.registerCommand(LEXICAL_COPY_COMMAND, {
      execute: () => {
        console.log('Intercepted shortcut: Copy (Ctrl+C)');
        /* No-op, let the event pass through */
      },
    });

    registry.registerCommand(LEXICAL_PASTE_COMMAND, {
      execute: () => {
        console.log('Intercepted shortcut: Paste (Ctrl+V)');
        /* No-op, let the event pass through */
      },
    });

    registry.registerCommand(LEXICAL_UNDO_COMMAND, {
      execute: () => {
        console.log('Intercepted shortcut: Undo (Ctrl+Z)');
        /* No-op, let the event pass through */
      },
    });

    registry.registerCommand(LEXICAL_REDO_COMMAND, {
      execute: () => {
        console.log('Intercepted shortcut: Redo (Ctrl+Shift+Z/Ctrl+Y)');
        /* No-op, let the event pass through */
      },
    });
  }
}
