import { WorkspaceService } from '@theia/workspace/lib/browser';
import { FileService } from '@theia/filesystem/lib/browser/file-service';
import { MessageService } from '@theia/core';
import { inject, injectable } from 'inversify';
import { ProjectDetails } from '../utils/createProjectUtil';
import { URI } from '@theia/core/lib/common/uri';
// import { CommandService } from "@theia/core/lib/common";
import { nonCanonicalBookRefs, ProjectTemplate } from './Constant';
import moment from 'moment';
import { v5 as uuidV5 } from 'uuid';
import { getAllBookRefs } from '../utils/newProjectUtils';
import { createVersificationUSFMClass } from './createVersificationUSFM';
@injectable()
export class ProjectInitializer {
  // @inject(CommandService)
  // private readonly commandService: CommandService;

  @inject(WorkspaceService)
  private readonly workspaceService: WorkspaceService;

  @inject(createVersificationUSFMClass)
  private readonly createVersificationUSFMClass: createVersificationUSFMClass;

  @inject(FileService)
  private readonly fileService: FileService;

  @inject(MessageService)
  private readonly messageService: MessageService;
  public async initializeNewProject(projectData: ProjectDetails | undefined) {
    try {

      if (!projectData?.ProjectFilePath) {
        this.messageService.error('No folder selected');
        return undefined;
      }

      const projectFilePath = new URI(projectData?.ProjectFilePath).resolve(
        'metadata.json'
      );

      if (!projectData) {
        await this.messageService.info('Project initialization cancelled.');
        return;
      }

      // const projectFilePath = projectData.ProjectFilePath;
      if (!projectFilePath) {
        await this.messageService.error('Project file path is missing.');
        return;
      }
      const fileExists = await this.fileService.exists(projectFilePath);

      if (fileExists) {
        const fileData = await this.fileService.readFile(projectFilePath);
        const fileContent = fileData.value.toString();

        const metadata = JSON.parse(fileContent);

        const projectName = metadata.projectName;
        const confirmDelete = await this.messageService.info(
          `A project named "${projectName}" already exists in this workspace. Do you want to delete it?`,
          'Delete',
          'Cancel'
        );

        if (confirmDelete !== 'Delete') {
          await this.messageService.info('cancel to delete the file !');
          return;
        }
        await this.fileService.delete(projectFilePath);
        const projectFolder = new URI(projectData?.ProjectFilePath).resolve(
          projectName
        );
        const files = await this.fileService.resolve(projectFolder);

        if (!files) {
          await this.messageService.error('The file are not exist');
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

      const newProject = await this.initializeProjectMetadata(projectData);
      this.messageService.info(
        `New project initialized: ${newProject?.meta.generator.userName}'s ${newProject?.meta.category}`
      );

      const projectScope = newProject?.type.flavorType.currentScope;
      if (!projectScope) {
        this.messageService.error(
          'Failed to initialize new project: project scope not found.'
        );
        return;
      }
      const books = Object.keys(projectScope);

      await this.createVersificationUSFMClass.createVersificationUSFM({
        username: 'tchami Ernest',
        project: projectData,
        versification: 'org',
        books: books,
        direction: 'ltr',
        id: '1',
        importedFiles: [],
        copyright: { licence: 'license.md' },
        currentBurrito: {},
        call: 'new',
        projectType: projectData.projectCategory,
        projectFilePath: projectData.ProjectFilePath,
      });
      return { status: 200, message: 'created successfully' };
      // await createProjectNotebooks({ books, shouldOverWrite: true });
    } catch (error) {
      await this.messageService.error('Failed to create project file.');
    }
  }

  private async initializeProjectMetadata(
    details: ProjectDetails | undefined
  ): Promise<any> {
    if (!details) return this.messageService.error('No project details found.');
    const newProject = ProjectTemplate as Record<string, any>;

    newProject.projectName = details.projectName;
    newProject.meta.category = details.projectCategory;
    newProject.meta.generator.userName = details?.userName;
    newProject.meta.dateCreated = moment().format();

    const key = details?.userName + details?.projectName + moment().format();
    const id = uuidV5(key, '1b671a64-40d5-491e-99b0-da01ff1f3341');

    newProject.identification.primary = {
      scribe: {
        [id]: {
          revision: '1',
          timestamp: moment().format(),
        },
      },
    };

    newProject.languages[0].tag = details.targetLanguage as any;
    newProject.languages[0].scriptDirection = (
      details.targetLanguage as any
    ).scriptDirection?.toLowerCase();
    newProject.identification.name.en = details.projectName;
    newProject.identification.abbreviation.en = details.abbreviation;
    newProject.languages[0].name.en = (details.targetLanguage as any).refName;
    newProject.copyright.licenses[0].ingredient = 'license.md';

    newProject.type.flavorType.currentScope = await this.generateProjectScope();

    const selectedPath = details.ProjectFilePath;
    if (!selectedPath) {
      this.messageService.error('No folder path selected.');
      return undefined;
    }

    const projectFolderPath = new URI(selectedPath).resolve(
      details.projectName
    );
    try {
      if (!(await this.fileService.exists(projectFolderPath))) {
        await this.fileService.createFolder(projectFolderPath);
      }

      const projectFilePath = projectFolderPath.resolve('metadata.json');
      const projectFileData = JSON.stringify(newProject, null, 4);
      await this.fileService.write(projectFilePath, projectFileData);

      this.messageService.info(
        `Project created at ${projectFolderPath.toString()}`
      );

      const languages = [];
      languages.push(details.sourceLanguage);
      languages.push(details.targetLanguage);
      newProject.languages = languages;

      return newProject;
    } catch (error) {
      this.messageService.error(`Failed to create project: ${error}`);
      return undefined;
    }
  }

  private async generateProjectScope(skipNonCanonical: boolean = true) {
    const books: string[] = getAllBookRefs();

    const projectScope: any = {};

    skipNonCanonical
      ? books
          .filter((book) => !nonCanonicalBookRefs.includes(book))
          .forEach((book) => {
            projectScope[book] = [];
          })
      : books.forEach((book) => {
          projectScope[book] = [];
        });
    return projectScope;
  }
}
