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

const PLACEHOLDER_TEST_TEXT = `
      This is a problematic text file designed to contain multiple issues for testing purposes:
1. UTF-8 encoding violations:  (these should not appear properly).
2. Control characters:  embedded within text.
3. Zero-width characters: word​separator and ‍joiner.
4. Mixed letters/numbers/punctuation/letter-modifiers from various scripts:
   - Arabic: العربية.
   - Greek: αβγ.
`;

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
  }

  protected async getAnalysisData(): Promise<AnalysisData> {
    const data = await this.pythonService.executeWildebeest(PLACEHOLDER_TEST_TEXT);
    return JSON.parse(data);
  }

  render(): React.ReactNode {
    return (
      <div className="">
        <CheckInputForm
          onSubmit={(text) => {
            this.pythonService.executeWildebeest(text).then((data) => {
              this.analysisData = JSON.parse(data);
              this.update();
            });
          }}
        />
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

interface CheckInputFormProps {
  onSubmit?: (text: string) => void;
  placeholder?: string;
  className?: string;
}

const CheckInputForm: React.FC<CheckInputFormProps> = ({
  onSubmit,
  placeholder = "Enter text to analyze...",
  className,
}) => {
  const [inputText, setInputText] = React.useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && onSubmit) {
      onSubmit(inputText);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={
        "flex max-w-4/5 gap-2 p-2 border-t border-[rgb(250 250 250 / 0.1)] flex-col"
      }
    >
      <label htmlFor="inputText">Enter text to analyze...</label>
      <textarea
        id="inputText"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
      />
      <button
        type="submit"
        className="dark:bg-cyan-500 bg-cyan-400 hover:bg-cyan-500 dark:hover:bg-cyan-400 text-zinc-800 dark:text-black dark:border-cyan-700"
      >
        Run Check
      </button>
    </form>
  );
};
