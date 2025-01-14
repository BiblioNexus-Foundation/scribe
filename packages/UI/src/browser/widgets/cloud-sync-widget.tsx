import * as React from "@theia/core/shared/react";
import { ReactDialog } from "@theia/core/lib/browser/dialogs/react-dialog";
import {
  inject,
  injectable,
  postConstruct,
} from "@theia/core/shared/inversify";
import { DialogProps, PreferenceService } from "@theia/core/lib/browser";

import { type CommandContribution, type CommandRegistry } from "@theia/core";
import { ApplicationShell } from "@theia/core/lib/browser";
import { Message } from "@theia/core/lib/browser";
import CloudSyncCard from "../../components/CloudSyncCard";
import { Git, GitFileStatus, type Remote } from "@theia/git/lib/common";
import { WorkspaceService } from "@theia/workspace/lib/browser";
import Button from "../../components/Button";
import { CloudSyncUtils, LastCommit } from "../../utils/CloudSyncUtils";

type State = {
  remotes: Remote[];
  lastCommit: LastCommit | null;
  settings: {
    autoSync: boolean;
    autoCommit: boolean;
    autoSyncInterval?: number;
    autoCommitInterval?: number;
  };
};

@injectable()
export class CloudSyncWidgetDialogProps extends DialogProps {}

@injectable()
export class CloudSyncWidget extends ReactDialog<void> {
  static readonly ID = "cloud-sync-widget";

  @inject(CloudSyncUtils)
  protected readonly cloudSyncUtils: CloudSyncUtils;

  @inject(WorkspaceService)
  protected readonly workspaceService: WorkspaceService;

  @inject(PreferenceService)
  protected readonly preferenceService: PreferenceService;

  state: State;

  constructor(
    @inject(CloudSyncWidgetDialogProps)
    protected readonly dialogProps: CloudSyncWidgetDialogProps
  ) {
    super({
      title: dialogProps.title,
    });
    if (this.titleNode && this.titleNode.parentElement) {
      this.titleNode.parentElement.style.textTransform = "uppercase";
      this.titleNode.parentElement.style.backgroundColor = "#083344";
      this.titleNode.parentElement.style.color = "#164E63";
    }

    this.state = {
      remotes: [],
      lastCommit: null,
      settings: {
        autoSync: false,
        autoCommit: false,
      },
    };

    // this.titleNode.className =
    //   "bg-grey-300 text-lg text-cyan-950 font-semibold";
    // this.titleNode.parentElement!.className =
    //   "bg-blue-500 justify-between flex items-center p-2";
    // this.titleNode.parentElement!.innerHTML = "Parent";
  }

  protected onAfterAttach(msg: Message): void {
    super.onAfterAttach(msg);
    this.cloudSyncUtils.getRemotes().then((remotes) => {
      this.setState({ remotes });
    });
    this.cloudSyncUtils.getLastCommit().then((commit) => {
      this.setState({ lastCommit: commit });
    });
    this.preferenceService.ready.finally(() => {
      const settings =
        this.preferenceService?.get<string>("cloudSync.settings");

      console.log("settings:: after get", settings);
      this.setState({
        settings: JSON.parse(settings || "{}") || {
          autoSync: false,
          autoCommit: false,
        },
      });
    });
  }

  setState(state: Partial<State>): void {
    this.state = {
      ...this.state,
      ...state,
    };

    this.update();
  }

  get value(): any {
    return "value";
  }

  render(): React.ReactNode {
    // const remotes = [
    //   {
    //     id: "1",
    //     name: "Production Server",
    //     link: "https://production.example.com",
    //   },
    //   {
    //     id: "2",
    //     name: "Staging Environment",
    //     link: "https://staging.example.com",
    //   },
    //   {
    //     id: "3",
    //     name: "Development Machine",
    //     link: "https://dev.example.com",
    //   },
    // ];

    const handleAddRemote = async ({
      name,
      url,
    }: {
      name: string;
      url: string;
    }) => {
      await this.cloudSyncUtils.handleAddRemote({ name, url });
      await this.cloudSyncUtils.getRemotes();
      await this.cloudSyncUtils.getLastCommit().then((commit) => {
        this.setState({ lastCommit: commit });
      });
    };

    const handleSync = async (index: number) => {
      const remote = this.state.remotes[index];
      await this.cloudSyncUtils.handleSync(remote);
    };

    const handleRemove = async (index: number) => {
      const remote = this.state.remotes[index];
      await this.cloudSyncUtils.handleRemove(remote);
    };

    const handleHistory = async (index: number) => {
      const remote = this.state.remotes[index];
      await this.cloudSyncUtils.handleHistory(remote);
    };

    const handleSettingsChange = (settings: State["settings"]) => {
      this.setState({ settings });
      this.preferenceService.set(
        "cloudSync.settings",
        JSON.stringify(settings)
      );
    };

    return (
      <>
        <CloudSyncCard
          remotes={this.state.remotes}
          onAdd={handleAddRemote}
          onSync={handleSync}
          onRemove={handleRemove}
          onHistory={handleHistory}
          lastCommit={this.state.lastCommit}
          settings={this.state.settings}
          onSettingsChange={handleSettingsChange}
        />
      </>
    );
  }
}

const CLOUD_OPEN_DIALOG = {
  id: "cloud.open-dialog",
  label: "Open Cloud Dialog",
};

@injectable()
export class CloudSyncCommandContribution implements CommandContribution {
  @inject(CloudSyncWidget)
  protected readonly cloudSyncWidget: CloudSyncWidget;

  @inject(ApplicationShell)
  protected readonly applicationShell: ApplicationShell;
  @postConstruct()
  init(): void {}

  registerCommands(commands: CommandRegistry): void {
    commands.registerCommand(CLOUD_OPEN_DIALOG, {
      execute: () => {
        this.cloudSyncWidget.open();
      },
    });
  }
}
