const path = require('path');
const os = require('os');
const fs = require('fs');

// App identity configuration
const APP_NAME = 'Scribe';
const APP_ID = 'bridgeconn.scribe';
const BACKEND_DIR_NAME = '.scribe';

// Paths
const homedir = os.homedir();
const userDataDir = path.resolve(homedir, BACKEND_DIR_NAME);
const pluginsUserDir = path.resolve(userDataDir, 'plugins');
const workspacesDir = path.resolve(userDataDir, 'workspaces');
const projectDir = path.resolve(userDataDir, 'projects');
const binaryDir = path.resolve(userDataDir, '.bin');
const defaultPluginsDir = path.resolve(__dirname, '../', 'plugins');

// Ensure directories exist
function ensureDirectoriesExist() {
  const dirs = [userDataDir, pluginsUserDir, workspacesDir, projectDir, binaryDir];
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
}

// Setup environment
function setupEnvironment() {
  // Ensure our directories exist
  ensureDirectoriesExist();

  // Set environment variables for Theia
  process.env.THEIA_USER_DIR = userDataDir;
  process.env.THEIA_DEFAULT_PLUGINS = `local-dir:${defaultPluginsDir}`;
  
  // Set both Theia and custom app plugins paths for compatibility
  process.env.THEIA_PLUGINS = [
    process.env.THEIA_PLUGINS,
    `local-dir:${pluginsUserDir}`,
  ].filter(Boolean).join(',');
  
  // Add the project directory to environment variables
  process.env.PROJECT_DIR = projectDir;
  
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
    defaultPluginsDir
  };
}

module.exports = {
  setupEnvironment
};