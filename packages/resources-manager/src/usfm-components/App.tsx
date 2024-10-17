import * as React from "@theia/core/shared/react";
import Scribex from "./components/Scribex";
import { ScribexContextProvider } from "./context/ScribexContext";
import { ReferenceContextProvider } from "./context/ReferenceContext";
import { DocumentProvider } from "./context/DocumentContext";
import "./App.css";

export default function App({ data, ctx }: { data: any; ctx: any }) {
  return (
    <div className="App">
      <DocumentProvider>
        <ScribexContextProvider>
          <ReferenceContextProvider>
            <Scribex />
          </ReferenceContextProvider>
        </ScribexContextProvider>
      </DocumentProvider>
    </div>
  );
}
