import { useState, useEffect } from "react";
import { VSCodePanels, VSCodePanelTab, VSCodePanelView } from "@vscode/webview-ui-toolkit/react";

import React from "@theia/core/shared/react";

import TranslationNoteScroller from "./TranslationNoteScroller";
import { Badge } from "../ui/Badge";
import Button from "../Button";
import TranslationNote from "./TranslationNote";
import type { VerseRefValue } from "@scribe/theia-utils/lib/browser";

type CommandToFunctionMap = Record<string, (data: any) => void>;

export type TnTSV = {
  [chapter: number]: {
    [verse: number]: any;
  };
};
export const extractBookChapterVerse = (
  refString: string
): { bookID: string; chapter: number; verse: number } => {
  const match = refString.match(/([A-Za-z0-9]{3}) (\d+):(\d+)/);

  return match
    ? {
        bookID: match[1],
        chapter: parseInt(match[2], 10),
        verse: parseInt(match[3], 10),
      }
    : { bookID: "GEN", chapter: 1, verse: 1 };
};

function TranslationNotesView({
  tnTsv: translationNotesObj,
  verseRef,
}: {
  tnTsv: TnTSV;
  verseRef: VerseRefValue;
}) {
  const [noteIndex, setNoteIndex] = useState<number>(0);

  console.log("COMPONENT RENDER DATA - : ", Object.keys(translationNotesObj));

  useEffect(() => {
    setNoteIndex(0);
  }, [verseRef]);

  const incrementNoteIndex = () =>
    setNoteIndex((prevIndex) =>
      prevIndex < translationNotesObj[verseRef?.chapter]?.[verseRef?.verse].length - 1
        ? prevIndex + 1
        : prevIndex
    );
  const decrementNoteIndex = () =>
    setNoteIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));

  const notes = translationNotesObj?.[verseRef?.chapter]?.[verseRef?.verse] || [];

  if (!notes || notes.length === 0) {
    return <div>No notes found</div>;
  }

  return (
    <main>
      <section className="translation-note-view">
        <div className="flex items-center justify-between border-b border-zinc-200 px-2 py-2.5 dark:border-zinc-900">
          <Badge variant="destructive">
            {noteIndex + 1} of {notes.length}
          </Badge>
          <div className="flex items-center gap-[5px]">
            <Button
              icon={<span className="arrow-button codicon codicon-chevron-left"></span>}
              onClick={decrementNoteIndex}
            />
            <Button
              icon={<span className="arrow-button codicon codicon-chevron-right"></span>}
              onClick={incrementNoteIndex}
            />
          </div>
        </div>
        <VSCodePanels activeid="tab-verse" aria-label="note-type-tab">
          <VSCodePanelView id="view-verse">
            <div className="mx-auto mt-2.5 max-w-md space-y-2 font-normal">
              <article className="whitespace-pre-line text-center text-xs leading-5 tracking-wide text-zinc-700 dark:text-zinc-50">
                {<TranslationNote note={notes[noteIndex]} />}
              </article>
            </div>
          </VSCodePanelView>
        </VSCodePanels>
      </section>
    </main>
  );
}

export default TranslationNotesView;
