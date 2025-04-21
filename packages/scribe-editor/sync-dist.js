const chokidar = require('chokidar');
const fs = require('fs-extra');
const path = require('path');

// Source and target directories
const sourceDir = '/home/samueljohn/projects/scripture-editors/packages/scribe/dist';
const targetDir = '/home/samueljohn/projects/scribe-theia-main/packages/scribe-editor/lexical-lib';

// Make sure the target directory exists
fs.ensureDirSync(targetDir);

// Initialize watcher
const watcher = chokidar.watch(sourceDir, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true
});

// Copy entire directory on start
fs.copySync(sourceDir, targetDir, { overwrite: true });
console.log(`Initial copy from ${sourceDir} to ${targetDir} complete`);

// Function to handle file changes
const handleChange = filePath => {
  const relativePath = path.relative(sourceDir, filePath);
  const targetPath = path.join(targetDir, relativePath);

  fs.copy(filePath, targetPath)
    .then(() => console.log(`${filePath} copied to ${targetPath}`))
    .catch(err => console.error(`Error copying ${filePath}:`, err));
};

// Setup watchers
watcher
  .on('add', handleChange)
  .on('change', handleChange)
  .on('unlink', filePath => {
    const relativePath = path.relative(sourceDir, filePath);
    const targetPath = path.join(targetDir, relativePath);
    fs.remove(targetPath)
      .then(() => console.log(`${targetPath} removed`))
      .catch(err => console.error(`Error removing ${targetPath}:`, err));
  });

console.log(`Watching for changes in ${sourceDir}...`);