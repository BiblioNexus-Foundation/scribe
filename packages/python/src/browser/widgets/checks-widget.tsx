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
  codicon,
} from "@theia/core/lib/browser";
import { FrontendApplicationStateService } from "@theia/core/lib/browser/frontend-application-state";
import { WorkspaceService } from "@theia/workspace/lib/browser";
import { AnalysisData, TextAnalysis } from "../components/TextAnalysis";
import { PythonService } from "../../common/python-protocol";

@injectable()
export class ChecksWidget extends ReactWidget {
  static readonly ID = "python-checks-widget";
  static readonly LABEL = "Checks";

  private analysisData: AnalysisData | null = null;

  @inject(PythonService)
  private pythonService: PythonService;

  @postConstruct()
  protected init(): void {
    this.doInit();
  }

  protected async doInit(): Promise<void> {
    this.id = ChecksWidget.ID;
    this.title.label = ChecksWidget.LABEL;
    this.title.caption = ChecksWidget.LABEL;
    this.title.closable = true;
    this.title.iconClass = codicon("checklist");
    this.update();

    this.getAnalysisData().then((data) => {
      this.analysisData = data;
      this.update();
    });
  }

  protected async getAnalysisData(): Promise<AnalysisData> {
    const data = await this.pythonService.executeWildebeest(`
      This is a problematic text file designed to contain multiple issues for testing purposes:
1. UTF-8 encoding violations:  (these should not appear properly).
2. Control characters:  embedded within text.
3. Zero-width characters: word​separator and ‍joiner.
4. Mixed letters/numbers/punctuation/letter-modifiers from various scripts:
   - Arabic: العربية.
   - Greek: αβγ.
    `);
    return JSON.parse(data);
  }

  render(): React.ReactNode {
    return (
      <div className="">
        {this.analysisData && <TextAnalysis data={this.analysisData} />}
      </div>
    );
  }
}

@injectable()
export class ChecksWidgetContribution
  extends AbstractViewContribution<ChecksWidget>
  implements FrontendApplicationContribution
{
  @inject(FrontendApplicationStateService)
  protected readonly stateService: FrontendApplicationStateService;

  @inject(WorkspaceService)
  protected readonly workspaceService: WorkspaceService;

  constructor() {
    super({
      widgetId: ChecksWidget.ID,
      widgetName: ChecksWidget.LABEL,
      defaultWidgetOptions: {
        area: "right",
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
