import { injectable, inject } from '@theia/core/shared/inversify';
import {
  FrontendApplicationContribution,
  FrontendApplication,
  OpenerService,
  WidgetManager,
  ApplicationShell,
} from '@theia/core/lib/browser';
import {
  SOURCE_PROJECT_LOCATION,
  TARGET_PROJECT_LOCATION,
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
import { ReadOnlyEditorWidget } from './readonly-editor-widget';

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

  protected sourceWidget: ReadOnlyEditorWidget | null = null;
  protected targetWidget: CustomFileWidget | null = null;

  onStart(app: FrontendApplication): MaybePromise<void> {
    setTimeout(() => this.openEditorWithCurrentBook(), 1000);
  }

  onStop(): void {
    this.toDispose.dispose();
  }

  protected async openEditorWithCurrentBook(): Promise<void> {
    try {
      const verseRef = await this.verseRefUtils.getVerseRef();
      console.log('Initial verse ref:', verseRef);

      let bookId = verseRef.book;

      if (!bookId) {
        const availableBooks = await this.getAvailableBooks();
        if (availableBooks.length > 0) {
          bookId = availableBooks[0].name;

          await this.verseRefUtils.setVerseRef({
            book: bookId,
            chapter: 1,
            verse: 1,
          });
        } else {
          bookId = DEFAULT_BOOK_ID;
        }
      }

      await this.openBookFiles(bookId);

      this.setupVerseRefListener();
    } catch (error) {
      console.error('Error opening editor on startup:', error);
    }
  }

  protected async getAvailableBooks(): Promise<FileStat[]> {
    try {
      const projectUri = new URI(TARGET_PROJECT_LOCATION);
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

  protected async openBookFiles(bookId: string): Promise<void> {
    if (this.isChangingBook || this.currentOpenedBookId === bookId) {
      return;
    }

    console.log(
      `Attempting to open book: ${bookId}, current book: ${this.currentOpenedBookId}`
    );
    this.isChangingBook = true;

    try {
      await this.openSourceBook(bookId);

      await this.openTargetBook(bookId);

      this.currentOpenedBookId = bookId;
    } catch (error) {
      console.error(`Error opening book ${bookId}:`, error);
    } finally {
      this.isChangingBook = false;
    }
  }

  protected async openSourceBook(bookId: string): Promise<void> {
    const bookPath = `${SOURCE_PROJECT_LOCATION}/${bookId}${BOOK_FILE_EXTENSION}`;
    const bookUri = new URI(bookPath);

    try {
      const widget =
        await this.widgetManager.getOrCreateWidget<ReadOnlyEditorWidget>(
          ReadOnlyEditorWidget.ID
        );

      this.sourceWidget = widget;

      try {
        await this.fileService.resolve(bookUri);
        await widget.setUri(bookUri);
      } catch (error) {
        console.log(
          `Source book ${bookId} doesn't exist, creating default content`
        );
        const bookInfo = BIBLE_BOOKS.find((book) => book.id === bookId);
        const defaultUsjForBook = this.createDefaultUsjForBook(
          bookId,
          bookInfo?.name || bookId
        );
        await widget.setDefaultContent(defaultUsjForBook, bookUri);
      }

      if (!widget.isAttached) {
        this.shell.addWidget(widget, { area: 'main', mode: 'split-left' });
      }
    } catch (error) {
      console.error(`Error opening source book ${bookId}:`, error);
    }
  }

  protected async openTargetBook(bookId: string): Promise<void> {
    const bookPath = `${TARGET_PROJECT_LOCATION}/${bookId}${BOOK_FILE_EXTENSION}`;
    const bookUri = new URI(bookPath);

    try {
      const widget =
        await this.widgetManager.getOrCreateWidget<CustomFileWidget>(
          CustomFileWidget.ID
        );

      this.targetWidget = widget;

      try {
        await this.fileService.resolve(bookUri);
        await widget.setUri(bookUri);
      } catch (error) {
        console.log(
          `Target book ${bookId} doesn't exist, creating default content`
        );
        const bookInfo = BIBLE_BOOKS.find((book) => book.id === bookId);
        const defaultUsjForBook = this.createDefaultUsjForBook(
          bookId,
          bookInfo?.name || bookId
        );
        await widget.setDefaultContent(defaultUsjForBook, bookUri);
      }

      if (!widget.isAttached) {
        this.shell.addWidget(widget, { area: 'main', mode: 'split-right' });
      }

      this.shell.activateWidget(widget.id);
    } catch (error) {
      console.error(`Error opening target book ${bookId}:`, error);
    }
  }

  protected createDefaultUsjForBook(bookId: string, bookName: string): Usj {
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
                  content: [''],
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
      this.toDispose.dispose();

      const disposable = this.verseRefUtils.onVerseRefChange(
        (verseRef: VerseRefValue) => {
          console.log('VerseRef changed in startup contribution:', verseRef);

          if (verseRef.book && verseRef.book !== this.currentOpenedBookId) {
            console.log(
              `Book changed from ${this.currentOpenedBookId} to ${verseRef.book}, opening new book...`
            );
            this.openBookFiles(verseRef.book);
          }
        }
      );

      this.toDispose.push(disposable);
    }
  }
}
