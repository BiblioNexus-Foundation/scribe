import * as React from "@theia/core/shared/react";
import { ScribeResource, Door43ApiResponse, Door43RepoResponse } from "./types";
import TranslationNotesView, {
  TnTSV,
} from "@/components/TranslationNotes/TranslationNotesView";
import { getDocumentAsScriptureTSV } from "@/utils/translationNotes";
import {
  downloadDoor43Resource,
  fetchDoor43ResourceDisplayData,
} from "./utils";
import { IconNotes } from "@tabler/icons-react";

export const tnResource: ScribeResource<Door43RepoResponse, TnTSV> = {
  id: "codex.tn",
  displayLabel: "Notes",
  icon: <IconNotes />,

  getTableDisplayData: async (query?: string) => {
    try {
      const data = await fetchDoor43ResourceDisplayData(tnResource.id, {
        subject: "TSV Translation Notes",
        metadataType: "rc",
        query: query || "",
      });
      return data ?? [];
    } catch (error) {
      return [];
    }
  },

  downloadResource: async (resourceInfo, { fs, resourceFolderUri }) =>
    downloadDoor43Resource(tnResource.id, resourceInfo, {
      fs,
      resourceFolderUri,
    }),
  openHandlers: {
    async readResourceData(uri, fs) {
      return await getDocumentAsScriptureTSV("ACT 1:1", uri, fs);
    },
    render(data) {
      return (
        <TranslationNotesView tnTsv={data} ref={{ verseRef: "GEN 1:1" }} />
      );
    },
  },
};
