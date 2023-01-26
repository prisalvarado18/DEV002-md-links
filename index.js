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

// Check if path is a directory
const isDirectory = (pathname) => {
    const stats = fs.statSync(pathname);
    return stats.isDirectory() ? true : false;
}
// console.log(isDirectory('C:/Users/palva/OneDrive/Documents/proyectosLaboratoria/DEV002-md-links/test/folder'));
// console.log(isDirectory('C:/Users/palva/OneDrive/Documents/proyectosLaboratoria/DEV002-md-links/test/folder/archive.md'));

// Read Directory
const readDirectory = (pathname) => {
    const content = fs.readdirSync(pathname);
    return content;
}

module.exports = { fileExists, checkPath, convertToAbsolutePath, isDirectory };