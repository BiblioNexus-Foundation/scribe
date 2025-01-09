import * as React from "@theia/core/shared/react";
import {
  inject,
  injectable,
  postConstruct,
} from "@theia/core/shared/inversify";
import { ReactWidget } from "@theia/core/lib/browser/widgets/react-widget";
import {
  AbstractViewContribution,
  FrontendApplicationContribution,
  FrontendApplication,
} from "@theia/core/lib/browser";
import { FrontendApplicationStateService } from "@theia/core/lib/browser/frontend-application-state";
import { WorkspaceService } from "@theia/workspace/lib/browser";
import CreateProjectComponents from "../../components/CreateProjectComponents";

@injectable()
export class CreateNewProjectWidget extends ReactWidget {
  static readonly ID = "Create-NewProject-Widget";
  static readonly LABER = "NewProject";

  @postConstruct()
  protected init(): void {
    this.doInit();
  }

  protected async doInit(): Promise<void> {
    this.id = CreateNewProjectWidget.ID;
    this.title.label = CreateNewProjectWidget.LABER;
    this.title.caption = CreateNewProjectWidget.LABER;
    this.title.closable = true;
    this.update();
  }

  render(): React.ReactNode {
    return <CreateProjectComponents />;
  }
}

@injectable()
export class CreateNewProjectContribution
  extends AbstractViewContribution<CreateNewProjectWidget>
  implements FrontendApplicationContribution
{
  @inject(FrontendApplicationStateService)
  protected readonly stateService: FrontendApplicationStateService;

  @inject(WorkspaceService)
  protected readonly workspaceService: WorkspaceService;

  constructor() {
    super({
      widgetId: CreateNewProjectWidget.ID,
      widgetName: CreateNewProjectWidget.LABER,
      defaultWidgetOptions: {
        area: "bottom",
      },
    });
  }

  async onStart(app: FrontendApplication): Promise<void> {
    this.stateService.reachedState("ready").then(() => {
      this.openView({
        activate: true,
        reveal: true,
      });
    });
  }
}
