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
import CreateProjectComponents from '../../components/CreateProjectComponents';
import { ProjectInitializer } from '../../functions/initializeNewProject';
import { Dialog, DialogContent } from '../../components/ui/dialog';
import { FolderOpen, Plus, PlusCircle, Search } from 'lucide-react';
import { MessageService } from '@theia/core';
import { FileService } from '@theia/filesystem/lib/browser/file-service';
import { URI } from '@theia/core/lib/common/uri';
import {
  FileDialogService,
  OpenFileDialogProps,
} from '@theia/filesystem/lib/browser';
import ProjectImportForm from '../../components/createProject/NewProjectComponents';

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
  static readonly ID = 'Create-NewProject-Widget';
  static readonly LABER = 'NewProject';

  private state: WidgetState;

  @inject(ProjectInitializer)
  private readonly projectInitializer: ProjectInitializer;

  @inject(WorkspaceService)
  private readonly workspaceService: WorkspaceService;

  @inject(MessageService)
  private readonly messageService: MessageService;

  @inject(FileService)
  private readonly fileService: FileService;

  @inject(FileDialogService)
  private readonly fileDialog: FileDialogService;

  constructor() {
    super();
    this.state = {
      activePopUp: false,
      activeDropdown: false,
      activeBooks: 'Bible translation',
      settings: {
        scope: 'All books',
        versification: 'eng',
        license: 'cc by-sa',
      },
      projectData: {
        ProjectName: '',
        Abbreviation: '',
        Description: '',
        Language: 'english',
        ProjectFilePath: '',
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
      'ProjectName',
      'Abbreviation',
      'Description',
      'Language',
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

    const ProjectData = {
      projectName: this.state.projectData.ProjectName,
      projectCategory: this.state.activeBooks,
      userName: '',
      abbreviation: this.state.projectData.Abbreviation,
      sourceLanguage: this.state.projectData.Language,
      targetLanguage: this.state.projectData.Language,
      ProjectFilePath: this.state.projectData.ProjectFilePath,
    };

    const dataCreated = await this.projectInitializer.initializeNewProject(
      ProjectData
    );

    if (dataCreated?.status === 200) {
      // Open the project folder path, not just the parent folder
      const projectPath = new URI(
        this.state.projectData.ProjectFilePath
      ).resolve(this.state.projectData.ProjectName);
      await this.workspaceService.open(projectPath, {
        preserveWindow: true,
      });
      this.setState({ activePopUp: false });
      this.messageService.info('Project created successfully!');
    }
  };

  handleFileSelect = (file: File) => {
    this.handleInputChange('ProjectFilePath', file);
  };

  private async selectFolder(): Promise<string | undefined> {
    try {
      const props: OpenFileDialogProps = {
        title: 'Select Project Folder',
        canSelectFolders: true,
        canSelectFiles: false,
      };

      const uri = await this.fileDialog.showOpenDialog(props);

      if (uri) {
        const selectedFolderUri = new URI(uri.toString());
        // Just return the path without opening it
        return selectedFolderUri.toString();
      }
      return undefined;
    } catch (error) {
      this.messageService.error(`Failed to open folder dialog: ${error}`);
      return undefined;
    }
  }

  handleFileClick = async () => {
    // Always show folder selection first
    const selectedFolder = await this.selectFolder();
    if (!selectedFolder) {
      return;
    }

    // Check if selected folder has a project
    const folderUri = new URI(selectedFolder);
    const projectFilePath = folderUri.resolve('metadata.json');
    const fileExists = await this.fileService.exists(projectFilePath);

    if (fileExists) {
      const fileData = await this.fileService.readFile(projectFilePath);
      const fileContent = fileData.value.toString();
      const metadata = JSON.parse(fileContent);
      const projectName = metadata.projectName;

      const userChoice = await this.messageService.info(
        `A project named "${projectName}" already exists in this folder. Do you want to continue with this project or select a different folder?`,
        'Continue',
        'Select Different'
      );

      if (userChoice === 'Select Different') {
        // If user wants to select different folder, restart the process
        this.handleFileClick();
        return;
      }
      // If user wants to continue with existing project, just open it
      await this.workspaceService.open(folderUri, {
        preserveWindow: true,
      });
      return;
    }

    // No project exists in selected folder, store the path and show create project dialog
    this.handleInputChange('ProjectFilePath', selectedFolder);
    this.setState({ activePopUp: true });
  };

  render(): React.ReactNode {
    return (
      <div className="w-full flex flex-col items-center justify-start">
        <div className="h-full w-full bg-black text-white p-6">
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
              <button
                className="group p-8 bg-gray-900 rounded-lg border border-cyan-400 hover:bg-gray-800 transition-all"
                onClick={this.handleFileClick} // Added click handler
              >
                <div className="flex flex-col items-center gap-4">
                  <FolderOpen className="w-8 h-8 text-cyan-400" />
                  <span className="text-cyan-400 uppercase"> Open Project</span>
                </div>
              </button>

              <button
                className="group p-8 bg-gray-900 rounded-lg hover:bg-gray-800 transition-all"
                onClick={() => this.handleFileClick()}
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
          onOpenChange={(open) => this.setState({ activePopUp: open })}
        >
          {/* <DialogTrigger asChild>
          <button className="px-3 py-2  mt-10 bg-cyan-500 text-xs hover:bg-neutral-700 border  justify-center items-center rounded-md flex gap-2">
            <Plus size={18} />
            Create New Project
          </button>
        </DialogTrigger> */}
          <DialogContent className="max-w-fit p-0 mt-3 bg-neutral-800 border-none z-50">
            {/* <CreateProjectComponents
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
            /> */}
            <ProjectImportForm
              onImport={() => {}}
              onCancel={() => {}}
              onCreateProject={() => {}}
              defaultFolder={''}
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
