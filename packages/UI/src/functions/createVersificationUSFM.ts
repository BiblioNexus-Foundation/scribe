import { WorkspaceService } from "@theia/workspace/lib/browser";
import { FileService } from "@theia/filesystem/lib/browser/file-service";
import { MessageService } from "@theia/core";
import { inject, injectable } from "inversify";
import { ProjectDetails } from "src/utils/createProjectUtil";
import { URI } from "@theia/core/lib/common/uri";
import { environment } from "../utils/environoments";
import moment from "moment";
import {
  eng_json,
  ethiopian_custom_json,
  lxx_json,
  org_json,
  rsc_json,
  rso_json,
  vul_json,
} from "../lib/versification";
import md5 from "md5";

interface createVersificationUSFM {
  username: String | "tchami Ernest";
  project: ProjectDetails;
  versification: string;
  books: string[];
  direction: string;
  id: string;
  importedFiles: any[];
  copyright: { licence: string };
  currentBurrito: any;
  call: "new" | "edit";
  projectType: string;
}
@injectable()
export class createVersificationUSFMClass {
  @inject(WorkspaceService)
  private readonly workspaceService: WorkspaceService;

  @inject(FileService)
  private readonly fileService: FileService;

  @inject(MessageService)
  private readonly messageService: MessageService;

  //   private bookAvailable(list: any[], id: string): boolean {
  //     return list.some((obj) => obj.id === id);
  //   }

