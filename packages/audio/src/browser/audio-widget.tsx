import * as React from 'react';
import {
  injectable,
  postConstruct,
  inject,
} from '@theia/core/shared/inversify';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import { AudioPanel } from '../components/AudioPanel';
import { ThemeService } from '@theia/core/lib/browser/theming';
import { FFmpegServer } from '../common/audio-protocol';
import { WorkspaceService } from '@theia/workspace/lib/browser/workspace-service';

@injectable()
export class AudioWidget extends ReactWidget {
  static readonly ID = 'audio:widget';
  static readonly LABEL = 'Audio Widget';

  @inject(FFmpegServer)
  protected readonly server:FFmpegServer;


  @inject(ThemeService)
  protected readonly themeService: ThemeService;


  @inject(WorkspaceService)
  protected readonly workspaceService: WorkspaceService;
  


  private currentTheme: string;

  @postConstruct()
  protected init(): void {
    this.doInit();
  }

  protected async doInit(): Promise<void> {
    this.id = AudioWidget.ID;
    this.title.label = AudioWidget.LABEL;
    this.title.caption = AudioWidget.LABEL;
    this.title.closable = true;
    this.title.iconClass = 'fa fa-window-maximize'; // example widget icon.

    // Set initial theme
    this.currentTheme = this.themeService.getCurrentTheme().type;

    console.log(this.server, 'server');
    // Subscribe to theme changes
    this.themeService.onDidColorThemeChange(() => {
      this.handleThemeChange();
    });


    await this.initializeWorkspace();

    this.update(); // Force initial render
  }

  // Handles theme change and updates widget state
  protected handleThemeChange(): void {
    const newTheme = this.themeService.getCurrentTheme().type;
    if (this.currentTheme !== newTheme) {
      this.currentTheme = newTheme;
      this.update(); // Trigger re-render
    }
  }


  private async getWorkspaceDetails(): Promise<{
    fsPath?: string;
    isWorkspaceOpen: boolean;
  }> {
    try {
      await this.workspaceService.ready;
      const roots = await this.workspaceService.roots;

      if (!roots || roots.length === 0) {
        return {
          isWorkspaceOpen: false,
        };
      }

      return {
        fsPath: roots[0].resource.path.fsPath(),
        isWorkspaceOpen: true,
      };
    } catch (error) {
      console.error('Error retrieving workspace details:', error);
      return {
        isWorkspaceOpen: false,
      };
    }
  }

  private async initializeWorkspace(): Promise<void> {
    // Initialize workspace
    const workspaceDetails = await this.getWorkspaceDetails();
    console.log('Workspace details:', workspaceDetails);

    if (workspaceDetails.isWorkspaceOpen && workspaceDetails.fsPath) {
      try {
        await this.server.setWorkspacePath(workspaceDetails.fsPath);
        console.log('Workspace path set in backend:', workspaceDetails.fsPath);
      } catch (error) {
        console.error('Failed to set workspace path:', error);
      }
    } else {
      console.log('No workspace is currently open');
    }

    this.update();
  }
  render(): React.ReactElement {
    // Render AudioPanel with the current theme
    return <AudioPanel theme={this.currentTheme} server={this.server} />;
  }
}
