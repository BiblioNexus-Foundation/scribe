import * as React from "@theia/core/shared/react";
import { inject, injectable, postConstruct } from "@theia/core/shared/inversify";
import { ReactWidget } from "@theia/core/lib/browser/widgets/react-widget";
import {
  AbstractViewContribution,
  FrontendApplicationContribution,
  FrontendApplication,
} from "@theia/core/lib/browser";
import { FrontendApplicationStateService } from "@theia/core/lib/browser/frontend-application-state";
import { WorkspaceService } from "@theia/workspace/lib/browser";
import { Badge } from "../../components/ui/Badge";
import {
  IconMicrophone,
  IconMinus,
  IconPlayerPause,
  IconPlayerPlay,
  IconPlus,
  IconRefresh,
  IconSettings,
  IconTrashX,
} from "@tabler/icons-react";
import Button from "../../components/Button";
import ButtonGroups from "../../components/ButtonGroup";
import { PrevVerse } from "bcv-navigator/lib/browser/components/PrevVerse";
import { NextVerse } from "bcv-navigator/lib/browser/components/NextVerse";

@injectable()
export class AudioPlayWidget extends ReactWidget {
  static readonly ID = "Audio-play-widget";
  static readonly LABER = "Audio";

  @postConstruct()
  protected init(): void {
    this.doInit();
  }

  protected async doInit(): Promise<void> {
    this.id = AudioPlayWidget.ID;
    this.title.label = AudioPlayWidget.LABER;
    this.title.caption = AudioPlayWidget.LABER;
    this.title.closable = true;
    this.update();
  }

  render(): React.ReactNode {
    return (
      <div className="">
        <div className="border-[rgb(250 250 250 / 0.1)] h-[30%] border-t">
          <ButtonGroups />
          {/* <IconAudio className="fill-zinc-100  w-[100vw]  dark:stroke-zinc-800 dark:fill-zinc-800 " /> */}

          <div className="flex">
            <div className="flex w-[20%] flex-col items-center gap-4 2xl:w-[15%]">
              <span className="text-[10px] font-medium uppercase leading-3 text-zinc-400 dark:text-zinc-500">
                Audio
              </span>
              costom select
              {/* <CustomSelect
                options={sources}
                placeholder="Source"
                triggerClassName="w-fit h-5 uppercase gap-1 text-[10px] bg-cyan-400 text-zinc-50 rounded-full"
              /> */}
            </div>
            <div className="mt-auto h-7 w-[1px] bg-gray-300 dark:bg-zinc-700" />
            <div className="flex w-[20%] flex-col items-center gap-4 2xl:w-[15%]">
              <span className="text-[10px] font-medium uppercase leading-3 text-zinc-400 dark:text-zinc-500">
                Speed
              </span>
              speed select
              {/* <CustomSelect
                options={speeds}
                placeholder="2x"
                triggerClassName="w-fit h-5 uppercase gap-1 text-[10px] bg-cyan-400 text-zinc-50 rounded-full"
              /> */}
            </div>
            <div className="mt-auto h-7 w-[1px] bg-gray-300 dark:bg-zinc-700" />
            <div className="flex w-[50%] justify-between gap-7 px-16 2xl:w-[40%]">
              <div className="space-y-2">
                <p className="text-[10px] font-medium uppercase text-zinc-400 dark:text-zinc-500">
                  Rewind
                </p>
                <Button
                  className="rounded-lg"
                  icon={<IconRefresh size={14} stroke={2} strokeLinejoin="miter" />}
                />
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-medium uppercase text-zinc-400 dark:text-zinc-500">
                  Record
                </p>
                <Button
                  className="rounded-lg"
                  icon={<IconMicrophone size={14} stroke={2} strokeLinejoin="miter" />}
                />
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-medium uppercase text-zinc-400 dark:text-zinc-500">
                  Play
                </p>
                <Button
                  className="rounded-lg bg-cyan-400 text-zinc-800 hover:bg-cyan-500 dark:border-cyan-700 dark:bg-cyan-500 dark:text-zinc-50 dark:hover:bg-cyan-400"
                  icon={<IconPlayerPlay size={14} stroke={2} strokeLinejoin="miter" />}
                />
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-medium uppercase text-zinc-400 dark:text-zinc-500">
                  Pause
                </p>
                <Button
                  className="rounded-lg"
                  icon={<IconPlayerPause size={14} stroke={2} strokeLinejoin="miter" />}
                />
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-medium uppercase text-zinc-400 dark:text-zinc-500">
                  Delete
                </p>
                <Button
                  className="rounded-lg"
                  icon={<IconTrashX size={14} stroke={2} strokeLinejoin="miter" />}
                />

                <div className="space-y-4">
                  <p className="text-center text-[10px] font-medium uppercase text-zinc-400 dark:text-zinc-500">
                    Volume
                  </p>
                  <span className="flex items-center gap-x-2">
                    <IconMinus
                      size={14}
                      stroke={2}
                      strokeLinejoin="miter"
                      className="cursor-pointer text-zinc-700 dark:text-zinc-50"
                    />
                    <span className="border-[rgb(250 250 250 / 0.1)] relative h-2 w-40 rounded-full border bg-white">
                      <span className="absolute -bottom-[1px] -left-[1px] h-2 w-[70%] rounded-full bg-cyan-400"></span>
                    </span>
                    <IconPlus
                      size={14}
                      stroke={2}
                      strokeLinejoin="miter"
                      className="cursor-pointer text-zinc-700 dark:text-zinc-50"
                    />
                  </span>
                </div>
              </div>
              <div className="mt-auto h-7 w-[1px] bg-gray-300 dark:bg-zinc-700">
                <div className="mt-auto h-7 w-[1px] bg-gray-300 dark:bg-zinc-700" />

                <div className="flex w-[15%] flex-col items-center gap-4 2xl:w-[10%]">
                  <p className="text-[10px] font-medium uppercase text-zinc-400 dark:text-zinc-500">
                    Settings
                  </p>
                  <IconSettings
                    size={24}
                    stroke={2}
                    strokeLinejoin="miter"
                    className="text-zinc-500 dark:text-zinc-50"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center p-5">
            <PrevVerse />
            <NextVerse />
          </div>
          <div className="flex items-center justify-end p-5">
            <Badge className="h-4 max-h-4">saved 5 mins ago</Badge>
          </div>
        </div>
      </div>
    );
  }
}

@injectable()
export class AudioPlayContribution
  extends AbstractViewContribution<AudioPlayWidget>
  implements FrontendApplicationContribution
{
  @inject(FrontendApplicationStateService)
  protected readonly stateService: FrontendApplicationStateService;

  @inject(WorkspaceService)
  protected readonly workspaceService: WorkspaceService;

  constructor() {
    super({
      widgetId: AudioPlayWidget.ID,
      widgetName: AudioPlayWidget.LABER,
      defaultWidgetOptions: {
        area: "bottom",
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
