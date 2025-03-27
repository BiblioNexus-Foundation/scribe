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
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../../components/ui/Resizable";
import { Badge } from "../../components/ui/Badge";

@injectable()
export class BottomEditorLeft extends ReactWidget {
  static readonly ID = "scribe.editor.bottom.left";
  static readonly LABEL = "Editor Main Left";

  @postConstruct()
  protected init(): void {
    this.doInit();
  }

  protected async doInit(): Promise<void> {
    this.id = BottomEditorLeft.ID;
    this.title.label = BottomEditorLeft.LABEL;
    this.title.caption = BottomEditorLeft.LABEL;
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
    return (
      <ResizablePanelGroup
        direction="vertical"
        className="w-full bg-[var(--theia-editor-background)]">
        <ResizablePanel defaultSize={50}>
          <div className="space-y-5 px-5 py-2.5">
            <div className="flex items-center gap-2">
              <Badge variant="destructive">Mark 1:9</Badge>
              <p className="text-xs font-semibold tracking-wide text-zinc-300 dark:text-zinc-700">
                Alignment
              </p>
            </div>
            <p className="text-sm font-medium leading-4 tracking-wide text-[var(--theia-settings-textInputForeground)]">
              Cierto dia, Jesús llegó de Nazaret de Galilea, y Juan lo bautizó en el rio Jordán.
            </p>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="p-5" defaultSize={50}>
          <p className="text-sm font-medium leading-4 tracking-wide text-[var(--theia-settings-textInputForeground)]">
            <span className="bg-emerald-100">One day Jesus</span> went from{" "}
            <span className="bg-emerald-100">Nazareth</span> in{" "}
            <span className="bg-emerald-100">Galilee, </span> and James I baptized him in the river.
          </p>
        </ResizablePanel>
      </ResizablePanelGroup>
    );
  }
}

@injectable()
export class BottomEditorLeftContribution
  extends AbstractViewContribution<BottomEditorLeft>
  implements FrontendApplicationContribution
{
  @inject(FrontendApplicationStateService)
  protected readonly stateService: FrontendApplicationStateService;

  @inject(WorkspaceService)
  protected readonly workspaceService: WorkspaceService;

  constructor() {
    super({
      widgetId: BottomEditorLeft.ID,
      widgetName: BottomEditorLeft.LABEL,
      defaultWidgetOptions: {
        area: "bottom",
      },
    });
  }

  async onStart(app: FrontendApplication): Promise<void> {
    this.stateService
      .reachedState("ready")
      .then(() => this.openView({ reveal: false, area: "bottom" }));
  }
}
