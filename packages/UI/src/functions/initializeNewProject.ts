import { WorkspaceService } from "@theia/workspace/lib/browser";
import { FileService } from "@theia/filesystem/lib/browser/file-service";
import { MessageService } from "@theia/core";
import { inject, injectable } from "inversify";
import { ProjectDetails } from "src/utils/createProjectUtil";
import { URI } from "@theia/core/lib/common/uri";
// import { CommandService } from "@theia/core/lib/common";
import { ProjectTemplate } from "./Constant";
import moment from "moment";
import { v5 as uuidV5 } from "uuid";

@injectable()
export class ProjectInitializer {
  // @inject(CommandService)
  // private readonly commandService: CommandService;

  @inject(WorkspaceService)
  private readonly workspaceService: WorkspaceService;

  @inject(FileService)
  private readonly fileService: FileService;

  @inject(MessageService)
  private readonly messageService: MessageService;
  public async initializeNewProject(projectData: ProjectDetails | undefined) {
    try {
      const roots = await this.workspaceService.roots;

      if (!roots || roots.length === 0) {
        this.messageService.error("No workspace folder found.");
        return undefined;
      }

      const workspaceUri = roots[0].resource.toString();
      const decodeUri = decodeURIComponent(workspaceUri);
      const normalizedPath = decodeUri.replace(/\\/g, "/");
      const projectFilePath = new URI(normalizedPath).resolve("metadata.json");

      if (!projectData) {
        await this.messageService.info("Project initialization cancelled.");
        return;
      }

      // const projectFilePath = projectData.ProjectFilePath;
      if (!projectFilePath) {
        await this.messageService.error("Project file path is missing.");
        return;
      }
      const fileExists = await this.fileService.exists(projectFilePath);

      if (fileExists) {
        try {
          const fileData = await this.fileService.readFile(projectFilePath);
          const fileContent = fileData.value.toString();
          const jsonMatch = fileContent.match(/\{(?:[^{}]|(?:\{[^}]*\}))*\}/s);
          if (!jsonMatch) {
            await this.messageService.error("file content is not json");
            return;
          }
          const jsonString = jsonMatch[0];
          const cleanedJson = jsonString.trim();
          const metadata = JSON.parse(cleanedJson);

          const projectName = metadata.projectName;
          const confirmDelete = await this.messageService.info(
            `A project named "${projectName}" already exists in this workspace. Do you want to delete it?`,
            "Delete",
            "Cancel"
          );

          if (confirmDelete !== "Delete") {
            await this.messageService.info("cancel to delete the file !");
            return;
          }
          await this.fileService.delete(projectFilePath);
          const projectFolder = new URI(workspaceUri.toString()).resolve(
            projectName
          );
          const files = await this.fileService.resolve(projectFolder);

          if (!files) {
            await this.messageService.error("The file are not exist");
          }
          if (files.children) {
            for (const child of files.children) {
              const fileUri = child.resource;

              await this.fileService.delete(fileUri, {
                recursive: true,
                useTrash: false,
              });
              console.log(`Deleted: ${fileUri.toString()}`);
            }
          }
          await this.messageService.info(`Project ${projectName} deleted.`);
        } catch (error) {
          console.log(error, "==================");
        }
      }

      await this.messageService.info("Initializing new project...");

      const newProject = await this.initializeProjectMetadata(projectData);
      this.messageService.info(
        `New project initialized: ${newProject?.meta.generator.userName}'s ${newProject?.meta.category}`
      );

      const projectScope = newProject?.type.flavorType.currentScope;
      if (!projectScope) {
        this.messageService.error(
          "Failed to initialize new project: project scope not found."
        );
        return;
      }
      // const books = Object.keys(projectScope);

      // await createProjectNotebooks({ books, shouldOverWrite: true });

      // Refresh the scripture tree view
      // await this.commandService.executeCommand(
      //   "scripture-explorer-activity-bar.refreshEntry"
      // );

      // Trigger indexing of verse references in the source text
      // indexVerseRefsInSourceText();
    } catch (error) {
      console.log(error, "error happening when we create Project============");
      await this.messageService.error("Failed to create project file.");
    }
  }

  private async initializeProjectMetadata(
    details: ProjectDetails | undefined
  ): Promise<any> {
    if (!details) return this.messageService.error("No project details found.");
    const newProject = ProjectTemplate as Record<string, any>;

    newProject.projectName = details.projectName;
    newProject.meta.category = details.projectCategory;
    newProject.meta.generator.userName = details?.userName;
    newProject.meta.dateCreated = moment().format();

    const key = details?.userName + details?.projectName + moment().format();
    const id = uuidV5(key, "1b671a64-40d5-491e-99b0-da01ff1f3341");

    newProject.identification.primary = {
      scribe: {
        [id]: {
          revision: "1",
          timestamp: moment().format(),
        },
      },
    };

    newProject.languages[0].tag = (details.targetLanguage as any).tag;
    newProject.languages[0].scriptDirection = (
      details.targetLanguage as any
    ).scriptDirection?.toLowerCase();
    newProject.identification.name.en = details.projectName;
    newProject.identification.abbreviation.en = details.abbreviation;
    newProject.languages[0].name.en = (details.targetLanguage as any).refName;
    newProject.copyright.licenses[0].ingredient = "license.md";

    const workspaceFolderUri = this.workspaceService.workspace;

    if (!workspaceFolderUri) {
      console.error("No workspace folder found.");
      return;
    }
    const newFilePath = new URI(workspaceFolderUri.toString()).resolve(
      "my-folder/my-file.txt"
    );
    console.log("New file path:", newFilePath.toString());
    const WORKSPACE_FOLDER = await this?.workspaceService?.roots;

    if (!WORKSPACE_FOLDER || WORKSPACE_FOLDER.length === 0) {
      this.messageService.error("No workspace folder found.");
      return undefined;
    }

    const workspaceUri = WORKSPACE_FOLDER[0].resource.toString();
    const decodeUri = decodeURIComponent(workspaceUri);
    const normalizedPath = decodeUri.replace(/\\/g, "/");

    const projectFilePath = new URI(normalizedPath).resolve("metadata.json");

    const projectFileData = JSON.stringify(newProject, null, 4);

    // FIXME: need to handle the case where the file does not exist
    await this.fileService.write(projectFilePath, projectFileData);
    this.messageService.info(
      `Project created at ${projectFilePath.toString()}`
    );

    const languages = [];

    languages.push(details.sourceLanguage);
    languages.push(details.targetLanguage);

    newProject.languages = languages;

    return newProject;
  }
}
