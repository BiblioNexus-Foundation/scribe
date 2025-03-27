import * as React from "@theia/core/shared/react";
import { ReactDialog } from "@theia/core/lib/browser/dialogs/react-dialog";
import { inject, injectable } from "@theia/core/shared/inversify";
import { DialogProps } from "@theia/core/lib/browser";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { resourcesGroups } from "./resources";
import ResourceTypeDisplay from "../components/ResourcesManager/ResourcesDisplay";

import { Message } from "@theia/core/lib/browser";

import { MessageService } from "@theia/core";
import { ConfigResourceValues, DownloadResourceUtils, ScribeResource } from "./resources/types";
import { registeredResources } from "./resources";
import { WorkspaceService } from "@theia/workspace/lib/browser/workspace-service";
import { FileService } from "@theia/filesystem/lib/browser/file-service";

import { ResourceManagerUtils } from "./utils";
import { ResourceViewerOpener } from "./resource-viewer/resource-viewer-opener";

import { VerseRefUtils, VerseRefValue } from "@scribe/theia-utils/lib/browser";

@injectable()
export class ResourcePickerDialogProps extends DialogProps {}

@injectable()
export class ResourcesPickerWidget extends ReactDialog<void> {
  static readonly ID = "ResourcesPickerWidget";

  constructor(
    @inject(ResourcePickerDialogProps)
    protected override readonly props: ResourcePickerDialogProps
  ) {
    super({
      title: "Resources Picker ",
    });
    if (this.titleNode && this.titleNode.parentElement) {
      this.titleNode.parentElement.style.textTransform = "uppercase";
      this.titleNode.parentElement.style.backgroundColor = "#083344";
      this.titleNode.parentElement.style.color = "#164E63";
    }

    // this.titleNode.className =
    //   "bg-grey-300 text-lg text-cyan-950 font-semibold";
    // this.titleNode.parentElement!.className =
    //   "bg-blue-500 justify-between flex items-center p-2";
    // this.titleNode.parentElement!.innerHTML = "Parent";
  }

  private downloadedResources: ConfigResourceValues[] = [];

  @inject(ResourceViewerOpener)
  protected readonly resourceViewerOpener: ResourceViewerOpener;

  @inject(MessageService)
  protected readonly messageService: MessageService;

  @inject(WorkspaceService)
  protected readonly workspaceService: WorkspaceService;

  @inject(FileService)
  protected readonly fs: FileService;

  @inject(ResourceManagerUtils)
  protected readonly resourcesManagerUtils: ResourceManagerUtils;

  @inject(VerseRefUtils)
  protected verseRefUtils: VerseRefUtils;

  protected onAfterAttach(msg: Message): void {
    super.onAfterAttach(msg);
    this.resourcesManagerUtils.getDownloadedResourcesFromProjectConfig().then((resources) => {
      this.downloadedResources = resources ?? [];
      this.update();
    });
  }

  get value(): any {
    return "value";
  }

  render(): React.ReactNode {
    const allUngroupedResources = resourcesGroups.flatMap((group) => group.resources);

    const openHandler = async (resourceInfo: ConfigResourceValues, resource: ScribeResource) => {
      if (!resource) {
        await this.messageService.error("Resource type not found");
        return;
      }

      this.close();

      await this.resourceViewerOpener.open(resourceInfo, {
        ...resource.openHandlers,
        id: resource.id,
      });
    };
    return (
      <div className="relative top-0 flex h-[80vh] w-[90vw] justify-between gap-3">
        {/* <VerseRefInput
          setVerseRef={(verseRef) => this.verseRefUtils.setVerseRef(verseRef)}
        /> */}

        <Tabs defaultValue={allUngroupedResources[0].id} className="flex w-full">
          <TabsList className="mr-3 flex h-fit w-1/6 flex-col">
            {resourcesGroups.map((group) => (
              <div key={group.id} className="mb-5 flex w-full flex-col gap-2">
                <h1 className="text-xxs uppercase">{group.name}</h1>
                {group.resources.map((resource) => (
                  <TabsTrigger
                    value={resource.id}
                    asChild
                    className="m-0 mx-0 flex items-center px-2 py-0.5 font-medium text-white">
                    <button className="flex gap-2 text-sm">
                      {resource.icon}
                      <span>{resource.displayLabel}</span>
                    </button>
                  </TabsTrigger>
                ))}
              </div>
            ))}
          </TabsList>
          <div className="min-h-full flex-1 border-l border-gray-300 px-10">
            {allUngroupedResources.map((resource) => (
              <TabsContent value={resource.id}>
                <ResourceTypeDisplay
                  resourceType={{
                    value: resource.id,
                    label: resource.displayLabel,
                    getTableDisplayData: resource.getTableDisplayData,
                    downloadHandler: <ResourceInfo extends {}>(resourceInfo: ResourceInfo) =>
                      this._downloadResource(resourceInfo, resource.downloadResource),
                  }}
                  downloadedResources={this.downloadedResources}
                  openResource={(resourceInfo) => openHandler(resourceInfo, resource)}
                />
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    );
  }

  async _downloadResource<TResourceInfo>(
    resourceInfo: TResourceInfo,
    downloadHandler: (
      resourceInfo: TResourceInfo,
      { fs, resourceFolderUri }: DownloadResourceUtils
    ) => Promise<ConfigResourceValues>
  ) {
    try {
      const currentFolderURI = (await this.workspaceService.roots)?.[0].resource;

      if (!currentFolderURI) {
        await this.messageService.error("Please open a workspace folder to download resources");
        return;
      }

      const fs = this.fs;

      const resourceFolderUri = currentFolderURI.withPath(
        currentFolderURI.path.join(".project", "resources")
      );

      const prog = await this.messageService.showProgress({
        text: "Downloading resource ...",
      });

      const downloadedResource = await downloadHandler(resourceInfo, {
        fs,
        resourceFolderUri,
      });

      prog.report({ message: "Updating the configuration" });

      const updatedDownloadedResourcePath = {
        ...downloadedResource,
        localPath: downloadedResource.localPath.includes(currentFolderURI.path.fsPath())
          ? downloadedResource.localPath.replace(currentFolderURI.path.fsPath(), "")
          : downloadedResource.localPath,
      };

      await this.resourcesManagerUtils.addDownloadedResourceToProjectConfig(
        updatedDownloadedResourcePath
      );

      this.update();
      prog.cancel();

      this.messageService.info("Resource downloaded successfully");
    } catch (error) {
      console.error(error);
      await this.messageService.error("Unable to download resource ...");
    }
  }
}

interface VerseRefInputProps {
  setVerseRef: (verseRef: VerseRefValue) => void;
}

// const VerseRefInput: React.FC<VerseRefInputProps> = ({ setVerseRef }) => {
//   const [book, setBook] = React.useState("");
//   const [chapter, setChapter] = React.useState("");
//   const [verse, setVerse] = React.useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setVerseRef({ book, chapter: parseInt(chapter), verse: parseInt(verse) });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="book">Book:</label>
//         <input
//           type="text"
//           id="book"
//           placeholder="Book"
//           value={book}
//           onChange={(e) => setBook(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="chapter">Chapter:</label>
//         <input
//           type="number"
//           id="chapter"
//           placeholder="Chapter"
//           value={chapter}
//           onChange={(e) => setChapter(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="verse">Verse:</label>
//         <input
//           type="number"
//           id="verse"
//           placeholder="Verse"
//           value={verse}
//           onChange={(e) => setVerse(e.target.value)}
//         />
//       </div>
//       <button type="submit">Set Verse Ref</button>
//     </form>
//   );
// };
