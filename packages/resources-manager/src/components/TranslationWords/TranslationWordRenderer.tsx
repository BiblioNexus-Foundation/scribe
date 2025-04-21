import * as React from "@theia/core/shared/react";
import { markdownToHTML } from "../../utils/tsv";

const TranslationWordRenderer = ({ content }: { content: string | null }) => {
  return (
    <div className="mx-auto mt-2.5 max-w-md space-y-2 font-normal">
      <article className="whitespace-pre-line text-center text-xs leading-5 tracking-wide text-zinc-700 dark:text-zinc-50">
        {content ? (
          <div
            dangerouslySetInnerHTML={{ __html: markdownToHTML(content) ?? "" }}
            className="prose prose-sm"
          />
        ) : (
          "Select a translation word to view its content."
        )}
      </article>
    </div>
  );
};

export default TranslationWordRenderer;
