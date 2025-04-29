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
import ProjectGrid from '@/components/CreateProject/ProjectsHeader';

@injectable()
export class CreateProjectWidgetUI extends ReactWidget {
  static readonly ID = 'create-project-widget';
  static readonly LABER = 'create-project';

  @postConstruct()
  protected init(): void {
    this.doInit();
  }

  protected async doInit(): Promise<void> {
    this.id = CreateProjectWidgetUI.ID;
    this.title.label = CreateProjectWidgetUI.LABER;
    this.title.caption = CreateProjectWidgetUI.LABER;
    this.title.closable = true;
    this.update();
  }

  render(): React.ReactNode {
    return (
      <div className="app-container">
        <ProjectGrid />
      </div>
    );
  }
}

@injectable()
export class CreateProjectContribution
  extends AbstractViewContribution<CreateProjectWidgetUI>
  implements FrontendApplicationContribution
{
  @inject(FrontendApplicationStateService)
  protected readonly stateService: FrontendApplicationStateService;

  @inject(WorkspaceService)
  protected readonly workspaceService: WorkspaceService;

  constructor() {
    super({
      widgetId: CreateProjectWidgetUI.ID,
      widgetName: CreateProjectWidgetUI.LABER,
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
