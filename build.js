const fs = require('fs');
const path = require('path');

// Example build script: Copy files from src to dist
const srcDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, 'dist');

// Ensure dist directory exists
if (!fs.existsSync(distDir)){
    fs.mkdirSync(distDir);
}

// Copy files from src to dist
fs.readdirSync(srcDir).forEach(file => {
    const srcFile = path.join(srcDir, file);
    const distFile = path.join(distDir, file);
    fs.copyFileSync(srcFile, distFile);
    console.log(`Copied ${srcFile} to ${distFile}`);
});

console.log('Build complete.');
