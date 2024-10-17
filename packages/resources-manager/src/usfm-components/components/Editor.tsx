import * as React from "@theia/core/shared/react";
import { HtmlPerfEditor } from "@xelah/type-perf-html";
import RecursiveBlock from "./RecursiveBlock";
import LoadingScreen from "./LoadingScreen";
import { Perf } from "../types/perfType";
import { MessageType } from "../types/types";

interface EditorProps {
  sequenceIds: Array<string>;
  // isSaving: boolean;
  htmlPerf: Perf | undefined;
  sectionable: boolean;
  blockable: boolean;
  editable: boolean;
  preview: boolean;
  verbose: boolean;
  addSequenceId: (sequenceId: string) => void;
  // saveHtmlPerf: (htmlPerf: any) => void;
}
export default function Editor(props: EditorProps) {
  const {
    sequenceIds,
    // isSaving
    htmlPerf,
    sectionable,
    blockable,
    editable,
    preview,
    verbose,
    addSequenceId,
  } = props;

  const sequenceId = sequenceIds.at(-1);
  const handlers = {
    onBlockClick: ({ element }: { element: HTMLElement }) => {
      const { tagName } = element;
      if (tagName === "SPAN") {
        console.log("onBlockClick", { element });
      }
    },
  };
  function saveHtmlPerf(htmlPerf: Perf) {
    console.log({ htmlPerf });
  }

  const _props = {
    htmlPerf,
    onHtmlPerf: saveHtmlPerf,
    sequenceIds,
    addSequenceId,
    components: {
      block: (__props: any) =>
        RecursiveBlock({
          htmlPerf,
          onHtmlPerf: saveHtmlPerf,
          sequenceIds,
          addSequenceId,
          ...__props,
        }),
    },
    options: {
      sectionable,
      blockable,
      editable,
      preview,
    },
    decorators: {},
    verbose,
    handlers,
  };

  return (
    <div
      style={{
        fontFamily: "roboto",
        fontSize: `${1}rem`,
        direction: "ltr",
        textAlign: "left",
      }}
    >
      <div id="bibleRefEditor" className="bibleRefEditor">
        {!sequenceId && <LoadingScreen />}
        {sequenceId && <HtmlPerfEditor {..._props} />}
      </div>
    </div>
  );
}
