// src/browser/editor-open-command.ts
import { injectable, inject } from "@theia/core/shared/inversify";
import { Command, CommandContribution, CommandRegistry } from "@theia/core/lib/common/command";
import { VerseRefUtils } from "@scribe/theia-utils/lib/browser";
import { OpenerService, WidgetManager, ApplicationShell } from "@theia/core/lib/browser";
import { FileService } from "@theia/filesystem/lib/browser/file-service";
import {
  BOOK_FILE_EXTENSION,
  SOURCE_PROJECT_LOCATION,
  TARGET_PROJECT_LOCATION,
} from "../utils/constants";
import { CustomFileWidget } from "./custom-file-widget";
import URI from "@theia/core/lib/common/uri";
import { BIBLE_BOOKS } from "../utils/books";
import { ReadOnlyEditorWidget } from "./readonly-editor-widget";
import { BookCode, Usj } from "@biblionexus-foundation/scripture-utilities";

export const OpenEditorCommand: Command = {
  id: "scribe.open-editor",
  label: "Open Scripture Editor",
};

@injectable()
export class EditorOpenCommandContribution implements CommandContribution {
  @inject(VerseRefUtils)
  protected readonly verseRefUtils: VerseRefUtils;

  @inject(OpenerService)
  protected readonly openerService: OpenerService;

  @inject(FileService)
  protected readonly fileService: FileService;

  @inject(WidgetManager)
  protected readonly widgetManager: WidgetManager;

  @inject(ApplicationShell)
  protected readonly shell: ApplicationShell;

  registerCommands(registry: CommandRegistry): void {
    registry.registerCommand(OpenEditorCommand, {
      execute: async () => {
        await this.openEditor();
      },
    });
  }

  async openEditor(): Promise<void> {
    try {
      const verseRef = await this.verseRefUtils.getVerseRef();
      let bookId = verseRef.book;

      if (!bookId) {
        bookId = "GEN";
        await this.verseRefUtils.setVerseRef({
          book: bookId,
          chapter: 1,
          verse: 1,
        });
      }

      await this.openSourceBook(bookId);

      await this.openTargetBook(bookId);
    } catch (error) {
      console.error("Error opening editors:", error);
    }
  }

  protected async openSourceBook(bookId: string): Promise<void> {
    const bookPath = `${SOURCE_PROJECT_LOCATION}/${bookId}${BOOK_FILE_EXTENSION}`;
    const bookUri = new URI(bookPath);

    try {
      const widget = await this.widgetManager.getOrCreateWidget<ReadOnlyEditorWidget>(
        ReadOnlyEditorWidget.ID
      );

      try {
        await this.fileService.resolve(bookUri);
        await widget.setUri(bookUri);
      } catch (error) {
        console.log(`Source book ${bookId} doesn't exist, creating default content`);
        const bookInfo = BIBLE_BOOKS.find((book) => book.id === bookId);
        const defaultUsjForBook = this.createDefaultUsjForBook(bookId, bookInfo?.name || bookId);
        await widget.setDefaultContent(defaultUsjForBook, bookUri);
      }

      if (!widget.isAttached) {
        this.shell.addWidget(widget, { area: "main", mode: "split-left" });
      }
    } catch (error) {
      console.error(`Error opening source book ${bookId}:`, error);
    }
  }

  protected async openTargetBook(bookId: string): Promise<void> {
    const bookPath = `${TARGET_PROJECT_LOCATION}/${bookId}${BOOK_FILE_EXTENSION}`;
    const bookUri = new URI(bookPath);

    try {
      const widget = await this.widgetManager.getOrCreateWidget<CustomFileWidget>(
        CustomFileWidget.ID
      );

      try {
        await this.fileService.resolve(bookUri);
        await widget.setUri(bookUri);
      } catch (error) {
        console.log(`Target book ${bookId} doesn't exist, creating default content`);
        const bookInfo = BIBLE_BOOKS.find((book) => book.id === bookId);
        const defaultUsjForBook = this.createDefaultUsjForBook(bookId, bookInfo?.name || bookId);
        await widget.setDefaultContent(defaultUsjForBook, bookUri);
      }

      if (!widget.isAttached) {
        this.shell.addWidget(widget, { area: "main", mode: "split-right" });
      }

      this.shell.activateWidget(widget.id);
    } catch (error) {
      console.error(`Error opening target book ${bookId}:`, error);
    }
  }

  protected createDefaultUsjForBook(bookId: string, bookName: string): Usj {
    return {
      type: "USJ",
      version: "3.1",
      content: [
        {
          type: "book",
          marker: "id",
          code: bookId as BookCode,
        },
        {
          type: "para",
          marker: "h",
          content: [bookName],
        },
        {
          type: "chapter",
          marker: "c",
          number: "1",
          content: [
            {
              type: "para",
              marker: "p",
              content: [
                {
                  type: "verse",
                  marker: "v",
                  number: "1",
                  content: [""],
                },
              ],
            },
          ],
        },
      ],
    };
  }
}
