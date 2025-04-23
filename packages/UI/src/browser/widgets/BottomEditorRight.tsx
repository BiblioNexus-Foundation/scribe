import { Message, ReactWidget } from "@theia/core/lib/browser";
import * as React from "@theia/core/shared/react";

import { injectable, inject, postConstruct } from "@theia/core/shared/inversify";
import {
  AbstractViewContribution,
  FrontendApplicationContribution,
  FrontendApplication,
} from "@theia/core/lib/browser";
import { FrontendApplicationStateService } from "@theia/core/lib/browser/frontend-application-state";
import { WorkspaceService } from "@theia/workspace/lib/browser";
import Button from "../../components/Button";

import { Git } from "@theia/git/lib/common";

@injectable()
export class BottomEditorRightWidget extends ReactWidget {
  static readonly ID = "scribe.editor.bottom.right";
  static readonly LABEL = "Editor Bottom Right";

  @postConstruct()
  protected init(): void {
    this.doInit();
  }

  @inject(Git)
  protected readonly git: Git;

  @inject(WorkspaceService)
  protected readonly workspaceService: WorkspaceService;

  protected async doInit(): Promise<void> {
    this.id = BottomEditorRightWidget.ID;
    this.title.label = BottomEditorRightWidget.LABEL;
    this.title.caption = BottomEditorRightWidget.LABEL;
    this.title.closable = true;

    this.update();
  }

  protected override onActivateRequest(msg: Message): void {
    super.onActivateRequest(msg);
    const elArr = this.node.getElementsByTagName("a");
    if (elArr && elArr.length > 0) {
      (elArr[0] as HTMLElement).focus();
    }
  }
  protected render(): React.ReactNode {
    const asyncFn = async () => {
      console.log("Running async function");
      const rootUri = (await this.workspaceService.roots)?.[0]?.resource;
      if (!rootUri) return;
      const repos = await this.git.repositories(rootUri.toString(), {});

      console.log("repos", repos);
      const diffs = await this.git.diff(repos[0]);
      console.log("diffs", diffs);
      return diffs;
    };

    asyncFn().then((diffs) => {
      console.log("Ran with diffs", diffs);
    });
    return (
      <div className="bg-[var(--theia-editor-background)]">
        <p className="text-[var(--theia-settings-textInputForeground)]var(--theia-settings-textInputForeground)] text-center text-xs font-semibold leading-4 tracking-wide">
          Tsv translation notes english
        </p>
        <div className="bg-[var(rgb(245 245 245 / 0.4))] mt-2.5 flex items-center justify-between gap-[5px] rounded-lg p-[5px]">
          <Button
            label="Book"
            className="w-1/3 bg-[var(--theia-editor-background)] font-semibold uppercase text-[var(--theia-settings-textInputForeground)] dark:bg-zinc-800"
          />
          <Button
            label="Chapter"
            className="w-1/3 bg-[var(--theia-editor-background)] font-semibold uppercase text-[var(--theia-settings-textInputForeground)] dark:bg-zinc-800"
          />
          <Button
            label="Verse"
            onClick={async () => {
              const rootUri = (await this.workspaceService.roots)?.[0]?.resource;
              if (!rootUri) return;
              const repos = await this.git.repositories(rootUri.toString(), {});
              await this.git.exec(repos[0], ["add", "-A"]);

              asyncFn().then((diffs) => {
                console.log("Ran with diffs", diffs);
              });
            }}
            className="w-1/3 bg-[var(--theia-editor-background)] font-semibold uppercase text-[var(--theia-settings-textInputForeground)] dark:bg-zinc-800"
          />
        </div>
        <article className="text-[var(--theia-settings-textInputForeground)]leading-[18px] mt-2.5 whitespace-pre-line text-center text-xs tracking-wide">
          1:9b and was baptized by John in the Jordan. and [then] John baptized Jesus/him in the
          Jordan [River]. -OR- • [When he arrived at the place where John was preaching,| John
          baptized him in the Jordan [River].
        </article>
        <div></div>
      </div>
    );
  }
}

@injectable()
export class BottomEditorRightContribution
  extends AbstractViewContribution<BottomEditorRightWidget>
  implements FrontendApplicationContribution
{
  @inject(FrontendApplicationStateService)
  protected readonly stateService: FrontendApplicationStateService;

  @inject(WorkspaceService)
  protected readonly workspaceService: WorkspaceService;

  constructor() {
    super({
      widgetId: BottomEditorRightWidget.ID,
      widgetName: BottomEditorRightWidget.LABEL,
      defaultWidgetOptions: {
        area: "main",
        mode: "split-right",
      },
    });
  }

  async onStart(app: FrontendApplication): Promise<void> {
    this.stateService
      .reachedState("ready")
      .then(() => this.openView({ reveal: false, area: "bottom", mode: "split-right" }));
  }
}
