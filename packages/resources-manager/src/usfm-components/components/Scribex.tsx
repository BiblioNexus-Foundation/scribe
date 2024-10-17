import * as React from "@theia/core/shared/react";
import { ScribexContext, ScribexContextType } from "../context/ScribexContext";
import { useContext, useState } from "react";
import { useDocument } from "../hooks/useDocument";
import Editor from "./Editor";
import usePerf from "../hooks/usePerf2";
import { useDeepCompareEffect } from "use-deep-compare";
import { useEffect } from "react";

const scrollToChapter = (chapter: number, verse: number) => {
  const element = document.getElementById(`ch${chapter}v${verse}`);
  element?.scrollIntoView({ behavior: "smooth" });
};
export default function Scribex() {
  const [bookCode, setBookCode] = useState<string>("");
  const {
    perf,
    id: bookId,
    docSetId,
    chapter,
  } = useDocument({ scrollToChapter, bookCode, setBookCode });

  const { state, actions } = useContext<ScribexContextType>(ScribexContext);

  const {
    htmlPerf,
    ready,
    state: perfState,
    actions: perfActions,
  } = usePerf({
    perf,
    bookId,
    docSetId,
  });

  useEffect(() => {
    // console.log("sending message to extension");
    // vscode.postMessage({
    //     type: MessageType.GET_USFM,
    //     payload: "usfmExplorer",
    // });
  }, [chapter]);

  useDeepCompareEffect(() => {
    if (htmlPerf && htmlPerf.mainSequenceId !== state.sequenceIds[0]) {
      actions.setSequenceIds([htmlPerf?.mainSequenceId]);
    }
  }, [htmlPerf, state.sequenceIds, bookId]);

  const _props = {
    ...state,
    ...perfState,
    ...actions,
    ...perfActions,
    htmlPerf,
    ready,
  };

  return (
    <div className="layout">
      <div className="flex m-3 gap-2">
        <Editor {..._props} />
      </div>
    </div>
  );
}
