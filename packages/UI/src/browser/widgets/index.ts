import {
  FrontendApplicationContribution,
  WidgetFactory,
  bindViewContribution,
} from "@theia/core/lib/browser";
import { interfaces } from "@theia/core/shared/inversify";
import { AiSidebar, AiSidebarContribution } from "./AiSidebar";

import { ChatContribution, ChatWidget } from "./ChatWidget";

import {
  CloudSyncCommandContribution,
  CloudSyncWidget,
  CloudSyncWidgetDialogProps,
} from "./cloud-sync-widget";
import { CommandContribution } from "@theia/core";
import { CloudSyncUtils } from "../../utils/CloudSyncUtils";

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

  bind(CloudSyncWidgetDialogProps).toConstantValue({
    title: "Cloud Sync",
  });
  bind(CloudSyncWidget).toSelf().inSingletonScope();
  bind(CloudSyncCommandContribution).toSelf().inSingletonScope();
  bind(CommandContribution).toService(CloudSyncCommandContribution);

  bind(CloudSyncUtils).toSelf().inSingletonScope();
};
