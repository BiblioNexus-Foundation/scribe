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
import { ProjectInitializer } from "../../functions/initializeNewProject";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../components/ui/dialog";
import { ReactDialog } from "@theia/core/lib/browser/dialogs/react-dialog";
import { DialogProps } from "@theia/core/lib/browser";
import { Search, FolderOpen, PlusCircle } from "lucide-react";
interface ProjectDataType {
  ProjectName: string;
  Abbreviation: string;
  Description: string;
  Language: string;
  ProjectFilePath: any;
}

interface SettingsType {
  scope: string;
  versification: string;
  license: string;
}

interface WidgetState {
  activeDropdown: boolean;
  activeBooks: string;
  settings: SettingsType;
  projectData: ProjectDataType;
  activePopUp: boolean;
}

@injectable()
export class CreateNewProjectDialogProps extends DialogProps {}

@injectable()
export class CreateNewProjectWidget extends ReactDialog<void> {
  static readonly ID = "Create-NewProject-Widget";
  static readonly LABER = "New Project";

  private state: WidgetState;
  private hasOpenedAfterResourcePicker = false;

  @inject(ProjectInitializer)
  private readonly projectInitializer: ProjectInitializer;

  @inject(FrontendApplicationStateService)
  protected readonly stateService: FrontendApplicationStateService;

  constructor(
    @inject(CreateNewProjectDialogProps)
    protected override readonly props: CreateNewProjectDialogProps
  ) {
    super({
      title: CreateNewProjectWidget.LABER,
    });

    if (this.titleNode && this.titleNode.parentElement) {
      this.titleNode.parentElement.style.textTransform = "uppercase";
      this.titleNode.parentElement.style.backgroundColor = "#083344";
      this.titleNode.parentElement.style.color = "#164E63";
    }

    this.state = {
      activePopUp: true,
      activeDropdown: false,
      activeBooks: "Bible translation",
      settings: {
        scope: "All books",
        versification: "eng",
        license: "cc by-sa",
      },
      projectData: {
        ProjectName: "",
        Abbreviation: "",
        Description: "",
        Language: "english",
        ProjectFilePath: "",
      },
    };
  }

  @postConstruct()
  protected init(): void {
    this.doInit();
  }

  protected async doInit(): Promise<void> {
    this.id = CreateNewProjectWidget.ID;
    this.title.label = CreateNewProjectWidget.LABER;
    this.title.caption = CreateNewProjectWidget.LABER;
    this.update();
  }

  setState(state: Partial<WidgetState>): void {
    this.state = {
      ...this.state,
      ...state,
    };
    this.update();
  }

  handleSettingsChange = (key: keyof SettingsType, value: string) => {
    this.setState({
      settings: {
        ...this.state.settings,
        [key]: value,
      },
    });
  };

  handleInputChange = (key: keyof ProjectDataType, value: any) => {
    this.setState({
      projectData: {
        ...this.state.projectData,
        [key]: value,
      },
    });
  };

  validateForm = (): boolean => {
    const requiredFields: (keyof ProjectDataType)[] = [
      "ProjectName",
      "Abbreviation",
      "Description",
      "Language",
    ];
    for (const field of requiredFields) {
      if (!this.state.projectData[field]) {
        alert(`${field} is required.`);
        return false;
      }
    }
    return true;
  };

  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!this.validateForm()) return;
    // Make the Props based on needed type
    const ProjectData = {
      projectName: this.state.projectData.ProjectName,
      projectCategory: this.state.activeBooks,
      userName: "",
      abbreviation: this.state.projectData.Abbreviation,
      sourceLanguage: this.state.projectData.Language,
      targetLanguage: this.state.projectData.Language,
      ProjectFilePath: this.state.projectData.ProjectFilePath,
    };

    //  CALL THE INITIALIZER FUNCTION
    const dataCreated = await this.projectInitializer.initializeNewProject(
      ProjectData
    );

    if (dataCreated?.status === 200) {
      this.setState({ activePopUp: false });
    }
  };

  handleFileSelect = (file: File) => {
    this.handleInputChange("ProjectFilePath", file);
  };

  handleClose = () => {
    setTimeout(() => {
      const resourcePicker = document.querySelector(
        '[id="ResourcesPickerWidget"]'
      );
      if (!resourcePicker && !this.hasOpenedAfterResourcePicker) {
        this.setState({ activePopUp: false });
        this.hasOpenedAfterResourcePicker = false;
      }
    }, 1000);
  };

  get value(): void {
    return undefined;
  }

  render(): React.ReactNode {
    return (
      <div className=" w-[80vw] h-[90vh] flex relative  flex-col justify-between">
        <div className="h-full bg-black text-white p-6">
          {/* Header */}
          <header className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <FolderOpen className="w-5 h-5" />
              <span className="font-medium">SCRIBE 2.0</span>
            </div>

            <div className="flex items-center gap-4">
              <button className="text-gray-400 hover:text-white">Import</button>
              <button className="text-gray-400 hover:text-white flex items-center gap-1">
                <span>Sync</span>
              </button>
              <button className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                  <span className="text-sm">J</span>
                </div>
                <span>John</span>
              </button>
            </div>
          </header>

          {/* Main Content */}
          <div className="max-w-2xl mx-auto text-center mt-20">
            <h1 className="text-4xl font-bold mb-2">
              Welcome to <span className="text-cyan-400">Scribe 3.0</span>
            </h1>
            <p className="text-gray-400 mb-12">Scripture editing made simple</p>

            <div className="mb-12">
              <p className="text-gray-300 mb-4">
                What would you like to work on today?
              </p>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full bg-gray-800 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>
            </div>

            <div className="flex justify-center gap-6">
              <button className="group p-8 bg-gray-900 rounded-lg border border-cyan-400 hover:bg-gray-800 transition-all">
                <div className="flex flex-col items-center gap-4">
                  <FolderOpen className="w-8 h-8 text-cyan-400" />
                  <span className="text-cyan-400 uppercase"> Open Project</span>
                </div>
              </button>

              <button
                className="group p-8 bg-gray-900 rounded-lg hover:bg-gray-800 transition-all"
                onClick={() => this.setState({ activePopUp: true })}
              >
                <div className="flex flex-col items-center gap-4">
                  <PlusCircle className="w-8 h-8 text-gray-400" />
                  <span className="text-gray-400 uppercase">NEW PROJECT</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        <Dialog
          open={this.state.activePopUp}
          onOpenChange={(open) => {
            this.setState({ activePopUp: open });
            if (!open) {
              this.handleClose();
            }
          }}
        >
          <DialogContent className="max-w-3xl mt-3 bg-neutral-800 border-none z-50">
            <CreateProjectComponents
              activeDropdown={this.state.activeDropdown}
              activeBooks={this.state.activeBooks}
              settings={this.state.settings}
              projectData={this.state.projectData}
              setActiveDropdown={(value) =>
                this.setState({ activeDropdown: value })
              }
              setActiveBooks={(value) => this.setState({ activeBooks: value })}
              handleSettingsChange={this.handleSettingsChange}
              handleInputChange={this.handleInputChange}
              handleSubmit={this.handleSubmit}
              onFileSelect={this.handleFileSelect}
            />
          </DialogContent>
        </Dialog>
      </div>
    );
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
