import { injectable } from 'inversify';
import { ILogger } from '@theia/core';
import * as fs from 'fs';
import * as path from 'path';
import { inject } from '@theia/core/shared/inversify';
import { ProjectServer } from '../common/project-protocol';
// @ts-ignore
import { USFMParser, Validator, Filter } from 'usfm-grammar-web';
import { generateProjectUUID } from './generateUUID';

@injectable()
export class ProjectServiceBackend implements ProjectServer {
  private projectDir: string;

  constructor(
    @inject(ILogger) private readonly logger: ILogger
  ) {
    this.logger.info('ProjectServiceBackend has been initialized');

    // Get the project directory from environment or use default
    const homeDir = process.env.HOME || process.env.USERPROFILE || '';
    this.projectDir = process.env.PROJECT_DIR || path.join(homeDir, '.scribe', 'projects');

    // Ensure project directory exists
    this.ensureDirectoryExists(this.projectDir);
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

  async highlightVerseText(usjData: any, replacementText = "... \n") {
    console.log("highlighted");

    // Clone the original data to avoid modifying the input
    const result = JSON.parse(JSON.stringify(usjData));

    // Process the content array
    for (let i = 0; i < result.content.length - 1; i++) {
      const currentItem = result.content[i];
      const nextItem = result.content[i + 1];

      // Check if the current item is a verse marker and the next item is a string
      if (
        currentItem &&
        typeof currentItem === 'object' &&
        currentItem.type === 'verse' &&
        typeof nextItem === 'string'
      ) {
        // Replace the text with the specified replacement
        result.content[i + 1] = replacementText;
      }
    }

    return result;
  }

  async validateUSFM(data: string): Promise<any> {
    try {
      this.logger.debug(`Processing USFM data:...`);
      await Validator.init("https://cdn.jsdelivr.net/npm/usfm-grammar-web@3.0.0/tree-sitter-usfm.wasm",
        "https://cdn.jsdelivr.net/npm/usfm-grammar-web@3.0.0/tree-sitter.wasm");
      const usfm = fs.readFileSync(data, 'utf8');
      const checker = new Validator();
      const resp = checker.isValidUSFM(usfm);
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

  async USFMtoUSJ(data: string): Promise<any> {
    await USFMParser.init("https://cdn.jsdelivr.net/npm/usfm-grammar-web@3.0.0/tree-sitter-usfm.wasm",
      "https://cdn.jsdelivr.net/npm/usfm-grammar-web@3.0.0/tree-sitter.wasm");
    const usfm = fs.readFileSync(data, 'utf8');
    const usfmParser = new USFMParser(usfm);
    const output = usfmParser.toUSJ();
    const cleanUSJ = usfmParser.toUSJ(null, [...Filter.BCV, ...Filter.TEXT])
    // const cleanUSJ = usfmParser.toUSJ(null, [...Filter.BCV, ...Filter.PARAGRAPHS])
    // const cleanUSJ = usfmParser.toUSJ(null, [...Filter.BCV, ...Filter.PARAGRAPHS, ...Filter.TEXT])
    const convertedData = await this.highlightVerseText(cleanUSJ);
    console.log(JSON.stringify(output.content[0].code), JSON.stringify(convertedData));
    return { id: output.content[0].code, usj: output, target: cleanUSJ, edited: convertedData };
  }

  async saveToFile(data: any, filename: string): Promise<boolean> {
    try {
      const uuid = generateProjectUUID(data.name)
      console.log("uuid", uuid);

      const project = path.join(this.projectDir, `${data.name}-${uuid}`);
      const textTranslation = path.join(project, `scripture:textTranslation-${uuid}`)
      this.ensureDirectoryExists(textTranslation);
      console.log('project', project);
      const filePath = path.join(textTranslation, 'settings');
      console.log('filePath', filePath);

      // Create an array of promises for each source file
      const usjPromises = data.sourceFiles.map(async (source: string) => {
        const usjResult = await this.USFMtoUSJ(source);
        return usjResult;
      });

      // Wait for all promises to resolve
      const usjResults = await Promise.all(usjPromises);

      // Write each USJ result to a file
      usjResults.forEach((usj) => {
        fs.writeFileSync(path.join(textTranslation, `${usj.id}.usj`), JSON.stringify(usj.usj, null, 2));
        fs.writeFileSync(path.join(textTranslation, `target-${usj.id}.usj`), JSON.stringify(usj.target, null, 2));
        fs.writeFileSync(path.join(textTranslation, `edited-${usj.id}.usj`), JSON.stringify(usj.edited, null, 2));
      });

      // Write the main data to a file
      fs.writeFileSync(`${filePath}.json`, JSON.stringify(data, null, 2));

      this.logger.info(`Successfully saved file: ${filePath}`);
      return true;
    } catch (error) {
      this.logger.error(`Error saving file: ${error.message}`);
      throw new Error(`Failed to save file: ${error.message}`);
    }
  }

  async readFromFile(filename: string): Promise<any> {
    try {
      const filePath = this.getFilePath(filename);

      if (!fs.existsSync(filePath)) {
        throw new Error(`File does not exist: ${filename}`);
      }

      const content = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(content);
    } catch (error) {
      this.logger.error(`Error reading file ${filename}: ${error.message}`);
      throw new Error(`Failed to read file: ${error.message}`);
    }
  }

  async listProjectFiles(): Promise<string[]> {
    try {
      return this.readDirectoryRecursive(this.projectDir);
    } catch (error) {
      this.logger.error(`Error listing project files: ${error.message}`);
      throw new Error(`Failed to list project files: ${error.message}`);
    }
  }

  private getFilePath(filename: string): string {
    const sanitizedFilename = filename.replace(/\.\./g, '');
    return path.isAbsolute(sanitizedFilename)
      ? sanitizedFilename
      : path.join(this.projectDir, sanitizedFilename);
  }

  private ensureDirectoryExists(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      this.logger.debug(`Created directory: ${dirPath}`);
    }
  }

  private readDirectoryRecursive(dirPath: string, basePath: string = dirPath): string[] {
    let results: string[] = [];

    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      const relativePath = path.relative(basePath, fullPath);

      if (entry.isDirectory()) {
        const nestedResults = this.readDirectoryRecursive(fullPath, basePath);
        results = results.concat(nestedResults);
      } else {
        results.push(relativePath);
      }
    }

    return results;
  }
}