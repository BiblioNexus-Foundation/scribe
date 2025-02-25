import { ContainerModule } from "@theia/core/shared/inversify";
import { CommandContribution } from "@theia/core/lib/common";
import { ServiceConnectionProvider } from "@theia/core/lib/browser/messaging/service-connection-provider";
import { PythonSetupContribution } from "./python-contribution";
import { PythonService, PythonServicePath } from "../common/python-protocol";
import {
  FrontendApplicationContribution,
  WidgetFactory,
} from "@theia/core/lib/browser";
import {
  ChecksWidget,
  ChecksWidgetContribution,
} from "./widgets/checks-widget";
import { bindViewContribution } from "@theia/core/lib/browser";

import "../../lib/browser/output-tailwind.css";

export default new ContainerModule((bind) => {
  bind(CommandContribution).to(PythonSetupContribution);

  bind(PythonService)
    .toDynamicValue((ctx) => {
      const connection = ctx.container.get<ServiceConnectionProvider>(
        ServiceConnectionProvider
      );
      return connection.createProxy<PythonService>(PythonServicePath);
    })
    .inSingletonScope();

  bindViewContribution(bind, ChecksWidgetContribution);
  bind(FrontendApplicationContribution).toService(ChecksWidgetContribution);
  bind(ChecksWidget).toSelf();
  bind(WidgetFactory)
    .toDynamicValue((ctx) => ({
      id: ChecksWidget.ID,
      createWidget: () => ctx.container.get<ChecksWidget>(ChecksWidget),
    }))
    .inSingletonScope();
});
