const path = require("path");
const os = require("os");
const fs = require("fs");
const { execSync } = require("child_process");

// App identity configuration
const APP_NAME = "Scribe";
const APP_ID = "bridgeconn.scribe";
const BACKEND_DIR_NAME = ".scribe";

// Paths
const homedir = os.homedir();
const userDataDir = path.join(homedir, BACKEND_DIR_NAME);
const pluginsUserDir = path.join(userDataDir, "plugins");
const workspacesDir = path.join(userDataDir, "workspaces");
const projectDir = path.join(userDataDir, "projects");
const binaryDir = path.join(userDataDir, ".bin");
const ffmpegUserDir = path.join(binaryDir, "ffmpeg");
const defaultPluginsDir = path.resolve(__dirname, "..", "plugins");

// Get the current platform
const currentPlatform =
  os.platform() === "win32" ? "win" : os.platform() === "darwin" ? "mac" : "linux";

// Copy FFmpeg binaries from app resources to user data directory
function setupFFmpeg() {
  // Path to the platform-specific FFmpeg directory in user data
  const platformFFmpegDir = path.join(ffmpegUserDir, currentPlatform);

  // Check if FFmpeg has already been copied for this platform
  const ffmpegBinary =
    currentPlatform === "win"
      ? path.join(platformFFmpegDir, "ffmpeg.exe")
      : path.join(platformFFmpegDir, "ffmpeg");

  if (fs.existsSync(ffmpegBinary)) {
    console.log("FFmpeg binary already exists in user directory");
    return;
  }

  try {
    // Create the platform-specific ffmpeg directory in .bin
    if (!fs.existsSync(platformFFmpegDir)) {
      fs.mkdirSync(platformFFmpegDir, { recursive: true });
    }

    // In Electron, resources are in the 'resources' directory
    // For a packaged app, this is relative to the executable
    let resourcesPath;

    if (process.resourcesPath) {
      // We're in a packaged Electron app
      resourcesPath = process.resourcesPath;
    } else {
      // We're in development
      resourcesPath = path.resolve(__dirname, "../../../");
    }

    // Source directory where ffmpeg binaries are in the app resources
    const ffmpegSourceDir = path.join(resourcesPath, "app", "ffmpeg", currentPlatform);

    // The binary name depends on the platform
    const binaryName = currentPlatform === "win" ? "ffmpeg.exe" : "ffmpeg";

    // Source and destination file paths
    const sourceFile = path.join(ffmpegSourceDir, binaryName);
    const destFile = path.join(platformFFmpegDir, binaryName);

    console.log(`Copying FFmpeg from ${sourceFile} to ${destFile}`);

    if (fs.existsSync(sourceFile)) {
      fs.copyFileSync(sourceFile, destFile);

      // Make the binary executable on Unix-like systems
      if (currentPlatform !== "win") {
        try {
          execSync(`chmod +x "${destFile}"`);
        } catch (error) {
          console.error(`Failed to make FFmpeg executable: ${error}`);
        }
      }

      console.log("FFmpeg binary copied successfully");
    } else {
      console.error(`FFmpeg binary not found at ${sourceFile}`);
    }
  } catch (error) {
    console.error(`Error setting up FFmpeg: ${error.message}`);
  }
}

// Ensure directories exist
function ensureDirectoriesExist() {
  const dirs = [userDataDir, pluginsUserDir, workspacesDir, projectDir, binaryDir, ffmpegUserDir];
  dirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
}

// Setup environment
function setupEnvironment() {
  // Ensure our directories exist
  ensureDirectoriesExist();

  // Set up FFmpeg (copy from app resources to user data dir)
  setupFFmpeg();

  // Set environment variables for Theia
  process.env.THEIA_USER_DIR = userDataDir;
  process.env.THEIA_DEFAULT_PLUGINS = `local-dir:${defaultPluginsDir}`;

  // Set both Theia and custom app plugins paths for compatibility
  process.env.THEIA_PLUGINS = [process.env.THEIA_PLUGINS, `local-dir:${pluginsUserDir}`]
    .filter(Boolean)
    .join(",");

  // Add the project directory to environment variables
  process.env.PROJECT_DIR = projectDir;

  // Add FFmpeg path to environment variables - only the current platform's directory
  process.env.FFMPEG_DIR = path.join(ffmpegUserDir, currentPlatform);

  // Make configuration available for other modules
  return {
    APP_NAME,
    APP_ID,
    BACKEND_DIR_NAME,
    userDataDir,
    pluginsUserDir,
    workspacesDir,
    projectDir,
    binaryDir,
    ffmpegUserDir,
    defaultPluginsDir,
  };
}

module.exports = {
  setupEnvironment,
};
