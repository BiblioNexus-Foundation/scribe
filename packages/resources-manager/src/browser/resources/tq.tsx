import * as React from "@theia/core/shared/react";
import {
  ScribeResource,
  Door43RepoResponse,
  TranslationWord,
  type ConfigResourceValues,
} from "./types";
import {
  downloadDoor43Resource,
  fetchDoor43ResourceDisplayData,
  parseTwlTsv,
  tsvToChapterVerseRef,
} from "./utils";
import TranslationWords from "@/components/TranslationWords";
import type { URI } from "@theia/core";
import type { FileService } from "@theia/filesystem/lib/browser/file-service";
import TranslationQuestions from "@/components/TranslationQuestions";
import { IconHelpHexagon } from "@tabler/icons-react";
import type { VerseRefValue } from "@scribe/theia-utils/lib/browser";

export const tqResource: ScribeResource<Door43RepoResponse, Record<string, string>[]> = {
  id: "codex.tq",
  displayLabel: "Questions",
  icon: <IconHelpHexagon />,

  getTableDisplayData: async (query?: string) => {
    try {
      const data = await fetchDoor43ResourceDisplayData(tqResource.id, {
        subject: "tsv Translation Questions",
        metadataType: "rc",
        query: query || "",
      });
      return data ?? [];
    } catch (error) {
      return [];
    }
  },

  downloadResource: async (resourceInfo, { fs, resourceFolderUri }) =>
    downloadDoor43Resource(tqResource.id, resourceInfo, {
      fs,
      resourceFolderUri,
    }),
  openHandlers: {
    verseRefSubscription: true,
    async readResourceData(uri, fs, ctx) {
      const verseRef = await ctx.verseRefUtils.getVerseRef();
      const questions = await getVerseTranslationQuestions(
        {
          resource: ctx.resource,
          verseRef: verseRef,
        },
        { fs, resourceDirUri: uri }
      );

      return questions;
    },

    render(data, ctx) {
      if (!ctx) {
        return "Err: Context is required to render Translation Academy";
      }

      return <TranslationQuestions translationQuestions={data} />;
    },
  },
};

export const getVerseTranslationQuestions = async (
  {
    resource,
    verseRef,
  }: {
    resource: ConfigResourceValues;
    verseRef: VerseRefValue;
  },
  { fs, resourceDirUri }: { fs: FileService; resourceDirUri: URI }
) => {
  // TODO: get bookID, chapter, and verse from verseRef
  const bookID = verseRef.book ?? "GEN";
  const chapter = verseRef.chapter ?? 1;
  const verse = verseRef.verse ?? 1;

  const bookUri = resourceDirUri.withPath(resourceDirUri.path.join(`tq_${bookID}.tsv`));
  const bookContent = await fs.readFile(bookUri);

  const bookContentString = bookContent.value.toString();

  const tsvData = parseTwlTsv(bookContentString);
  const chapterVerseRef = tsvToChapterVerseRef(tsvData);
  const questions = chapterVerseRef[chapter]?.[verse];

  return questions ?? [];
};
