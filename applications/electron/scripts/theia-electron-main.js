const path = require("path");
const os = require("os");
const { setupEnvironment } = require("./environment-config");

// Initialize our custom environment
const config = setupEnvironment();

// Log our configuration
console.log(
  `Starting ${config.APP_NAME} with custom backend directory: ${config.BACKEND_DIR_NAME}`
);
console.log(`User data location: ${config.userDataDir}`);

// Use a set of builtin plugins in our application.
process.env.THEIA_DEFAULT_PLUGINS = `local-dir:${path.resolve(__dirname, "../", "plugins")}`;

// Lookup inside the user's home folder for more plugins, and accept user-defined paths.
process.env.THEIA_PLUGINS = [
  process.env.THEIA_PLUGINS,
  `local-dir:${path.resolve(os.homedir(), ".theia-ide", "plugins")}`,
]
  .filter(Boolean)
  .join(",");

// Handover to the auto-generated electron application handler
require("../lib/backend/electron-main.js");
