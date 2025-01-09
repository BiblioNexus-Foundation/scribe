import { WorkspaceService } from "@theia/workspace/lib/browser";
import { FileService } from "@theia/filesystem/lib/browser/file-service";
import { MessageService } from "@theia/core";
import { inject, injectable } from "inversify";
import { ProjectDetails } from "src/utils/createProjectUtil";
import { URI } from "@theia/core/lib/common/uri";
import { CommandService } from "@theia/core/lib/common";
// import moment from "moment";
// import { v5 as uuidV5 } from "uuid";
// import ProjectTemplate from "../utils/TextTemplate.json";

@injectable()
export class ProjectInitializer {
  @inject(CommandService)
  private readonly commandService: CommandService;

  @inject(WorkspaceService)
  private readonly workspaceService: WorkspaceService;

  @inject(FileService)
  private readonly fileService: FileService;

  @inject(MessageService)
  private readonly messageService: MessageService;
  public async initializeNewProject(projectData: ProjectDetails | undefined) {
    try {
      if (!projectData) {
        await this.messageService.info("Project initialization cancelled.");
        return;
      }

      const projectFilePath = projectData.ProjectFilePath;
      if (!projectFilePath) {
        await this.messageService.error("Project file path is missing.");
        return;
      }

      const projectFileUri = new URI(projectFilePath);
      console.log(projectFileUri, ",Project data i changed");
      const workspaceFolderUri = this.workspaceService.workspace;

      if (!workspaceFolderUri) {
        await this.messageService.error("Workspace folder not found.");
        return;
      }

      const metadataFileUri = await this.fileService.resolve(projectFileUri);
      console.log("Project file:==here", metadataFileUri);
      const fileexists = await this.fileService.exists(projectFileUri);
      if (fileexists) {
        const fileData = await this.fileService.readFile(projectFileUri);
        const metadata = JSON.parse(fileData.toString());

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
        const projectFolder = new URI(workspaceFolderUri.toString()).resolve(
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
      }

      await this.messageService.info("Initializing new project...");

      console.log("initialize new project function");
      // const newProject = await this.initializeProjectMetadata(projectData);
      // this.messageService.info(
      //   `New project initialized: ${newProject?.meta.generator.userName}'s ${newProject?.meta.category}`
      // );

      // const projectScope = newProject?.type.flavorType.currentScope;
      // if (!projectScope) {
      //   this.messageService.error(
      //     "Failed to initialize new project: project scope not found."
      //   );
      //   return;
      // }
      // const books = Object.keys(projectScope);

      // await createProjectNotebooks({ books, shouldOverWrite: true });

      // Refresh the scripture tree view
      await this.commandService.executeCommand(
        "scripture-explorer-activity-bar.refreshEntry"
      );

      // Trigger indexing of verse references in the source text
      // indexVerseRefsInSourceText();
    } catch (error) {
      console.log(error, "error happening when we create Project============");
      await this.messageService.error("Failed to create project file.");
    }
  }

  // private async initializeProjectMetadata(
  //   details: ProjectDetails
  // ): Promise<any> {
  //   // Initialize a new project with the given details and return the project object

  //   const newProject = ProjectTemplate as Record<string, any>;

  //   newProject.projectName = details.projectName;
  //   newProject.meta.category = details.projectCategory;
  //   newProject.meta.generator.userName = details.userName;
  //   newProject.meta.dateCreated = moment().format();

  //   const key = details.userName + details.projectName + moment().format();
  //   const id = uuidV5(key, "1b671a64-40d5-491e-99b0-da01ff1f3341");

  //   newProject.identification.primary = {
  //     scribe: {
  //       [id]: {
  //         revision: "1",
  //         timestamp: moment().format(),
  //       },
  //     },
  //   };

  //   newProject.languages[0].tag = (details.targetLanguage as any).tag;
  //   newProject.languages[0].scriptDirection = (
  //     details.targetLanguage as any
  //   ).scriptDirection?.toLowerCase();
  //   newProject.identification.name.en = details.projectName;
  //   newProject.identification.abbreviation.en = details.abbreviation;
  //   newProject.languages[0].name.en = (details.targetLanguage as any).refName;
  //   newProject.copyright.licenses[0].ingredient = "license.md";

  //   const workspaceFolderUri = this.workspaceService.workspace;

  //   if (!workspaceFolderUri) {
  //     console.error("No workspace folder found.");
  //     return;
  //   }
  //   const newFilePath = new URI(workspaceFolderUri.toString()).resolve(
  //     "my-folder/my-file.txt"
  //   );
  //   console.log("New file path:", newFilePath.toString());
  //   const WORKSPACE_FOLDER =
  //     vscode?.workspace?.workspaceFolders &&
  //     vscode?.workspace?.workspaceFolders[0];

  //   if (!WORKSPACE_FOLDER) {
  //     console.error("No workspace folder found.");
  //     return;
  //   }

  //   const projectFilePath = vscode.Uri.joinPath(
  //     WORKSPACE_FOLDER.uri,
  //     "metadata.json"
  //   );
  //   const projectFileData = Buffer.from(
  //     JSON.stringify(newProject, null, 4),
  //     "utf8"
  //   );

  //   // FIXME: need to handle the case where the file does not exist
  //   vscode.workspace.fs
  //     .writeFile(projectFilePath, projectFileData)
  //     .then(() =>
  //       vscode.window.showInformationMessage(
  //         `Project created at ${projectFilePath.fsPath}`
  //       )
  //     );
  //   const languages = [];

  //   languages.push(details.sourceLanguage);
  //   languages.push(details.targetLanguage);

  //   newProject.languages = languages;

  //   return newProject;
  // }
}
