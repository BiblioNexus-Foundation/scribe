import { inject, injectable, postConstruct } from "@theia/core/shared/inversify";
import { Git, GitFileStatus, type Remote } from "@theia/git/lib/common";
import { WorkspaceService } from "@theia/workspace/lib/browser";
import { PreferenceService } from "@theia/core/lib/browser";
export type LastCommit = {
  message: string;
  timestamp: string;
  author: string;
  timestampRelative: string;
};

@injectable()
export class CloudSyncUtils {
  @inject(Git)
  protected readonly git: Git;

  state: {
    remotes: Remote[];
  } = {
    remotes: [],
  };

  @inject(WorkspaceService)
  protected readonly workspaceService: WorkspaceService;

  @inject(PreferenceService)
  protected readonly preferenceService: PreferenceService;

  @postConstruct()
  init(): void {
    this.preferenceService.ready.then(() => {
      const settings = JSON.parse(
        this.preferenceService.get<string>("cloudSync.settings") || "{}"
      ) as {
        autoCommit: boolean;
        autoSync: boolean;
        autoCommitInterval?: number;
        autoSyncInterval?: number;
      };
      if (settings?.autoCommit) {
        setInterval(
          async () => {
            console.log("Committing changes");
            await this.commitChanges();
          },
          (settings?.autoCommitInterval ?? 2 * 60) * 1000
        );
      }
    });
  }

  async getRemotes(): Promise<any> {
    const rootUri = (await this.workspaceService.roots)?.[0]?.resource;
    if (!rootUri) return;
    const repos = await this.git.repositories(rootUri.toString(), {});
    const remotes = await this.git.remote(repos[0], {
      verbose: true,
    });

    console.log("CloudSyncUtils::: remotes ", remotes);

    return remotes;
  }

  handleAddRemote = async ({ name, url }: { name: string; url: string }) => {
    const rootUri = (await this.workspaceService.roots)?.[0]?.resource;
    if (!rootUri) return;
    const repos = await this.git.repositories(rootUri.toString(), {});

    await this.git.exec(repos[0], ["remote", "add", name, url]);

    await this.git.fetch(repos[0], {
      remote: name,
    });
  };

  repoStatus = async () => {
    const rootUri = (await this.workspaceService.roots)?.[0]?.resource;
    if (!rootUri) return;
    const repos = await this.git.repositories(rootUri.toString(), {});
    const status = await this.git.status(repos[0]);
    return status;
  };

  handleSync = async (remote: Remote) => {
    const rootUri = (await this.workspaceService.roots)?.[0]?.resource;
    if (!rootUri) return;
    const repos = await this.git.repositories(rootUri.toString(), {});
    await this.git.fetch(repos[0], {
      remote: remote.name,
    });

    await this.git.pull(repos[0], {
      remote: remote.name,
    });

    await this.git.push(repos[0], {
      remote: remote.name,
    });
  };

  handleRemove = async (remote: Remote) => {
    const rootUri = (await this.workspaceService.roots)?.[0]?.resource;
    if (!rootUri) return;
    const repos = await this.git.repositories(rootUri.toString(), {});
    await this.git.exec(repos[0], ["remote", "remove", remote.name]);
    await this.getRemotes();
  };

  handleHistory = async (remote: Remote) => {
    const rootUri = (await this.workspaceService.roots)?.[0]?.resource;
    if (!rootUri) return;
    const repos = await this.git.repositories(rootUri.toString(), {});
    const history = await this.git.log(repos[0]);
    return history;
  };

  async commitChanges(): Promise<any> {
    const rootUri = (await this.workspaceService.roots)?.[0]?.resource;
    if (!rootUri) return;
    const repos = await this.git.repositories(rootUri.toString(), {});
    const status = await this.git.status(repos[0]);

    const changesToCommit: {
      name: string;
      path: string;
      status: GitFileStatus;
      message: string;
    }[] = status.changes
      .filter(
        (change) =>
          change.status === GitFileStatus.Modified ||
          change.status === GitFileStatus.New ||
          change.status === GitFileStatus.Deleted ||
          change.status === GitFileStatus.Renamed
      )
      .map((change) => {
        const name = change.uri
          .toString()
          .replace(rootUri.toString(), "")
          .split("/")
          .at(-1) as string;
        return {
          name,
          path: change.uri.toString().replace(rootUri.toString(), ""),
          status: change.status,
          message: `${change.status.toString()} ${name}`,
        };
      });

    await Promise.all(
      changesToCommit.map(async (change) => {
        this.git.add(repos[0], change.path);
        await this.git.commit(repos[0], change.message);
      })
    );
  }

  async getLastCommit(): Promise<LastCommit> {
    const rootUri = (await this.workspaceService.roots)?.[0]?.resource;
    if (!rootUri) throw new Error("Root URI not found");
    const repos = await this.git.repositories(rootUri.toString(), {});
    const log = await this.git.log(repos[0]);

    const commit = log.at(0);
    return {
      message: commit?.summary ?? "",
      timestamp: commit?.author.timestamp as string,
      author: commit?.author.name ?? "",
      timestampRelative: commit?.authorDateRelative ?? "",
    };
  }
}
