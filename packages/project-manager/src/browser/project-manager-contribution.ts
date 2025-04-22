import { injectable, inject } from '@theia/core/shared/inversify';
import { MenuModelRegistry } from '@theia/core/lib/common';
import { AbstractViewContribution } from '@theia/core/lib/browser';
import { Command, CommandRegistry } from '@theia/core/lib/common/command';
import {
  FrontendApplication,
  FrontendApplicationContribution,
  ApplicationShell
} from '@theia/core/lib/browser';
import { ProjectManagerWidget } from './project-manager-widget';
import { ProjectServer } from '../common/project-protocol';

export const ProjectManagerCommand: Command = { id: 'project-manager:toggle' };

@injectable()
export class ProjectManagerContribution
  extends AbstractViewContribution<ProjectManagerWidget>
  implements FrontendApplicationContribution {

  @inject(ApplicationShell)
  protected readonly shell: ApplicationShell;

  @inject(FrontendApplication)
  protected readonly app: FrontendApplication;

  @inject(ProjectServer)
  protected readonly ProjectServer: ProjectServer;

  private overlayWidget: ProjectManagerWidget | undefined;

  constructor() {
    super({
      widgetId: ProjectManagerWidget.ID,
      widgetName: ProjectManagerWidget.LABEL,
      defaultWidgetOptions: {
        area: 'main',
      },
      toggleCommandId: ProjectManagerCommand.id,
    });
  }

  async onStart(app: FrontendApplication): Promise<void> {
    // Wait for the application to be fully started
    await app.start;
    // Show the overlay
    this.showOverlay();
  }

  async showOverlay(): Promise<void> {
    // Create the widget if it doesn't exist
    if (!this.overlayWidget || this.overlayWidget.isDisposed) {
      const widget = await this.widgetManager.getOrCreateWidget(
        ProjectManagerWidget.ID
      );
      this.overlayWidget = widget as ProjectManagerWidget;
      this.styleOverlayWidget();
      // Add directly to body
      document.body.appendChild(this.overlayWidget.node);
    } else if (!document.body.contains(this.overlayWidget.node)) {
      // If widget exists but not in DOM, re-add it
      document.body.appendChild(this.overlayWidget.node);
    }

    this.overlayWidget.node.style.display = 'flex';
    this.overlayWidget.activate();
  }

  hideOverlay(): void {
    if (this.overlayWidget && document.body.contains(this.overlayWidget.node)) {
      document.body.removeChild(this.overlayWidget.node);
    }
  }

  private styleOverlayWidget(): void {
    if (!this.overlayWidget) return;

    const style = this.overlayWidget.node.style;
    // style.position = 'fixed';
    // style.top = '0';
    // style.left = '0';
    // style.width = '100vw';
    // style.height = '100vh';
    // style.zIndex = '999999';
    style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    style.display = 'flex';

    this.overlayWidget.node.classList.add('project-manager-overlay');

    const styleId = 'project-manager-overlay-styles';
    if (!document.getElementById(styleId)) {
      const styleEl = document.createElement('style');
      styleEl.id = styleId;
      styleEl.textContent = `
        .project-manager-overlay {
          position: fixed !important;
          z-index: 999999 !important;
          top: 0 !important;
          left: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
        }
      `;
      document.head.appendChild(styleEl);
    }
  }

  toggleOverlay(): void {
    if (this.overlayWidget && document.body.contains(this.overlayWidget.node)) {
      this.hideOverlay();
    } else {
      this.showOverlay();
    }
  }

  registerCommands(commands: CommandRegistry): void {
    commands.registerCommand(ProjectManagerCommand, {
      execute: () => this.toggleOverlay()
    });
  }

  registerMenus(menus: MenuModelRegistry): void {
    super.registerMenus(menus);
  }
}