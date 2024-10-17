import * as React from "@theia/core/shared/react";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "@theia/core/shared/react";

type DocumentData = {
  usfm: string;
  bookID: string;
  chapter: number;
  verse: number;
};

type DocumentContextType = {
  documentData: DocumentData | null;
  setDocumentData: React.Dispatch<React.SetStateAction<DocumentData | null>>;
};

const DocumentContext = createContext<DocumentContextType | undefined>(
  undefined
);

export const DocumentProvider = ({ children }: { children: ReactNode }) => {
  const [documentData, setDocumentData] = useState<DocumentData | null>(null);

  return (
    <DocumentContext.Provider value={{ documentData, setDocumentData }}>
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocuments = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error("useDocument must be used within a DocumentProvider");
  }
  return context;
};
