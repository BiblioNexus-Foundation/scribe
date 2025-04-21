// src/browser/editor-startup-contribution.ts
import { injectable, inject } from '@theia/core/shared/inversify';
import {
  FrontendApplicationContribution,
  FrontendApplication,
  OpenerService,
  WidgetManager,
  ApplicationShell,
} from '@theia/core/lib/browser';
import {
  PROJECT_LOCATION,
  BOOK_FILE_EXTENSION,
  DEFAULT_BOOK_ID,
} from '../utils/constants';
import { VerseRefUtils, VerseRefValue } from '@scribe/theia-utils/lib/browser';
import URI from '@theia/core/lib/common/uri';
import { FileService } from '@theia/filesystem/lib/browser/file-service';
import { FileStat } from '@theia/filesystem/lib/common/files';
import { BIBLE_BOOKS } from '../utils/books';
import { CustomFileWidget } from './custom-file-widget';
import { MaybePromise } from '@theia/core/lib/common/types';
import {
  Disposable,
  DisposableCollection,
} from '@theia/core/lib/common/disposable';
import { BookCode, Usj } from '@biblionexus-foundation/scripture-utilities';

@injectable()
export class EditorStartupContribution
  implements FrontendApplicationContribution
{
  @inject(OpenerService)
  protected readonly openerService: OpenerService;

  @inject(VerseRefUtils)
  protected readonly verseRefUtils: VerseRefUtils;

  @inject(FileService)
  protected readonly fileService: FileService;

  @inject(WidgetManager)
  protected readonly widgetManager: WidgetManager;

  @inject(ApplicationShell)
  protected readonly shell: ApplicationShell;

  protected currentOpenedBookId: string | null = null;
  protected isChangingBook: boolean = false;
  protected toDispose = new DisposableCollection();

  // Default USJ object for new books
  protected defaultUsj: Usj = {
    type: 'USJ',
    version: '3.1',
    content: [],
  };

  onStart(app: FrontendApplication): MaybePromise<void> {
    // Wait briefly for the IDE to fully initialize
    setTimeout(() => this.openEditorWithCurrentBook(), 1000);
  }

  onStop(): void {
    // Clean up all event listeners when the application stops
    this.toDispose.dispose();
  }

  protected async openEditorWithCurrentBook(): Promise<void> {
    try {
      // Get current verse reference
      const verseRef = await this.verseRefUtils.getVerseRef();
      console.log('Initial verse ref:', verseRef);

      let bookId = verseRef.book;

      // If no book is set, try to find the first available book
      if (!bookId) {
        const availableBooks = await this.getAvailableBooks();
        if (availableBooks.length > 0) {
          bookId = availableBooks[0].name;
          // Update verse ref with the first book
          await this.verseRefUtils.setVerseRef({
            book: bookId,
            chapter: 1,
            verse: 1,
          });
        } else {
          bookId = DEFAULT_BOOK_ID;
        }
      }

      // Open the book file
      await this.openBookFile(bookId);

      // Set up listener for verse reference changes
      this.setupVerseRefListener();
    } catch (error) {
      console.error('Error opening editor on startup:', error);
    }
  }

  protected async getAvailableBooks(): Promise<FileStat[]> {
    try {
      const projectUri = new URI(PROJECT_LOCATION);
      const projectStat = await this.fileService.resolve(projectUri);

      if (projectStat.children) {
        return projectStat.children.filter(
          (child) =>
            child.isFile && child.resource.path.ext === BOOK_FILE_EXTENSION
        );
      }
      return [];
    } catch (error) {
      console.error('Error getting available books:', error);
      return [];
    }
  }

  protected async openBookFile(bookId: string): Promise<void> {
    if (this.isChangingBook || this.currentOpenedBookId === bookId) {
      return;
    }

    console.log(
      `Attempting to open book: ${bookId}, current book: ${this.currentOpenedBookId}`
    );
    this.isChangingBook = true;
    try {
      const bookPath = `${PROJECT_LOCATION}/${bookId}${BOOK_FILE_EXTENSION}`;
      const bookUri = new URI(bookPath);

      // Check if file exists
      try {
        await this.fileService.resolve(bookUri);

        // Open the file
        const opener = await this.openerService.getOpener(bookUri);
        const widget = await opener.open(bookUri);

        if (widget instanceof CustomFileWidget) {
          this.currentOpenedBookId = bookId;
          console.log(`Successfully opened book: ${bookId}`);
        }
      } catch (error) {
        console.error(`Error resolving book file for ${bookId}:`, error);

        // Get or create widget
        const widget =
          await this.widgetManager.getOrCreateWidget<CustomFileWidget>(
            CustomFileWidget.ID,
            { factoryId: CustomFileWidget.ID }
          );

        if (widget instanceof CustomFileWidget) {
          // Instead of showing placeholder, create default USJ for the book
          const bookInfo = BIBLE_BOOKS.find((book) => book.id === bookId);
          const defaultUsjForBook = this.createDefaultUsjForBook(
            bookId,
            bookInfo?.name || bookId
          );

          // Create a temporary URI for the widget title
          const tempUri = new URI(
            `${PROJECT_LOCATION}/${bookId}${BOOK_FILE_EXTENSION}`
          );

          // Set the widget's content to the default USJ
          await widget.setDefaultContent(defaultUsjForBook, tempUri);

          if (!widget.isAttached) {
            this.shell.addWidget(widget, { area: 'main' });
          }
          this.shell.activateWidget(widget.id);
          this.currentOpenedBookId = bookId;
        }
      }
    } catch (error) {
      console.error(`Error opening book ${bookId}:`, error);
    } finally {
      this.isChangingBook = false;
    }
  }

  // Create a default USJ object for a new book
  protected createDefaultUsjForBook(bookId: string, bookName: string): Usj {
    // Create a basic USJ structure with appropriate book marker
    return {
      type: 'USJ',
      version: '3.1',
      content: [
        {
          type: 'book',
          marker: 'id',
          code: bookId as BookCode,
        },
        {
          type: 'para',
          marker: 'h',
          content: [bookName],
        },
        {
          type: 'chapter',
          marker: 'c',
          number: '1',
          content: [
            {
              type: 'para',
              marker: 'p',
              content: [
                {
                  type: 'verse',
                  marker: 'v',
                  number: '1',
                  content: ['BOOK NOT AVAILABLE'],
                },
              ],
            },
          ],
        },
      ],
    };
  }

  protected setupVerseRefListener(): void {
    if (this.verseRefUtils) {
      // Clean up any existing listeners
      this.toDispose.dispose();

      // Add new listener with the improved VerseRefUtils API
      const disposable = this.verseRefUtils.onVerseRefChange(
        (verseRef: VerseRefValue) => {
          console.log('VerseRef changed in startup contribution:', verseRef);

          if (verseRef.book && verseRef.book !== this.currentOpenedBookId) {
            console.log(
              `Book changed from ${this.currentOpenedBookId} to ${verseRef.book}, opening new book...`
            );
            this.openBookFile(verseRef.book);
          }
        }
      );

      // Add to our disposal collection
      this.toDispose.push(disposable);
    }
  }
}
