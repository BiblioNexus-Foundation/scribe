import {
  FrontendApplicationContribution,
  WidgetFactory,
  bindViewContribution,
} from "@theia/core/lib/browser";
import { interfaces } from "@theia/core/shared/inversify";
import { AiSidebar, AiSidebarContribution } from "./AiSidebar";
import {
  MainEditorLeftContribution,
  MainEditorLeftWidget,
} from "./MainEditorLeft";
import { AudioWidget, AudioContribution } from "./AudioWidget";
import {
  MainEditorRightContribution,
  MainEditorRightWidget,
} from "./MainEditorRight";
import {
  BottomEditorLeft,
  BottomEditorLeftContribution,
} from "./BottomEditorLeft";
import {
  BottomEditorRightContribution,
  BottomEditorRightWidget,
} from "./BottomEditorRight";
import { ChatContribution, ChatWidget } from "./ChatWidget";
import { VideoContribution, VideoWidget } from "./Videowidget";
import { AudioPlayContribution, AudioPlayWidget } from "./AudioplayWidget";
import {
  CloudSyncCommandContribution,
  CloudSyncWidget,
  CloudSyncWidgetDialogProps,
} from "./cloud-sync-widget";
import { CommandContribution } from '@theia/core';
import { CloudSyncUtils } from '../../utils/CloudSyncUtils';
 './CreateProject';

