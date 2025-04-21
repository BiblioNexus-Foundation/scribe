import * as React from '@theia/core/shared/react';
import {
  BookCode,
  MarkerObject,
  Usj,
} from '@biblionexus-foundation/scripture-utilities';

import {
  Editor,
  getViewOptions,
  DEFAULT_VIEW_MODE,
  immutableNoteCallerNodeName,
  UsjNodeOptions,
} from '@biblionexus-foundation/scribe-editor';
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo,
} from '@theia/core/shared/react';
import { Emitter } from '@theia/core';
import { VerseRefUtils, VerseRefValue } from '@scribe/theia-utils/lib/browser';

export type TextDirection = 'ltr' | 'rtl' | 'auto';
export interface ScriptureReference {
  book: string;
  chapterNum: number;
  verseNum: number;
  verse?: string;
  versificationStr?: string;
}
const defaultUsj: Usj = {
  type: 'USJ',
  version: '3.1',
  content: [],
};
const defaultScrRef: ScriptureReference = {
  book: 'GEN',
  chapterNum: 1,
  verseNum: 1,
};

/** Forward reference for the editor. */
export type EditorRef = {
  /** Method to focus the editor. */
  focus(): void;
  /** Method to set the USJ Scripture data. */
  setUsj(usj: Usj): void;
  getScrollPosition: () => number;
  setScrollPosition: (position: number) => void;
  addEventListener?: (type: string, listener: EventListenerOrEventListenerObject) => void;
};

export default function LexicalEditor({
  usjInput,
  onDirtyChangedEmitter,
  isDirty,
  onUsjUpdate,
  verseRefUtils,
  readOnly = false,
}: {
  usjInput?: Usj;
  isDirty?: boolean;
  onDirtyChangedEmitter?: Emitter<void>;
  onUsjUpdate?: (usj: Usj) => void;
  verseRefUtils?: VerseRefUtils;
  readOnly?: boolean;
}) {
  const [usj, setUsj] = useState<Usj>(defaultUsj);
  const editorRef = useRef<EditorRef>(null);
  const [currentBookId, setCurrentBookId] = useState<string | null>(null);

  const [scrRef, setScrRef] = useState(defaultScrRef);
  const [lexicalScrRef, setLexicalScrRef] = useState(defaultScrRef);
  const [viewMode] = useState(DEFAULT_VIEW_MODE);
  const viewOptions = useMemo(() => getViewOptions(viewMode), [viewMode]);

  const nodeOptions: UsjNodeOptions = {
    [immutableNoteCallerNodeName]: {
      onClick: (e: SyntheticEvent) => {
        console.log('Note caller clicked', e);
      },
    },
  };

  // Initialize from VerseRefUtils if available
  useEffect(() => {
    if (verseRefUtils) {
      verseRefUtils.getVerseRef().then((verseRef: VerseRefValue) => {
        setScrRef({
          book: verseRef.book as BookCode,
          chapterNum: verseRef.chapter,
          verseNum: verseRef.verse,
        });

        setCurrentBookId(verseRef.book);
      });
    }
  }, [verseRefUtils]);

  // Update scrRef when verse reference changes (but only on chapter/verse changes within same book)
  useEffect(() => {
    if (verseRefUtils) {
      const verseChangeListener = (verseRef: VerseRefValue) => {
        console.log('VerseRef changed in editor component', verseRef);

        // If the book hasn't changed, update the scrRef
        if (verseRef.book === currentBookId) {
          setScrRef({
            book: verseRef.book as BookCode,
            chapterNum: verseRef.chapter,
            verseNum: verseRef.verse,
          });
        } else {
          // Book has changed, update our tracking
          setCurrentBookId(verseRef.book);
        }
      };

      // Add the listener
      let disposable: { dispose: () => void } | undefined;
      verseRefUtils.onVerseRefChange(verseChangeListener);

      // Clean up the listener when component unmounts
      return () => {
        // No need to call dispose since onVerseRefChange doesn't return a disposable
      };
    }
  }, [verseRefUtils, currentBookId]);

  // Update VerseRefUtils when scrRef changes from editor interaction
  useEffect(() => {
    console.log('scrRef changed in editor', scrRef);
    if (verseRefUtils && scrRef) {
      console.log('Updating VerseRefUtils', scrRef);
      // Only update if this is a change within the same book
      verseRefUtils.getVerseRef().then((currentVerseRef) => {
        if (
          currentVerseRef.chapter !== scrRef.chapterNum ||
          currentVerseRef.verse !== scrRef.verseNum
        ) {
          verseRefUtils.setVerseRef({
            book: scrRef.book,
            chapter: scrRef.chapterNum,
            verse: scrRef.verseNum,
          });
        }
      });
    }
  }, [scrRef, verseRefUtils, currentBookId]);

  useEffect(() => {
    if (usjInput) {
      console.log('Setting usjInput', usjInput);
      setUsj(usjInput);

      // Extract book ID from USJ if available
      const bookMarker = usjInput.content.find(
        (item) => typeof item !== 'string' && item.type === 'book' && item.code
      ) as MarkerObject | undefined;

      if (bookMarker?.code) {
        setCurrentBookId(bookMarker.code);
      }
    }
  }, [usjInput]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (usj && editorRef.current) {
        editorRef.current.setUsj(usj);
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [usj]);

  const onUsjChange = useCallback(
    (newUsj: Usj) => {
      if (onUsjUpdate) {
        console.log('Usj changed in editor', newUsj);
        onUsjUpdate(newUsj); // Call the callback with the new USJ
      }
    },
    [usj]
  );

  const focusEditor = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, [editorRef]);

  const navScope = {
    availableBooks: new Set(['GEN', 'JHN', 'HAB', 'PSA']),
  };
  // Expose the focus method to parent components
  useEffect(() => {
    // Make the focus method available to the parent DOM element
    if (editorRef.current && editorRef.current.addEventListener) {
      const container = document.querySelector('.lexical-editor-container');
      if (container) {
        // Add a focus event listener to the container that will focus the editor
        container.addEventListener('focus', () => {
          focusEditor();
        });
      }
    }
  }, [focusEditor]);

  return (
    <div className='lexical-editor-container'>
      <div className='editor-wrapper p-4 text-gray-600'>
        <Editor
          usjInput={usj}
          ref={editorRef}
          onChange={onUsjChange}
          viewOptions={viewOptions}
          nodeOptions={nodeOptions}
          scrRef={scrRef}
          setScrRef={setScrRef}
          readOnly={readOnly}
          scope={navScope}
        />
      </div>
    </div>
  );
}
