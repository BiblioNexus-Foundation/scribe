import * as React from 'react';
import {
  injectable,
  postConstruct,
  inject,
} from '@theia/core/shared/inversify';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import { MessageService } from '@theia/core/lib/common';
import { Message } from '@theia/core/lib/browser';
import CommonView from '../components/CommonView';
import NewProjectView from '../components/NewProject/NewProjectView';
import { FileDialogService } from "@theia/filesystem/lib/browser";
import { WorkspaceService } from "@theia/workspace/lib/browser/workspace-service";

@injectable()
export class ProjectManagerWidget extends ReactWidget {
  static readonly ID = 'project-manager:widget';
  static readonly LABEL = 'Project Manager';

  @inject(MessageService)
  protected readonly messageService!: MessageService;

  @inject(FileDialogService)
  protected readonly fileDialogService!: FileDialogService;

  @inject(WorkspaceService)
  protected readonly workspaceService!: WorkspaceService;

  private currentView: 'welcome' | 'newProject' | 'openProject' = 'welcome';

  @postConstruct()
  protected init(): void {
    this.id = ProjectManagerWidget.ID;
    this.title.label = ProjectManagerWidget.LABEL;
    this.title.caption = ProjectManagerWidget.LABEL;
    this.title.closable = true;
    this.title.iconClass = 'fa fa-window-maximize';

    this.update();
  }

  protected onActivateRequest(msg: Message): void {
    super.onActivateRequest(msg);
    this.node.focus();
  }

  closeWidget = () => {
    if (this.node.parentElement) {
      this.node.parentElement.removeChild(this.node);
    }
  };

  showNewProject = () => {
    this.currentView = 'newProject';
    this.update();
  };

  showOpenProject = () => {
    this.currentView = 'openProject';
    this.update();
  };

  goBackToWelcome = () => {
    this.currentView = 'welcome';
    this.update();
  };

  render(): React.ReactElement {
    switch (this.currentView) {
      case 'newProject':
        return <NewProjectView
          onBack={this.goBackToWelcome}
          fileDialogService={this.fileDialogService}
        />;

      case 'openProject':
        return (
          <CommonView
            onClose={this.closeWidget}
            onNewProject={this.showNewProject}
            onOpenProject={this.showOpenProject}
          />
        );

      case 'welcome':
      default:
        return (
          <CommonView
            onClose={this.closeWidget}
            onNewProject={this.showNewProject}
            onOpenProject={this.showOpenProject}
          />
        );
    }
  }
}