export const bindAllWidgetsContributions = (bind: interfaces.Bind) => {
  // sidebar widget binds
  bindViewContribution(bind, AiSidebarContribution);
  bind(FrontendApplicationContribution).toService(AiSidebarContribution);
  bind(AiSidebar).toSelf();
  bind(WidgetFactory)
    .toDynamicValue((context: { container: { get: <T>(arg0: any) => T } }) => ({
      id: AiSidebar.ID,
      createWidget: () => context.container.get<AiSidebar>(AiSidebar),
    }))
    .inSingletonScope();

  // left editor widget binds
  bindViewContribution(bind, MainEditorLeftContribution);
  bind(FrontendApplicationContribution).toService(MainEditorLeftContribution);
  bind(MainEditorLeftWidget).toSelf();
  bind(WidgetFactory)
    .toDynamicValue((context: { container: { get: <T>(arg0: any) => T } }) => ({
      id: MainEditorLeftWidget.ID,
      createWidget: () =>
        context.container.get<MainEditorLeftWidget>(MainEditorLeftWidget),
    }))
    .inSingletonScope();

  // right editor widget binds
  bindViewContribution(bind, MainEditorRightContribution);
  bind(FrontendApplicationContribution).toService(MainEditorRightContribution);
  bind(MainEditorRightWidget).toSelf();
  bind(WidgetFactory)
    .toDynamicValue((context: { container: { get: <T>(arg0: any) => T } }) => ({
      id: MainEditorRightWidget.ID,
      createWidget: () =>
        context.container.get<MainEditorRightWidget>(MainEditorRightWidget),
    }))
    .inSingletonScope();
  // Bottom Editor Left
  bindViewContribution(bind, BottomEditorLeftContribution);
  bind(FrontendApplicationContribution).toService(BottomEditorLeftContribution);
  bind(BottomEditorLeft).toSelf();
  bind(WidgetFactory)
    .toDynamicValue((context: { container: { get: <T>(arg0: any) => T } }) => ({
      id: BottomEditorLeft.ID,
      createWidget: () =>
        context.container.get<BottomEditorLeft>(BottomEditorLeft),
    }))
    .inSingletonScope();

  // Bottom Editor Right
  bindViewContribution(bind, BottomEditorRightContribution);
  bind(FrontendApplicationContribution).toService(
    BottomEditorRightContribution
  );
  bind(BottomEditorRightWidget).toSelf();
  bind(WidgetFactory)
    .toDynamicValue((context: { container: { get: <T>(arg0: any) => T } }) => ({
      id: BottomEditorRightWidget.ID,
      createWidget: () =>
        context.container.get<BottomEditorRightWidget>(BottomEditorRightWidget),
    }))
    .inSingletonScope();

  // Audio widget binds
  bindViewContribution(bind, AudioContribution);
  bind(FrontendApplicationContribution).toService(AudioContribution);
  bind(AudioWidget).toSelf();
  bind(WidgetFactory)
    .toDynamicValue((context: { container: { get: <T>(arg0: any) => T } }) => ({
      id: AudioWidget.ID,
      createWidget: () => context.container.get<AudioWidget>(AudioWidget),
    }))
    .inSingletonScope();

  // chat widget binds
  bindViewContribution(bind, ChatContribution);
  bind(FrontendApplicationContribution).toService(ChatContribution);
  bind(ChatWidget).toSelf();
  bind(WidgetFactory)
    .toDynamicValue((context: { container: { get: <T>(arg0: any) => T } }) => ({
      id: ChatWidget.ID,
      createWidget: () => context.container.get<ChatWidget>(ChatWidget),
    }))
    .inSingletonScope();

  // Video widget binds
  bindViewContribution(bind, VideoContribution);
  bind(FrontendApplicationContribution).toService(VideoContribution);
  bind(VideoWidget).toSelf();
  bind(WidgetFactory)
    .toDynamicValue((context: { container: { get: <T>(arg0: any) => T } }) => ({
      id: VideoWidget.ID,
      createWidget: () => context.container.get<VideoWidget>(VideoWidget),
    }))
    .inSingletonScope();

  // Audio Play widget binds
  bindViewContribution(bind, AudioPlayContribution);
  bind(FrontendApplicationContribution).toService(AudioPlayContribution);
  bind(AudioPlayWidget).toSelf();
  bind(WidgetFactory)
    .toDynamicValue((context: { container: { get: <T>(arg0: any) => T } }) => ({
      id: AudioPlayWidget.ID,
      createWidget: () =>
        context.container.get<AudioPlayWidget>(AudioPlayWidget),
    }))
    .inSingletonScope();

  bind(CloudSyncWidgetDialogProps).toConstantValue({
    title: "Cloud Sync",
  });
  bind(CloudSyncWidget).toSelf().inSingletonScope();
  bind(CloudSyncCommandContribution).toSelf().inSingletonScope();
  bind(CommandContribution).toService(CloudSyncCommandContribution);

  bind(CloudSyncUtils).toSelf().inSingletonScope();
<<<<<<< Updated upstream
=======
  // CHAPTER WIDGET BINDS
  bindViewContribution(bind, ChapterContribution);
  bind(FrontendApplicationContribution).toService(ChapterContribution);
  bind(ChapterWidget).toSelf();
  bind(WidgetFactory)
    .toDynamicValue((context: { container: { get: <T>(arg0: any) => T } }) => ({
      id: ChapterWidget.ID,
      createWidget: () => context.container.get<ChapterWidget>(ChapterWidget),
    }))
    .inSingletonScope();

  // CHAPTER NEW PROJECT WIDGET
  bindViewContribution(bind, CreateNewProjectContribution);
  bind(FrontendApplicationContribution).toService(CreateNewProjectContribution);
  bind(CreateNewProjectWidget).toSelf();
  bind(WidgetFactory)
    .toDynamicValue((context: { container: { get: <T>(arg0: any) => T } }) => ({
      id: CreateNewProjectWidget.ID,
      createWidget: () =>
        context.container.get<CreateNewProjectWidget>(CreateNewProjectWidget),
    }))
    .inSingletonScope();

  bind(ProjectInitializer).toSelf().inSingletonScope();
  bind(createVersificationUSFMClass).toSelf().inSingletonScope();

  // CREATE PROJECT WIDGET
  bindViewContribution(bind, CreateProjectContribution);
  bind(FrontendApplicationContribution).toService(CreateProjectContribution);
  bind(CreateProjectWidgetUI).toSelf();
  bind(WidgetFactory)
    .toDynamicValue((context: { container: { get: <T>(arg0: any) => T } }) => ({
      id: CreateProjectWidgetUI.ID,
      createWidget: () =>
        context.container.get<CreateProjectWidgetUI>(CreateProjectWidgetUI),
    }))
    .inSingletonScope();
>>>>>>> Stashed changes
};
