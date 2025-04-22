declare module 'usfm-grammar' {
  export class USFMParser {
    constructor(options?: {
      success?: (parser: USFMParser) => void;
      error?: (error: any) => void;
      relaxed?: boolean;
      standalone?: boolean;
    });

    parse(usfmText: string): {
      chapters: any;
      header: any;
      metadata: any;
      verses: any;
      [key: string]: any;
    };

    parseFromString(usfmText: string): {
      chapters: any;
      header: any;
      metadata: any;
      verses: any;
      [key: string]: any;
    };

    toJSON(): string;
    // Add other methods as needed
  }

  export class Grammar {
    static parse(usfmText: string, options?: any): any;
    // Add other static methods as needed
  }

  const usfmGrammar: {
    USFMParser: typeof USFMParser;
    Grammar: typeof Grammar;
  };

  export default usfmGrammar;
}