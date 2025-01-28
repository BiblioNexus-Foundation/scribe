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
import DraftbodySection from "../../components/DraftbodySection";
import Button from "../../components/Button";
import { IconPlus, IconX } from "@tabler/icons-react";
import MenuDropdown from "../../components/Fonts/MenuDropdown";

@injectable()
export class ChapterWidget extends ReactWidget {
  static readonly ID = "Chapter-page-widget";
  static readonly LABER = "main-chapter";

  @postConstruct()
  protected init(): void {
    this.doInit();
  }

  protected async doInit(): Promise<void> {
    this.id = ChapterWidget.ID;
    this.title.label = ChapterWidget.LABER;
    this.title.caption = ChapterWidget.LABER;
    this.title.closable = true;
    this.update();
  }

  render(): React.ReactNode {
    return (
      <div>
        <div className="flex justify-between">
          <div className="flex">
            <Button
              label="NIV"
              className="flex-row-reverse border-none rounded-none  dark:bg-gray-900  gap-3  text-[10px] flex item-center justify-content-center dark:text-gray-300 text-gray-600"
            />
            <Button
              label="HEB"
              className="flex-row-reverse border-none rounded-t-md rounded-b-none dark:bg-cyan-900 bg-cyan-300 text-cyan-500  gap-3  text-[10px] flex item-center justify-content-center dark:text-cyan-500 text-gray-600"
              icon={<IconX size={14} stroke={2} strokeLinejoin="miter" />}
            />
            <Button
              label="FNV-NT"
              className="flex-row-reverse gap-3 rounded-none  border-none dark:bg-gray-900  text-[10px] flex item-center justify-content-center dark:text-gray-300 text-gray-600"
            />
            <Button
              label="HPUX"
              className="flex-row-reverse gap-3 rounded-none border-none dark:bg-gray-900  text-[10px] flex item-center justify-content-center dark:text-gray-300 text-gray-600"
            />
            <Button
              label=""
              className="flex-row-reverse gap-3 rounded-none border-none dark:bg-transparent   text-[10px] flex item-center justify-content-center dark:text-gray-300 text-gray-600"
              icon={<IconPlus size={14} stroke={2} strokeLinejoin="miter" />}
            />
          </div>
          <div className="flex gap-2 items-center justify-center">
            <MenuDropdown
              selectedFont="font"
              buttonStyle="button text-[10px] text-gray-200 bg-primary-500 hover:bg-primary-500/90 text-highlight-300 gap-1"
              key={21}
              showIcon={true}
              setSelectedFont={(font) =>
                console.log("====================", font)
              }
            />
            <Button
              label=""
              className="flex-row-reverse gap-3 rounded-none border-none dark:bg-transparent   text-[10px] flex item-center justify-content-center dark:text-gray-300 text-gray-600"
              icon={<IconX size={15} stroke={2} strokeLinejoin="miter" />}
            />
          </div>
        </div>
        <DraftbodySection />
      </div>
    );
  }
}

@injectable()
export class ChapterContribution
  extends AbstractViewContribution<ChapterWidget>
  implements FrontendApplicationContribution
{
  @inject(FrontendApplicationStateService)
  protected readonly stateService: FrontendApplicationStateService;

  @inject(WorkspaceService)
  protected readonly workspaceService: WorkspaceService;

  constructor() {
    super({
      widgetId: ChapterWidget.ID,
      widgetName: ChapterWidget.LABER,
      defaultWidgetOptions: {
        area: "main",
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
