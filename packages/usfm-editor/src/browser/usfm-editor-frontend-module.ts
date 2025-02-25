import { ContainerModule } from '@theia/core/shared/inversify';
import '../../src/browser/style/usfm-editor.css';
import '../../src/browser/style/nodes-menu.css';
import '../../src/browser/style/Modal.css';
import {
  OpenHandler,
  WidgetFactory,
  WebSocketConnectionProvider,
  FrontendApplicationContribution,
} from '@theia/core/lib/browser';

import { FileOpenHandler } from './file-opener-handler';
import { CustomFileWidget } from './custom-file-widget';
import {
  FileProcessorService,
  FileProcessorServiceInterface,
  FILE_PROCESSOR_PATH,
} from '../common/file-processor-protocol';

import '../../src/browser/style/index.css';
import { KeybindingContribution } from '@theia/core/lib/browser';
import { CommandContribution } from '@theia/core';
import { LexicalEditorKeybindingContribution } from './lexical-editor-keybinding-contribution';
import { LexicalEditorKeybindingContext } from './lexical-editor-keybinding-context';
import { KeybindingContext } from '@theia/core/lib/browser';

export const Saveable = Symbol('Saveable');
export default new ContainerModule((bind) => {
  bind(CustomFileWidget).toSelf();
  bind(WidgetFactory)
    .toDynamicValue((ctx) => ({
      id: CustomFileWidget.ID,
      createWidget: () => ctx.container.get<CustomFileWidget>(CustomFileWidget),
    }))
    .inSingletonScope();

  bind(FileOpenHandler).toSelf().inSingletonScope();
  bind(OpenHandler).toService(FileOpenHandler);

  bind(FileProcessorService)
    .toDynamicValue((ctx) => {
      const connection = ctx.container.get(WebSocketConnectionProvider);
      return connection.createProxy<FileProcessorServiceInterface>(
        FILE_PROCESSOR_PATH
      );
    })
    .inSingletonScope();

  bind(Saveable).toService(CustomFileWidget);

  // Bind the keybinding contribution
  bind(LexicalEditorKeybindingContribution).toSelf().inSingletonScope();
  bind(KeybindingContribution)
    .to(LexicalEditorKeybindingContribution)
    .inSingletonScope();
  bind(CommandContribution)
    .to(LexicalEditorKeybindingContribution)
    .inSingletonScope();

  // Add these lines to bind the keybinding context
  bind(LexicalEditorKeybindingContext).toSelf().inSingletonScope();
  bind(KeybindingContext).to(LexicalEditorKeybindingContext).inSingletonScope();
});
