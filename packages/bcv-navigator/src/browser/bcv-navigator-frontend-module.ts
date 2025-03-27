import { ContainerModule } from "@theia/core/shared/inversify";
import { BcvNavigatorWidget } from "./bcv-navigator-widget";
import { BcvNavigatorContribution } from "./bcv-navigator-contribution";
import {
  bindViewContribution,
  FrontendApplicationContribution,
  WidgetFactory,
} from "@theia/core/lib/browser";

import "../output-tailwind.css";

export default new ContainerModule((bind) => {
  bindViewContribution(bind, BcvNavigatorContribution);
  bind(FrontendApplicationContribution).toService(BcvNavigatorContribution);
  bind(BcvNavigatorWidget).toSelf();
  bind(WidgetFactory)
    .toDynamicValue((ctx) => ({
      id: BcvNavigatorWidget.ID,
      createWidget: () => ctx.container.get<BcvNavigatorWidget>(BcvNavigatorWidget),
    }))
    .inSingletonScope();
});
