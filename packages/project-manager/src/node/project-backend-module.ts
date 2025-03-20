import { injectable } from 'inversify';
import { ILogger } from '@theia/core';
import * as fs from 'fs';
// import * as path from 'path';
import { inject } from '@theia/core/shared/inversify';
import { ProjectServer } from '../common/project-protocol';
// @ts-ignore
import { USFMParser, Validator } from 'usfm-grammar-web';

@injectable()
export class ProjectServiceBackend implements ProjectServer {

  constructor(
    @inject(ILogger) private readonly logger: ILogger
  ) {
    this.logger.info('MyServiceBackend has been initialized');
  }

  dispose(): void {
    throw new Error('Method not implemented.');
  }
  setClient(client: void | undefined): void {
    throw new Error('Method not implemented.');
  }
  getClient?(): void | undefined {
    throw new Error('Method not implemented.');
  }

  /**
   * Process data using the special Node.js package
   * @param data Input data to process
   * @returns Processed result
   */
  async validateUSFM(data: string): Promise<any> {
    try {
      this.logger.debug(`Processing USFM data:...`);
      await Validator.init("https://cdn.jsdelivr.net/npm/usfm-grammar-web@3.0.0/tree-sitter-usfm.wasm",
        "https://cdn.jsdelivr.net/npm/usfm-grammar-web@3.0.0/tree-sitter.wasm");
      const usfm = fs.readFileSync(data, 'utf8');
      // console.log("usfm", usfm);

      const checker = new Validator();
      const resp = checker.isValidUSFM(usfm);
      // console.log("resp UI", resp, checker.message);

      return {
        success: resp,
        message: checker.message
      };
    } catch (error) {
      this.logger.error(`USFM validation error: ${error}`);
      return {
        success: false,
        message: `Failed to validate USFM: ${error.message}`
      };
    }
  }
  async sayHelloTo(name: string): Promise<string> {
    return `Hello, ${name}!`;
  }
  // async initiallizer() {
  //   USFMParser.init("https://cdn.jsdelivr.net/npm/usfm-grammar-web@3.0.0/tree-sitter-usfm.wasm",
  //     "https://cdn.jsdelivr.net/npm/usfm-grammar-web@3.0.0/tree-sitter.wasm");
  //   Validator.init("https://cdn.jsdelivr.net/npm/usfm-grammar-web@3.0.0/tree-sitter-usfm.wasm",
  //     "https://cdn.jsdelivr.net/npm/usfm-grammar-web@3.0.0/tree-sitter.wasm");
  // }
  /**
   * Example function to read/write to the filesystem (which can't be done in frontend)
   */
  // async saveToFile(data: any, filename: string): Promise<boolean> {
  //   try {
  //     // Get user home directory or some appropriate location
  //     const homeDir = process.env.HOME || process.env.USERPROFILE;
  //     const filePath = path.join(homeDir, 'theia-app-data', filename);

  //     // Ensure directory exists
  //     const dirPath = path.dirname(filePath);
  //     if (!fs.existsSync(dirPath)) {
  //       fs.mkdirSync(dirPath, { recursive: true });
  //     }

  //     // Write data to file
  //     fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  //     return true;
  //   } catch (error) {
  //     this.logger.error(`Error saving file: ${error.message}`);
  //     throw new Error(`Failed to save file: ${error.message}`);
  //   }
  // }
}


