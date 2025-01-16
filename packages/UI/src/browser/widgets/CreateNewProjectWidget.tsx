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

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!this.validateForm()) return;
    console.log(
      "Form submitted:",
      this.state.projectData,
      "settings=========",
      this.state.settings
    );
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
    this.projectInitializer.initializeNewProject(ProjectData);
  };

  handleFileSelect = (file: File) => {
    this.handleInputChange("ProjectFilePath", file);
  };

  render(): React.ReactNode {
    return (
      <CreateProjectComponents
        activeDropdown={this.state.activeDropdown}
        activeBooks={this.state.activeBooks}
        settings={this.state.settings}
        projectData={this.state.projectData}
        setActiveDropdown={(value) => this.setState({ activeDropdown: value })}
        setActiveBooks={(value) => this.setState({ activeBooks: value })}
        handleSettingsChange={this.handleSettingsChange}
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
        onFileSelect={this.handleFileSelect}
      />
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
