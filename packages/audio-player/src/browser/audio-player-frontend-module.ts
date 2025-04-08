import { ContainerModule } from '@theia/core/shared/inversify';
import AudioPlayerWidget from './audio-player-widget';
import { AudioPlayerContribution } from './audio-player-contribution';
import {
  bindViewContribution,
  FrontendApplicationContribution,
  WidgetFactory,
} from '@theia/core/lib/browser';

export default new ContainerModule((bind) => {
  bindViewContribution(bind, AudioPlayerContribution);
  bind(FrontendApplicationContribution).toService(AudioPlayerContribution);
  bind(AudioPlayerWidget).toSelf();
  bind(WidgetFactory)
    .toDynamicValue((ctx) => ({
      id: AudioPlayerWidget.ID,
      createWidget: () =>
        ctx.container.get<AudioPlayerWidget>(AudioPlayerWidget),
    }))
    .inSingletonScope();
});