  public async createVersificationUSFM({
    username = "tchami Ernest",
    project,
    versification,
    books,
    direction,
    id,
    importedFiles,
    copyright,
    currentBurrito,
    call,
    projectType,
  }: createVersificationUSFM): Promise<any> {
    // Get the path of the workspace where the metadata file is being created
    const roots = await this.workspaceService.roots;
    if (!roots || roots.length === 0) {
      this.messageService.info("No workspace folder found.");
      return undefined;
    }

    const workspaceUri = roots[0].resource.toString();

    let ingredientsDirName = "ingredients";
    const folder = new URI(`${workspaceUri}`);
    const folderUri = new URI(`${workspaceUri}/${ingredientsDirName}`);

    if (call === "edit") {
      ingredientsDirName =
        Object.keys(currentBurrito.ingredients).find((key) =>
          key.includes(environment.PROJECT_SETTING_FILE)
        ) || "ingredients";
    }

    if (projectType === "Audio") {
      folderUri
        .resolve("text-1")
        .resolve(call === "edit" ? "ingredients" : ingredientsDirName);
    } else {
      folderUri.resolve(ingredientsDirName);
    }

    await this.fileService.createFolder(folderUri);

    const schemes = [
      { name: "eng", file: "eng.json" },
      { name: "lxx", file: "lxx.json" },
      { name: "org", file: "org.json" },
      { name: "rsc", file: "rsc.json" },
      { name: "rso", file: "rso.json" },
      { name: "vul", file: "vul.json" },
    ];
    const data: any = {
      eng_json,
      ethiopian_custom_json,
      lxx_json,
      org_json,
      rsc_json,
      rso_json,
      vul_json,
    };
    const ingredients: any = {};
    for (const scheme of schemes) {
      if (versification.toLowerCase() === scheme.name) {
        this.messageService.info("Creating files with selected scheme");
        // eslint-disable-next-line import/no-dynamic-require
        const fileName = scheme.name + `_json`;
        const file = data[fileName];

        // Loop through the books and handle USFM file creation
        for (const book of books) {
          const bookAvailable = (list: any[], id: string) => {
            return list.some((obj) => obj.name === book);
          };
          if (bookAvailable(importedFiles, book)) {
            this.messageService.info(
              "createVersificationUSFM.js",
              `${book} is been Imported`
            );
            const bookFile = importedFiles.find((obj) => obj.id === book);
            if (bookFile) {
              const bookUri = folderUri.resolve(`${book}.usj`);
              await this.fileService.write(bookUri, bookFile.content);
              // Handle the ingredients metadata
              const fileStat = await this.fileService.resolve(bookUri);
              ingredients[`${folderUri.path}/ingredients/${book}.usj`] = {
                checksum: { md5: md5(bookFile.content) },
                mimeType: "text/x-usj",
                size: fileStat.size,
                scope: { [book]: [] },
              };
            }
          } else {
            const list = file.maxVerses;
            if (list[book]) {
              const chapters = list[book].map((verse: string, i: number) => {
                const verses = Array.from(
                  { length: parseInt(verse, 10) },
                  (_, idx) => ({
                    verseNumber: (idx + 1).toString(),
                    verseText: "",
                    contents: ["..."], // Default text for verses
                  })
                );
                return {
                  chapterNumber: (i + 1).toString(),
                  contents: [{ p: null }, ...verses],
                };
              });

              const usj = {
                book: { bookCode: book, meta: [{ h: book }, [{ mt: [book] }]] },
                chapters,
              };

              const bookUri = folderUri.resolve(`${book}.usj`);
              await this.fileService.write(bookUri, JSON.stringify(usj));

              // Handle the ingredients metadata
              const fileStat = await this.fileService.resolve(bookUri);
              ingredients[`${folderUri.path}/ingredients/${book}.usj`] = {
                checksum: { md5: md5(JSON.stringify(usj)) },
                mimeType: "text/x-usj",
                size: fileStat.size,
                scope: { [book]: [] },
              };
            }
          }
        }

        // Create the versification.json file
        const versificationUri = folder.resolve("versification.json");
        await this.fileService.write(versificationUri, JSON.stringify(file));

        // Handle the ingredients metadata for versification.json
        const fileStat = await this.fileService.resolve(versificationUri);
        ingredients[`${folder.path}/versification.json`] = {
          checksum: { md5: md5(file) },
          mimeType: "application/json",
          size: fileStat.size,
          role: "x-versification",
        };

        // Handle the license.md file if required
        if (
          call !== "edit" ||
          !currentBurrito?.copyright?.shortStatements ||
          copyright.licence.length > 500
        ) {
          const licenseUri = folder.resolve("license.md");
          await this.fileService.write(licenseUri, copyright.licence);

          const licenseStat = await this.fileService.resolve(licenseUri);
          ingredients[`${folderUri.path}/license.md`] = {
            checksum: { md5: md5(file) },
            mimeType: "text/md",
            size: licenseStat.size,
            role: "x-licence",
          };
        }

        // Create project settings file
        const settings = {
          version: environment.AG_SETTING_VERSION,
          project: {
            textTranslation: {
              scriptDirection: direction,
              starred:
                call === "edit"
                  ? currentBurrito.project?.textTranslation.starred
                  : false,
              isArchived:
                call === "edit"
                  ? currentBurrito.project?.textTranslation.isArchived
                  : false,
              versification,
              description: project.projectName,
              copyright: copyright.licence,
              lastSeen: moment().format(),
              refResources:
                call === "edit"
                  ? currentBurrito.project?.textTranslation.refResources
                  : [],
              bookMarks:
                call === "edit"
                  ? currentBurrito.project?.textTranslation.bookMarks
                  : [],
              font: "",
              fontSize: 1,
            },
          },
          sync: { services: { door43: [] } },
        };

        const settingsUri = folder.resolve(environment.PROJECT_SETTING_FILE);
        await this.fileService.write(settingsUri, JSON.stringify(settings));

        // Handle the ingredients metadata for project settings
        const settingsStat = await this.fileService.resolve(settingsUri);
        ingredients[`${folder.path}/${environment.PROJECT_SETTING_FILE}`] = {
          checksum: { md5: md5(JSON.stringify(settings)) },
          mimeType: "application/json",
          size: settingsStat.size,
          role: "x-scribe",
        };

        return ingredients;
      }
    }
  }
}
