import {
  injectable,
  inject,
  postConstruct,
} from "@theia/core/shared/inversify";
import { EnvVariablesServer } from "@theia/core/lib/common/env-variables";
import { PythonService } from "../common/python-protocol";
import { DiskFileSystemProvider } from "@theia/filesystem/lib/node/disk-file-system-provider";
import { FileSystemProviderErrorCode } from "@theia/filesystem/lib/common/files";
import { URI } from "@theia/core/lib/common/uri";
import axios from "axios";
import { platform, machine } from "os";
import * as tar from "tar";
import { spawn } from "child_process";
@injectable()
export class PythonServiceImpl implements PythonService {
  // Static path components
  private static readonly SCRIBE_DIR_NAME = ".scribe";
  private static readonly PYTHON_DIR_NAME = "python";
  private static readonly APP_VENV_DIR_NAME = "app-venv";
  private static readonly PYTHON_BIN_NAME = "python3.13";
  private static readonly PYTHON_GENERIC_BIN_NAME = "python";

  // Add new static property for executable directory
  private static readonly EXEC_DIR_NAME =
    platform() === "win32" ? "Scripts" : "bin";

  // Static URIs - these will be initialized in initializeStaticUris
  private static scribeDir: URI;
  private static pythonDir: URI;
  private static pythonBinPath: URI;
  private static pythonGenericBinPath: URI;
  private static venvDir: URI;

  @inject(EnvVariablesServer)
  private envServer: EnvVariablesServer;

  @inject(DiskFileSystemProvider)
  private fileService: DiskFileSystemProvider;

  @postConstruct()
  protected async init(): Promise<void> {
    await this.initializeStaticUris();
  }

  private async initializeStaticUris(): Promise<void> {
    const homeDir = new URI(await this.envServer.getHomeDirUri());

    // Initialize scribeDir
    PythonServiceImpl.scribeDir = homeDir.resolve(
      PythonServiceImpl.SCRIBE_DIR_NAME
    );

    // Initialize pythonDir
    PythonServiceImpl.pythonDir = PythonServiceImpl.scribeDir.withPath(
      PythonServiceImpl.scribeDir.path.join(PythonServiceImpl.PYTHON_DIR_NAME)
    );

    // Initialize venvDir
    PythonServiceImpl.venvDir = PythonServiceImpl.scribeDir.withPath(
      PythonServiceImpl.scribeDir.path.join(PythonServiceImpl.APP_VENV_DIR_NAME)
    );

    // Check if venv exists and use its binaries if it does
    const venvExists = await this.fileService
      .stat(PythonServiceImpl.venvDir)
      .catch(() => {
        return false;
      });

    if (venvExists) {
      // Use venv binaries
      PythonServiceImpl.pythonBinPath = PythonServiceImpl.venvDir.withPath(
        PythonServiceImpl.venvDir.path.join(
          PythonServiceImpl.EXEC_DIR_NAME,
          PythonServiceImpl.PYTHON_BIN_NAME
        )
      );

      PythonServiceImpl.pythonGenericBinPath =
        PythonServiceImpl.venvDir.withPath(
          PythonServiceImpl.venvDir.path.join(
            PythonServiceImpl.EXEC_DIR_NAME,
            PythonServiceImpl.PYTHON_GENERIC_BIN_NAME
          )
        );
    } else {
      // Use base Python installation binaries
      PythonServiceImpl.pythonBinPath = PythonServiceImpl.pythonDir.withPath(
        PythonServiceImpl.pythonDir.path.join(
          PythonServiceImpl.EXEC_DIR_NAME,
          PythonServiceImpl.PYTHON_BIN_NAME
        )
      );

      PythonServiceImpl.pythonGenericBinPath =
        PythonServiceImpl.pythonDir.withPath(
          PythonServiceImpl.pythonDir.path.join(
            PythonServiceImpl.EXEC_DIR_NAME,
            PythonServiceImpl.PYTHON_GENERIC_BIN_NAME
          )
        );
    }
  }

  dispose(): void {
    // Clean up resources if needed
  }

  async setupEnvironment(): Promise<void> {
    const scribeDir = await this.getAppDir();
    const pythonDir = await this.downloadPython(scribeDir);
    await this.createVirtualEnv(scribeDir, pythonDir);
  }

  private async getAppDir(): Promise<URI> {
    const exists = await this.fileService
      .stat(PythonServiceImpl.scribeDir)
      .catch((err) => {
        if (err.code === FileSystemProviderErrorCode.FileNotFound) {
          return false;
        }
        throw err;
      });
    if (!exists) {
      await this.fileService.mkdir(PythonServiceImpl.scribeDir);
    }
    return PythonServiceImpl.scribeDir;
  }

