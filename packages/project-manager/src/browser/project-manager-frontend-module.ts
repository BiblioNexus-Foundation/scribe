
import { ContainerModule } from '@theia/core/shared/inversify';
import { bindViewContribution, FrontendApplicationContribution, WidgetFactory } from '@theia/core/lib/browser';

import '../../src/browser/style/index.css';
import { ProjectManagerWidget } from './project-manager-widget';
import { ProjectManagerContribution } from './project-manager-contribution';

export default new ContainerModule(bind => {
  bindViewContribution(bind, ProjectManagerContribution);
  bind(FrontendApplicationContribution).toService(ProjectManagerContribution);
  bind(ProjectManagerWidget).toSelf();
  bind(WidgetFactory).toDynamicValue(ctx => ({
    id: ProjectManagerWidget.ID,
    createWidget: () => ctx.container.get<ProjectManagerWidget>(ProjectManagerWidget)
  })).inSingletonScope();
});
