const path = require('path');
const { setupEnvironment } = require('./environment-config');

// Initialize our custom environment
const config = setupEnvironment();

// Log our configuration
console.log(`Starting ${config.APP_NAME} with custom backend directory: ${config.BACKEND_DIR_NAME}`);
console.log(`User data location: ${config.userDataDir}`);

// Handover to the auto-generated electron application handler
require('../lib/backend/electron-main.js');