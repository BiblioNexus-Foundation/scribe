import * as React from "@theia/core/shared/react";
import { MarkerObject, Usj } from "@biblionexus-foundation/scripture-utilities";

import {
  ReadOnlyEditor,
  getViewOptions,
  DEFAULT_VIEW_MODE,
} from "@biblionexus-foundation/scribe-editor";
import { useEffect, useState, useRef, useMemo } from "@theia/core/shared/react";

export type TextDirection = "ltr" | "rtl" | "auto";
export interface ScriptureReference {
  book: string;
  chapterNum: number;
  verseNum: number;
  verse?: string;
  versificationStr?: string;
}
const defaultUsj: Usj = {
  type: "USJ",
  version: "3.1",
  content: [],
};

/** Forward reference for the editor. */
export type EditorRef = {
  setUsj(usj: Usj): void;
  setScrollPosition: (position: number) => void;
};

export default function SourceLexicalEditor({ usjInput }: { usjInput?: Usj }) {
  const [usj, setUsj] = useState<Usj>(defaultUsj);
  const editorRef = useRef<EditorRef>(null);
  const [viewMode] = useState(DEFAULT_VIEW_MODE);
  const viewOptions = useMemo(() => getViewOptions(viewMode), [viewMode]);

  useEffect(() => {
    if (usjInput) {
      console.log("Setting usjInput", usjInput);
      setUsj(usjInput);
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

  return (
    <div className="lexical-editor-container">
      <div className="editor-wrapper p-4 text-gray-600">
        <ReadOnlyEditor usjInput={usj} viewOptions={viewOptions} />
      </div>
    </div>
  );
}
