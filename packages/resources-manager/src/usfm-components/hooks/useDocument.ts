import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "@theia/core/shared/react";
import { usfm2perf } from "./useProskomma";
// import { MessageType } from "../types/types";
import { Perf } from "../types/perfType";
import { useDocuments } from "../context/DocumentContext";

export const useDocument = ({
  scrollToChapter,
  bookCode,
  setBookCode,
}: {
  scrollToChapter: (chapter: number, verse: number) => void;
  bookCode: string;
  setBookCode: Dispatch<SetStateAction<string>>;
}) => {
  const { documentData } = useDocuments();
  const [document, setDocument] = useState<string | null>(null);
  const [perf, setPerf] = useState<Perf | null>(null);
  // const [bookCode, setBookCode] = useState<string | null>(null);
  const [docSetId, setDocSetId] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [chapter, setChapter] = useState<number>(1);

  useEffect(() => {
    if (documentData) {
      const { usfm, bookID, chapter, verse } = documentData;
      console.log("useDocument", {
        bookCode,
        bookID,
        chapter,
        verse,
      });

      scrollToChapter(chapter, verse);
      console.log("scrolling to chapter", chapter);

      console.log("received", { usfm, bookID, chapter, verse });
      setDocument(usfm);
      setChapter(chapter);
      const {
        perf,
        id,
        docSetId,
      }: { perf: Perf; id: string; docSetId: string } = usfm2perf(usfm);
      console.log({ perf, id, docSetId });
      perf &&
        perf.metadata.document.bookCode &&
        setBookCode(perf.metadata.document.bookCode);
      setPerf(perf);
      setId(id);
      setDocSetId(docSetId);
    }
  }, []);

  return { document, perf, bookCode, id, docSetId, chapter };
};
