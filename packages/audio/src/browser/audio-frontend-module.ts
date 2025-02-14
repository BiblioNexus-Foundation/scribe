import { ContainerModule } from '@theia/core/shared/inversify';
import { AudioWidget } from './audio-widget';
import { AudioContribution } from './audio-contribution';
import {
  bindViewContribution,
  FrontendApplicationContribution,
  WidgetFactory,
} from '@theia/core/lib/browser';

import '../../src/browser/style/index.css';

export default new ContainerModule((bind) => {
  bindViewContribution(bind, AudioContribution);
  bind(FrontendApplicationContribution).toService(AudioContribution);
  bind(AudioWidget).toSelf();
  bind(WidgetFactory)
    .toDynamicValue((ctx) => ({
      id: AudioWidget.ID,
      createWidget: () => ctx.container.get<AudioWidget>(AudioWidget),
    }))
    .inSingletonScope();
});
