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

@injectable()
export class ProjectManagerWidget extends ReactWidget {
  static readonly ID = 'project-manager:widget';
  static readonly LABEL = 'Project Manager';

  @inject(MessageService)
  protected readonly messageService!: MessageService;

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

  render(): React.ReactElement {
    return (
      <CommonView onClose={this.closeWidget} />
    );
  }
}