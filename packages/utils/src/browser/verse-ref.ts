import {
  inject,
  injectable,
  postConstruct,
} from '@theia/core/shared/inversify';
import { GlobalStateStorage } from './global-state-storage';
import { URI } from '@theia/core';
import {
  Disposable,
} from '@theia/core/lib/common/disposable';

// FOR the documentation:
const DEFAULT_VERSE_REF_URI = URI.fromComponents({
  scheme: 'scribe', // scheme is always scribe
  path: '/GEN/1/1', // after the authority
  authority: 'bible.verse', // after scheme://
  query: '', // after ?
  fragment: '', // after #
});

// bible.verse || bible.range/GEN/1,1-2,3
// scribe://bible.verse/GEN/1/1

// GEN 1.1

// scribe://ta.en/GEN/1/1

@injectable()
export class VerseRefUtils {
  static readonly VerseRefKey = 'scribe-bible-verse-ref';

  value: URI = DEFAULT_VERSE_REF_URI;
  private initialized = false;
  private readonly listeners = new Set<(verseRef: VerseRefValue) => void>();

  @inject(GlobalStateStorage)
  private readonly globalStateStorage: GlobalStateStorage;

  @postConstruct()
  init() {
    // Non-async init to avoid Theia DI issues
    this.globalStateStorage
      .getData<string>(VerseRefUtils.VerseRefKey)
      .then((verseRefString) => {
        if (!verseRefString) {
          this.value = DEFAULT_VERSE_REF_URI;
          return this.globalStateStorage.setData(
            VerseRefUtils.VerseRefKey,
            this.value.toString()
          );
        } else {
          this.value = new URI(verseRefString);
          return Promise.resolve();
        }
      })
      .catch((error) => {
        console.error('Error initializing verse reference:', error);
        this.value = DEFAULT_VERSE_REF_URI;
        return this.globalStateStorage.setData(
          VerseRefUtils.VerseRefKey,
          this.value.toString()
        );
      })
      .then(() => {
        // Set up the storage listener after initialization
        this.globalStateStorage.onDidUpdateEvent((e) => {
          if (
            e.key === VerseRefUtils.VerseRefKey &&
            typeof e.data === 'string'
          ) {
            this.value = new URI(e.data);
            this.notifyListeners();
          }
        });

        // Mark as initialized and notify listeners
        this.initialized = true;
        this.notifyListeners();
      });
  }

  private notifyListeners(): void {
    const verseRef = this._pathToVerseRef(this.value.path.toString());
    this.listeners.forEach((listener) => listener(verseRef));
  }

  async getVerseRefString(): Promise<string> {
    return this.value.toString();
  }

  async getVerseRef(): Promise<VerseRefValue> {
    const path = this.value.path.toString();
    return this._pathToVerseRef(path);
  }

  private _pathToVerseRef(path: string): VerseRefValue {
    const book = path.split('/')[1];
    const chapter = parseInt(path.split('/')[2]);
    const verse = parseInt(path.split('/')[3]);
    return { book, chapter, verse };
  }

  private _verseRefToPath(verseRef: VerseRefValue): string {
    return `/${verseRef.book}/${verseRef.chapter}/${verseRef.verse}`;
  }

  async setVerseRef(verseRef: VerseRefValue): Promise<void> {
    const path = this._verseRefToPath(verseRef);
    this.value = this.value.withPath(path);
    await this.globalStateStorage.setData(VerseRefUtils.VerseRefKey, this.value.toString());
  }

  /**
   * Register a callback to be invoked when the verse reference changes.
   * @param callback The function to call when the verse reference changes
   * @returns A disposable that can be used to unregister the callback
   */
  onVerseRefChange(callback: (verseRef: VerseRefValue) => void): Disposable {
    this.listeners.add(callback);

    // If already initialized, immediately invoke the callback with current value
    if (this.initialized) {
      const verseRef = this._pathToVerseRef(this.value.path.toString());
      callback(verseRef);
    }

    return Disposable.create(() => {
      this.listeners.delete(callback);
    });
  }

  getVerseRefUri(): URI {
    return this.value;
  }
}

export type VerseRefValue = {
  book: string;
  chapter: number;
  verse: number;
};
