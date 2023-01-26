// module.exports = () => {
//   // ...
// };

// Access to Node core modules
const path = require('path');
// Import the Node.js file system module to work with the file system
// It reads, creates, updates, deletes, and renames files
const fs = require('fs');

// Check if path exists
const fileExists = (pathname) => {
    const fileExists = fs.existsSync(pathname);
    return fileExists ? true : false;
}

// Check if the path is absolute or relative and return an absolute one
// Check if path is absolute
const checkPath = (pathname) => {
    return path.isAbsolute(pathname) ? true : false;
}

// Convert relative to absolute paths
const convertToAbsolutePath = (pathname) => {
    const cwd = process.cwd();
    return path.resolve(cwd, pathname);
}
// console.log(convertToAbsolutePath('./folder/archive.md'));

module.exports = {fileExists, checkPath, convertToAbsolutePath};