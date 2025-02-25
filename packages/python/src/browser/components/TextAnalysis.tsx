import React from "react";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

export interface AnalysisData {
  n_lines: number;
  n_characters: number;
  "letter-script": Record<string, { count: number; ex?: string }>;
  "number-script": Record<string, { count: number; ex: string }>;
  "other-script": Record<string, { count: number; ex: string }>;
  "non-canonical": Record<
    string,
    {
      orig: string;
      norm: string;
      "orig-count": number;
      "norm-count": number;
      "orig-form": string;
      "norm-form": string;
      changes: string[];
    }
  >;
  "char-conflict": Record<string, any>;
  "notable-token": Record<
    string,
    Record<string, { token: string; count: number; ex: [string, number][] }>
  >;
  pattern: Record<
    string,
    Record<string, { pattern: string; count: number; ex: [string, number][] }>
  >;
  block: Record<
    string,
    Record<
      string,
      {
        char: string;
        id: string;
        name: string;
        count: number;
        ex: [string, number][];
      }
    >
  >;
}

const CollapsibleSection: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
        className="flex items-center justify-between w-full p-2 font-semibold text-left rounded-md bg-editor-widget-background text-editor-widget-foreground hover:bg-list-hover"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        {isOpen ? (
          <ChevronDown className="w-5 h-5" />
        ) : (
          <ChevronRight className="w-5 h-5" />
        )}
      </button>
      {isOpen && <div className="mt-2 ml-4">{children}</div>}
    </div>
  );
};

export const TextAnalysis: React.FC<{ data: AnalysisData }> = ({ data }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg border border-editor-widget-border">
      <h1 className="text-2xl font-bold mb-6 text-editor-widget-foreground">
        Text Analysis Results
      </h1>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-list-hover p-4 rounded-md border border-editor-widget-border">
          <h2 className="font-semibold text-editor-widget-foreground">
            Number of Lines
          </h2>
          <p className="text-description-foreground">{data.n_lines}</p>
        </div>
        <div className="bg-list-hover p-4 rounded-md border border-editor-widget-border">
          <h2 className="font-semibold text-editor-widget-foreground">
            Number of Characters
          </h2>
          <p className="text-description-foreground">{data.n_characters}</p>
        </div>
      </div>

      <CollapsibleSection title="Letter Scripts">
        {Object.entries(data["letter-script"]).map(([script, info]) => (
          <div key={script} className="mb-2 p-2 rounded-sm hover:bg-list-hover">
            <h3 className="font-semibold text-editor-widget-foreground">
              {script}
            </h3>
            <p className="text-description-foreground">Count: {info.count}</p>
            {info.ex && (
              <p className="text-muted-foreground">Example: {info.ex}</p>
            )}
          </div>
        ))}
      </CollapsibleSection>

      <CollapsibleSection title="Number Scripts">
        {Object.entries(data["number-script"]).map(([script, info]) => (
          <div key={script} className="mb-2 p-2 rounded-sm hover:bg-list-hover">
            <h3 className="font-semibold text-editor-widget-foreground">
              {script}
            </h3>
            <p className="text-description-foreground">Count: {info.count}</p>
            <p className="text-muted-foreground">Example: {info.ex}</p>
          </div>
        ))}
      </CollapsibleSection>

      <CollapsibleSection title="Other Scripts">
        {Object.entries(data["other-script"]).map(([script, info]) => (
          <div key={script} className="mb-2 p-2 rounded-sm hover:bg-list-hover">
            <h3 className="font-semibold text-editor-widget-foreground">
              {script}
            </h3>
            <p className="text-description-foreground">Count: {info.count}</p>
            <p className="text-muted-foreground">Example: {info.ex}</p>
          </div>
        ))}
      </CollapsibleSection>

      <CollapsibleSection title="Non-canonical Characters">
        {Object.entries(data["non-canonical"]).map(([char, info]) => (
          <div key={char} className="mb-2 p-2 rounded-sm hover:bg-list-hover">
            <h3 className="font-semibold text-editor-widget-foreground">
              {char}
            </h3>
            <p className="text-description-foreground">
              Original: {info.orig} (Count: {info["orig-count"]})
            </p>
            <p className="text-description-foreground">
              Normalized: {info.norm} (Count: {info["norm-count"]})
            </p>
            <p className="text-muted-foreground">
              Changes: {info.changes.join(", ")}
            </p>
          </div>
        ))}
      </CollapsibleSection>

      <CollapsibleSection title="Notable Tokens">
        {Object.entries(data["notable-token"]).map(([category, tokens]) => (
          <div
            key={category}
            className="mb-4 p-2 rounded-sm hover:bg-list-hover"
          >
            <h3 className="font-semibold text-editor-widget-foreground">
              {category}
            </h3>
            {Object.entries(tokens).map(([token, info]) => (
              <div
                key={token}
                className="ml-4 mb-2 p-2 rounded-sm hover:bg-list-hover"
              >
                <p className="text-description-foreground">
                  Token: {info.token}
                </p>
                <p className="text-description-foreground">
                  Count: {info.count}
                </p>
                <p className="text-muted-foreground">
                  Examples:{" "}
                  {info.ex
                    .map(([ex, line]) => `${ex} (line ${line})`)
                    .join(", ")}
                </p>
              </div>
            ))}
          </div>
        ))}
      </CollapsibleSection>

      <CollapsibleSection title="Patterns">
        {Object.entries(data.pattern).map(([category, patterns]) => (
          <div
            key={category}
            className="mb-4 p-2 rounded-sm hover:bg-list-hover"
          >
            <h3 className="font-semibold text-editor-widget-foreground">
              {category}
            </h3>
            {Object.entries(patterns).map(([pattern, info]) => (
              <div
                key={pattern}
                className="ml-4 mb-2 p-2 rounded-sm hover:bg-list-hover"
              >
                <p className="text-description-foreground">
                  Pattern: {info.pattern}
                </p>
                <p className="text-description-foreground">
                  Count: {info.count}
                </p>
                <p className="text-muted-foreground">
                  Examples:{" "}
                  {info.ex
                    .map(([ex, line]) => `${ex} (line ${line})`)
                    .join(", ")}
                </p>
              </div>
            ))}
          </div>
        ))}
      </CollapsibleSection>

      <CollapsibleSection title="Character Blocks">
        {Object.entries(data.block).map(([blockName, characters]) => (
          <div
            key={blockName}
            className="mb-4 p-2 rounded-sm hover:bg-list-hover"
          >
            <h3 className="font-semibold text-editor-widget-foreground">
              {blockName}
            </h3>
            {Object.entries(characters).map(([char, info]) => (
              <div
                key={char}
                className="ml-4 mb-2 p-2 rounded-sm hover:bg-list-hover"
              >
                <p className="text-description-foreground">
                  Character: {info.char} ({info.id})
                </p>
                <p className="text-description-foreground">Name: {info.name}</p>
                <p className="text-description-foreground">
                  Count: {info.count}
                </p>
                <p className="text-muted-foreground">
                  Examples:{" "}
                  {info.ex
                    .map(([ex, line]) => `${ex} (line ${line})`)
                    .join(", ")}
                </p>
              </div>
            ))}
          </div>
        ))}
      </CollapsibleSection>
    </div>
  );
};
