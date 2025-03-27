const { execSync } = require("child_process");
const os = require("os");

// Get the current platform and architecture
const platform = os.platform();
const arch = os.arch();

// Define the build platforms based on the OS
const platforms = {
  darwin: "mac",
  win32: "win",
  linux: "linux",
};

// Check if the platform is supported by electron-builder
if (!platforms[platform]) {
  console.error(`Unsupported platform: ${platform}`);
  process.exit(1);
}

console.log(`Platform: ${platform} (${platforms[platform]})`);
console.log(`Architecture: ${arch}`);

// build command and disabling signing
const buildCommand =
  platform === "win32"
    ? `electron-builder --win --${arch}`
    : `electron-builder --${platforms[platform]} --${arch}`;

try {
  console.log(`Starting build for ${platform} (${arch})...`);
  // Execute the build command
  execSync(buildCommand, { stdio: "inherit" });
  console.log(`Build completed for ${platform} (${arch})`);
} catch (error) {
  console.error(`Error during build: ${error.message}`);
  process.exit(1);
}
