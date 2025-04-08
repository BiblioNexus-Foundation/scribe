import * as React from 'react';
import {
  injectable,
  postConstruct,
  inject,
} from '@theia/core/shared/inversify';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import { MessageService } from '@theia/core';
import AudioPlayerComponent from './audio-player-component';

@injectable()
export class AudioPlayerWidget extends ReactWidget {
  static readonly ID = 'audio-player:widget';
  static readonly LABEL = 'Audio Player Widget';

  @inject(MessageService)
  protected readonly messageService!: MessageService;

  @postConstruct()
  protected init(): void {
    this.doInit();
  }

  protected async doInit(): Promise<void> {
    this.id = AudioPlayerWidget.ID;
    this.title.label = AudioPlayerWidget.LABEL;
    this.title.caption = AudioPlayerWidget.LABEL;
    this.title.closable = true;
    this.title.iconClass = 'fa fa-music';
    this.update();
  }

  render(): React.ReactElement {
    return <AudioPlayerComponent />;
  }
}

export default AudioPlayerWidget;
