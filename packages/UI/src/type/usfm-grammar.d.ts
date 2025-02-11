declare module "usfm-grammar" {
  export class JSONParser {
    constructor(input: any);
    validate(): boolean;
    toUSFM(): string;
  }
}