  private async downloadPython(targetDir: URI): Promise<URI> {
    // Check if Python directory exists
    const pythonExists = await this.fileService
      .readdir(PythonServiceImpl.pythonDir)
      .catch(() => false);

    if (pythonExists) {
      // Verify Python version by running python --version
      try {
        const versionProcess = spawn(
          PythonServiceImpl.pythonBinPath.path.toString(),
          ["--version"]
        );

        const versionPromise = new Promise<string>((resolve, reject) => {
          let output = "";

          versionProcess.stdout.on("data", (data) => {
            output += data.toString();
          });

          versionProcess.on("close", (code) => {
            if (code === 0) {
              resolve(output.trim());
            } else {
              reject(
                new Error(`Python version check failed with code ${code}`)
              );
            }
          });

          versionProcess.on("error", (err) => {
            reject(err);
          });
        });

        const version = await versionPromise;
        if (version.includes("Python 3.13")) {
          console.log("Found existing Python 3.13 installation");
          return PythonServiceImpl.pythonDir;
        }
      } catch (err) {
        console.log(
          "Failed to verify Python version, will download fresh copy:",
          err
        );
      }
    }

    // Existing code for downloading Python
    console.log("Starting Python download...");
    const pythonDownloadUrl = this.getPythonDownloadUrl();

    const fileName = pythonDownloadUrl.split("/").pop();
    if (!fileName) {
      throw new Error("Failed to determine file name");
    }

    const downloadPath = targetDir.resolve(fileName);

    // Download and write file
    const response = await axios({
      url: pythonDownloadUrl,
      method: "GET",
      responseType: "arraybuffer",
    });

    await this.fileService.writeFile(downloadPath, response.data, {
      overwrite: true,
      create: true,
    });

    // Extract the tar content
    await tar.x({
      cwd: targetDir.path.toString(),
      file: downloadPath.path.toString(),
      gzip: true,
    });

    // List contents for debugging
    const targetContents = await this.fileService.readdir(targetDir);
    console.log("Contents of targetDir:", targetContents);

    const pythonContents = await this.fileService.readdir(
      PythonServiceImpl.pythonDir
    );
    console.log("Contents of pythonDir:", pythonContents);

    // delete the download file
    await this.fileService.delete(
      URI.fromFilePath(downloadPath.path.toString()),
      {
        recursive: true,
        useTrash: false,
      }
    );
    console.log("Python setup completed successfully");

    return PythonServiceImpl.pythonDir;
  }

  private getPythonDownloadUrl(): string {
    const architecture = machine();
    const currentPlatform = platform();
    console.log(
      `Detected platform: ${currentPlatform}, architecture: ${architecture}`
    );

    const key = `${currentPlatform}-${
      architecture === "x86_64" ? "x64" : "arm64"
    }` as keyof typeof PYTHON_DOWNLOADS;
    const url = PYTHON_DOWNLOADS[key];

    if (!url) {
      throw new Error(`Unsupported platform/architecture combination: ${key}`);
    }

    return url;
  }

  private async createVirtualEnv(
    scribeDir: URI,
    pythonDir: URI
  ): Promise<void> {
    // Check if venv already exists
    const venvExists = await this.fileService
      .stat(PythonServiceImpl.venvDir)
      .catch(() => {
        return false;
      });

    if (venvExists) {
      console.log("Virtual environment already exists, updating Python paths");
      // Update Python paths to use venv binaries
      PythonServiceImpl.pythonBinPath = PythonServiceImpl.venvDir.withPath(
        PythonServiceImpl.venvDir.path.join(
          PythonServiceImpl.EXEC_DIR_NAME,
          PythonServiceImpl.PYTHON_BIN_NAME
        )
      );

      PythonServiceImpl.pythonGenericBinPath =
        PythonServiceImpl.venvDir.withPath(
          PythonServiceImpl.venvDir.path.join(
            PythonServiceImpl.EXEC_DIR_NAME,
            PythonServiceImpl.PYTHON_GENERIC_BIN_NAME
          )
        );
      return;
    }

    // Create venv directory and set up the environment
    await this.fileService.mkdir(PythonServiceImpl.venvDir);

    const venvProcess = spawn(
      PythonServiceImpl.pythonGenericBinPath.path.toString(),
      ["-m", "venv", PythonServiceImpl.venvDir.path.toString()]
    );

    await new Promise<void>((resolve, reject) => {
      venvProcess.on("close", (code) => {
        if (code !== 0) {
          reject(new Error(`Failed to create virtual environment: ${code}`));
        } else {
          // Update Python paths to use venv binaries after successful creation
          PythonServiceImpl.pythonBinPath = PythonServiceImpl.venvDir.withPath(
            PythonServiceImpl.venvDir.path.join(
              PythonServiceImpl.EXEC_DIR_NAME,
              PythonServiceImpl.PYTHON_BIN_NAME
            )
          );

          PythonServiceImpl.pythonGenericBinPath =
            PythonServiceImpl.venvDir.withPath(
              PythonServiceImpl.venvDir.path.join(
                PythonServiceImpl.EXEC_DIR_NAME,
                PythonServiceImpl.PYTHON_GENERIC_BIN_NAME
              )
            );
          resolve();
        }
      });

      venvProcess.on("error", (err) => {
        reject(new Error(`Failed to create virtual environment: ${err}`));
      });
    });
  }

