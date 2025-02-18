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
import { Plus } from "lucide-react";

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
export class CreateNewProjectWidget extends ReactWidget {
  static readonly ID = "Create-NewProject-Widget";
  static readonly LABER = "NewProject";

  private state: WidgetState;

  @inject(ProjectInitializer)
  private readonly projectInitializer: ProjectInitializer;

  constructor() {
    super();
    this.state = {
      activePopUp: false,
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
    this.title.closable = true;
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

  render(): React.ReactNode {
    return (
      <div className="w-full flex items-center justify-start">
        <Dialog
          open={this.state.activePopUp}
          onOpenChange={(open) => this.setState({ activePopUp: open })}
        >
          <DialogTrigger asChild>
            <button className="px-3 py-2  mt-10 bg-cyan-500 text-xs hover:bg-neutral-700 border  justify-center items-center rounded-md flex gap-2">
              <Plus size={18} />
              Create New Project
            </button>
          </DialogTrigger>
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
