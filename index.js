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
// console.log(readDirectory('C:/Users/palva/OneDrive/Documents/proyectosLaboratoria/DEV002-md-links/test/folder'));
// console.log(readDirectory('C:/Users/palva/OneDrive/Documents/proyectosLaboratoria/DEV002-md-links/test/folder/emptyFolder'));

// Check if a path points to a file
const isFile = (pathname) => {
    const stats = fs.statSync(pathname);
    return stats.isFile() ? true : false;
}
// console.log(isFile('C:/Users/palva/OneDrive/Documents/proyectosLaboratoria/DEV002-md-links/test/folder'));
// console.log(isFile('C:/Users/palva/OneDrive/Documents/proyectosLaboratoria/DEV002-md-links/test/folder/archive.md'));

// Check if the entered path points to a .md file
const isMdFile = (pathname) => {
    const stats = fs.statSync(pathname);
    return path.extname(pathname) === ".md" ? true : false;
}
// console.log(isMdFile('C:/Users/palva/OneDrive/Documents/proyectosLaboratoria/DEV002-md-links/test/folder/quiz.txt'));
// console.log(isMdFile('C:/Users/palva/OneDrive/Documents/proyectosLaboratoria/DEV002-md-links/test/folder/archive.md'));

// Save an array of markdown files with a recursive function
const getMdFileArray = (pathname) => {
    let files = [];
    if (isFile(pathname) && isMdFile(pathname)) {
        files.push(pathname)
    } else if (isDirectory(pathname)) {
        const items = readDirectory(pathname);
        items.map((item) => {
            files = files.concat(getMdFileArray(`${pathname}/${item}`));
        });
    }
    return files;
}
// console.log(getMdFileArray('C:/Users/palva/OneDrive/Documents/proyectosLaboratoria/DEV002-md-links/test/folder'));
// Read files
// First try which directly returns the file's content
// fs.readFile('C:/Users/palva/OneDrive/Documents/proyectosLaboratoria/DEV002-md-links/test/folder/anotherFolder/randomStuff/theRaven.md', 'utf8', function(error, file){
//     console.log(file);
// });
// Second try that returns a Promise <Pending>
const readFile = (pathname) => {
    return new Promise((resolve, reject) => {
        fs.readFile(pathname, 'utf8', (error, file) => {
            return error ? reject(error) : resolve(file);
        });
    });
};

module.exports = { fileExists, checkPath, convertToAbsolutePath, isDirectory, readDirectory, isFile, isMdFile, getMdFileArray, readFile };