import * as React from '@theia/core/shared/react';
import {
  inject,
  injectable,
  postConstruct,
} from '@theia/core/shared/inversify';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import {
  AbstractViewContribution,
  FrontendApplicationContribution,
  FrontendApplication,
} from '@theia/core/lib/browser';
import { FrontendApplicationStateService } from '@theia/core/lib/browser/frontend-application-state';
import { WorkspaceService } from '@theia/workspace/lib/browser';
import BibleNavigation from '../../components/BibleNavigation';
import ResourceManage from '../../components/ResourceManage';

@injectable()
export class TopToolbarWidget extends ReactWidget {
  static readonly ID = 'Top-Toolbar-widget';
  static readonly LABER = 'Top Toolbar';

  @postConstruct()
  protected init(): void {
    this.doInit();
  }

  protected async doInit(): Promise<void> {
    this.id = TopToolbarWidget.ID;
    this.title.label = TopToolbarWidget.LABER;
    this.title.caption = TopToolbarWidget.LABER;
    this.title.closable = true;
    this.update();
  }

  render(): React.ReactNode {
    return <ResourceManage />;
  }
}

@injectable()
export class TopToolbarContribution
  extends AbstractViewContribution<TopToolbarWidget>
  implements FrontendApplicationContribution
{
  @inject(FrontendApplicationStateService)
  protected readonly stateService: FrontendApplicationStateService;

  @inject(WorkspaceService)
  protected readonly workspaceService: WorkspaceService;

  constructor() {
    super({
      widgetId: TopToolbarWidget.ID,
      widgetName: TopToolbarWidget.LABER,
      defaultWidgetOptions: {
        area: 'main',
      },
    });
  }

  async onStart(app: FrontendApplication): Promise<void> {
    this.stateService.reachedState('ready').then(() => {
      this.openView({
        activate: true,
        reveal: true,
      });
    });
  }
}
