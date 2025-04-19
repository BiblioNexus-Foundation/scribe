import {
  FrontendApplicationContribution,
  WidgetFactory,
  bindViewContribution,
} from '@theia/core/lib/browser';
import { interfaces } from '@theia/core/shared/inversify';
import { AiSidebar, AiSidebarContribution } from './AiSidebar';
import { AudioWidget, AudioContribution } from './AudioWidget';

import { ChatContribution, ChatWidget } from './ChatWidget';
import { VideoContribution, VideoWidget } from './Videowidget';
import { AudioPlayContribution, AudioPlayWidget } from './AudioplayWidget';
import {
  CloudSyncCommandContribution,
  CloudSyncWidget,
  CloudSyncWidgetDialogProps,
} from './cloud-sync-widget';
import { CommandContribution } from '@theia/core';
import { CloudSyncUtils } from '../../utils/CloudSyncUtils';

export const bindAllWidgetsContributions = (bind: interfaces.Bind) => {
  // sidebar widget binds
  bindViewContribution(bind, AiSidebarContribution);
  bind(FrontendApplicationContribution).toService(AiSidebarContribution);
  bind(AiSidebar).toSelf();
  bind(WidgetFactory)
    .toDynamicValue((context) => ({
      id: AiSidebar.ID,
      createWidget: () => context.container.get<AiSidebar>(AiSidebar),
    }))
    .inSingletonScope();

  // Audio widget binds
  bindViewContribution(bind, AudioContribution);
  bind(FrontendApplicationContribution).toService(AudioContribution);
  bind(AudioWidget).toSelf();
  bind(WidgetFactory)
    .toDynamicValue((context) => ({
      id: AudioWidget.ID,
      createWidget: () => context.container.get<AudioWidget>(AudioWidget),
    }))
    .inSingletonScope();

  // chat widget binds
  bindViewContribution(bind, ChatContribution);
  bind(FrontendApplicationContribution).toService(ChatContribution);
  bind(ChatWidget).toSelf();
  bind(WidgetFactory)
    .toDynamicValue((context) => ({
      id: ChatWidget.ID,
      createWidget: () => context.container.get<ChatWidget>(ChatWidget),
    }))
    .inSingletonScope();

  // Video widget binds
  bindViewContribution(bind, VideoContribution);
  bind(FrontendApplicationContribution).toService(VideoContribution);
  bind(VideoWidget).toSelf();
  bind(WidgetFactory)
    .toDynamicValue((context) => ({
      id: VideoWidget.ID,
      createWidget: () => context.container.get<VideoWidget>(VideoWidget),
    }))
    .inSingletonScope();

  // Audio Play widget binds
  bindViewContribution(bind, AudioPlayContribution);
  bind(FrontendApplicationContribution).toService(AudioPlayContribution);
  bind(AudioPlayWidget).toSelf();
  bind(WidgetFactory)
    .toDynamicValue((context) => ({
      id: AudioPlayWidget.ID,
      createWidget: () => context.container.get<AudioPlayWidget>(AudioPlayWidget),
    }))
    .inSingletonScope();

  bind(CloudSyncWidgetDialogProps).toConstantValue({
    title: 'Cloud Sync',
  });
  bind(CloudSyncWidget).toSelf().inSingletonScope();
  bind(CloudSyncCommandContribution).toSelf().inSingletonScope();
  bind(CommandContribution).toService(CloudSyncCommandContribution);

  bind(CloudSyncUtils).toSelf().inSingletonScope();
};
