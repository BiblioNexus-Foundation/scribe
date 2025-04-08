import { injectable } from '@theia/core/shared/inversify';
import { MenuModelRegistry } from '@theia/core';
import { AudioPlayerWidget } from './audio-player-widget';
import { AbstractViewContribution } from '@theia/core/lib/browser';
import { Command, CommandRegistry } from '@theia/core/lib/common/command';

export const AudioPlayerCommand: Command = { id: 'audio-player:command' };

@injectable()
export class AudioPlayerContribution extends AbstractViewContribution<AudioPlayerWidget> {
  constructor() {
    super({
      widgetId: AudioPlayerWidget.ID,
      widgetName: AudioPlayerWidget.LABEL,
      defaultWidgetOptions: { area: 'bottom' },
      toggleCommandId: AudioPlayerCommand.id,
    });
  }
  registerCommands(commands: CommandRegistry): void {
    commands.registerCommand(AudioPlayerCommand, {
      execute: () => super.openView({ activate: false, reveal: true }),
    });
  }

  /**
   *
   * @param menus
   */
  registerMenus(menus: MenuModelRegistry): void {
    super.registerMenus(menus);
  }
}