  async setupWildebeest(): Promise<void> {
    let stdout = "";
    let stderr = "";

    try {
      const pipProcess = spawn(
        PythonServiceImpl.pythonGenericBinPath.path.toString(),
        ["-m", "pip", "install", "wildebeest-nlp"]
      );

      // Create a promise to handle the process events
      await new Promise<void>((resolve, reject) => {
        pipProcess.stdout.on("data", (data) => {
          stdout += data.toString();
        });

        pipProcess.stderr.on("data", (data) => {
          stderr += data.toString();
        });

        pipProcess.on("close", (code) => {
          if (code !== 0) {
            reject(
              new Error(`Failed to install wildebeest-nlp (${code}): ${stderr}`)
            );
          } else {
            resolve();
          }
        });

        pipProcess.on("error", (err) => {
          reject(new Error(`Failed to install wildebeest-nlp: ${err}`));
        });
      });

      console.log("OUTPUT OF THE SPAWN", stdout);
    } catch (error) {
      throw error;
    }
  }

  async executeWildebeest(text: string): Promise<string> {
    const pythonBinPath = PythonServiceImpl.venvDir.withPath(
      PythonServiceImpl.venvDir.path.join(PythonServiceImpl.EXEC_DIR_NAME)
    );

    // Create temporary input and output files
    const inputFile = PythonServiceImpl.venvDir.withPath(
      PythonServiceImpl.venvDir.path.join("input.txt")
    );
    const outputFile = PythonServiceImpl.venvDir.withPath(
      PythonServiceImpl.venvDir.path.join("output.json")
    );

    try {
      console.log("Writing input text to file:", inputFile.path.toString());
      // Write the input text to a file
      await this.fileService.writeFile(inputFile, Buffer.from(text, "utf-8"), {
        create: true,
        overwrite: true,
      });

      console.log("Executing wb-ana command...");
      // Execute wb-ana with input and json output files
      await new Promise<void>((resolve, reject) => {
        const wildebeestProcess = spawn(
          "wb-ana",
          [
            "-i",
            inputFile.path.toString(),
            "-j",
            outputFile.path.toString(),
            "--verbose",
          ],
          {
            env: { ...process.env, PYTHONIOENCODING: "utf-8" },
            cwd: pythonBinPath.path.toString(),
          }
        );

        wildebeestProcess.stdout.setEncoding("utf-8");
        wildebeestProcess.stderr.setEncoding("utf-8");

        wildebeestProcess.stdout.on("data", (data) => {
          console.log("wb-ana stdout:", data);
        });

        wildebeestProcess.stderr.on("data", (data) => {
          console.log("wb-ana stderr:", data);
        });

        wildebeestProcess.on("close", (code) => {
          if (code !== 0) {
            reject(new Error(`Wildebeest analysis failed with code ${code}`));
          } else {
            resolve();
          }
        });

        wildebeestProcess.on("error", (err) => {
          reject(new Error(`Failed to execute Wildebeest: ${err}`));
        });
      });

      console.log("Reading output file:", outputFile.path.toString());
      // Read the output file
      const outputContent = await this.fileService.readFile(outputFile);
      const result = outputContent.toString();
      console.log("Wildebeest analysis result:", result);

      // Clean up temporary files
      await Promise.all([
        this.fileService.delete(inputFile, {
          recursive: true,
          useTrash: false,
        }),
        this.fileService.delete(outputFile, {
          recursive: true,
          useTrash: false,
        }),
      ]);

      return result;
    } catch (error) {
      console.error("Error in executeWildebeest:", error);
      // Clean up files in case of error
      try {
        await Promise.all([
          this.fileService.delete(inputFile, {
            recursive: true,
            useTrash: false,
          }),
          this.fileService.delete(outputFile, {
            recursive: true,
            useTrash: false,
          }),
        ]);
      } catch (cleanupError) {
        console.error("Error cleaning up temporary files:", cleanupError);
      }
      throw error;
    }
  }
}

const PYTHON_DOWNLOADS = {
  "win32-x64":
    "https://github.com/astral-sh/python-build-standalone/releases/download/20250212/cpython-3.13.2+20250212-x86_64-pc-windows-msvc-install_only.tar.gz",
  "darwin-x64":
    "https://github.com/astral-sh/python-build-standalone/releases/download/20250212/cpython-3.13.2+20250212-x86_64-apple-darwin-install_only.tar.gz",
  "darwin-arm64":
    "https://github.com/astral-sh/python-build-standalone/releases/download/20250212/cpython-3.13.2+20250212-aarch64-apple-darwin-install_only.tar.gz",
  "linux-x64":
    "https://github.com/astral-sh/python-build-standalone/releases/download/20250212/cpython-3.13.2+20250212-x86_64-unknown-linux-gnu-install_only.tar.gz",
  "linux-arm64":
    "https://github.com/astral-sh/python-build-standalone/releases/download/20250212/cpython-3.13.2+20250212-aarch64-unknown-linux-gnu-install_only.tar.gz",
} as const;
