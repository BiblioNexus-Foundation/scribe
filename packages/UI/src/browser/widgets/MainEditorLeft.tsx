import { Message, ReactWidget } from "@theia/core/lib/browser";
import * as React from "@theia/core/shared/react";

import {
  injectable,
  inject,
  postConstruct,
} from "@theia/core/shared/inversify";
import {
  AbstractViewContribution,
  FrontendApplicationContribution,
  FrontendApplication,
} from "@theia/core/lib/browser";
import { FrontendApplicationStateService } from "@theia/core/lib/browser/frontend-application-state";
import { WorkspaceService } from "@theia/workspace/lib/browser";
import ChapterReading from "../../components/ChapterReading";
import { GlobalStateStorage } from "@scribe/theia-utils/lib/browser/global-state-storage";
@injectable()
export class MainEditorLeftWidget extends ReactWidget {
  static readonly ID = "scribe.editor.main.left";
  static readonly LABEL = "Editor Main Left";

  data: string | undefined;

  @inject(GlobalStateStorage)
  protected readonly globalStateStorage: GlobalStateStorage;

  @postConstruct()
  protected init(): void {
    this.doInit();
    this.globalStateStorage.onUpdate("test", (verse) => {
      console.log("OnUpdated Test: Global State updated!", verse);
      this.data = (verse as string) ?? undefined;
      this.update();
    });
  }

  protected async doInit(): Promise<void> {
    this.id = MainEditorLeftWidget.ID;
    this.title.label = MainEditorLeftWidget.LABEL;
    this.title.caption = MainEditorLeftWidget.LABEL;
    this.title.closable = true;

    this.globalStateStorage.getData("test").then((data) => {
      this.data = (data as string) ?? undefined;
    });

    this.globalStateStorage.onDidUpdateEvent((e) => {
      console.log("MainEditorLeftWidget: Global State updated!", e);
    });

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
      <div className="bg-[var(--theia-editor-background)]">
        <div>DATA FROM THE STORAGE: {this.data}</div>
        <ChapterReading
          version="NTV"
          chapterName="Marcos"
          verse="1"
          scripture='Marcos 1 Juan el Bautista prepara el camino &apos; Esta es la Buena Noticia acerca de Jesús el Mesías, el Hijo de Dios. Comenzó 2 tal como el profeta Isaías había escrito: «Mira, envio a mi mensajero delante de ti, y él preparará tu camino. 3 Es una voz que clama en el desierto: "¡Preparen el camino para la venida del Señor! ¡Ábranle camino!"». 4 Ese mensajero era Juan el Bautista. Estaba en el desierto y predicaba que la gente debía ser bautizada para demostrar que se había arrepentido de sus pecados y vuelto a Dios para ser perdonada. 5 Toda la gente de Judea, incluidos los habitantes de Jerusalén, salían para ver y oír a Juan; y cuando confesaban sus pecados, él los bautizaba en el río Jordán.'
        />
      </div>
    );
  }
}

@injectable()
export class MainEditorLeftContribution
  extends AbstractViewContribution<MainEditorLeftWidget>
  implements FrontendApplicationContribution
{
  @inject(FrontendApplicationStateService)
  protected readonly stateService: FrontendApplicationStateService;

  @inject(WorkspaceService)
  protected readonly workspaceService: WorkspaceService;

  constructor() {
    super({
      widgetId: MainEditorLeftWidget.ID,
      widgetName: MainEditorLeftWidget.LABEL,
      defaultWidgetOptions: {
        area: "main",
      },
    });
  }

  async onStart(app: FrontendApplication): Promise<void> {
    this.stateService.reachedState("ready").then(() => {});
  }
}
