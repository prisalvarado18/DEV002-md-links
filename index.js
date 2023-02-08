const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

// Check if path exists
const fileExists = (pathname) => {
    const fileExists = fs.existsSync(pathname);
    return fileExists ? true : false;
}

// Check if path is absolute or relative and return an absolute one
// Check if path is absolute
const checkPath = (pathname) => {
    return path.isAbsolute(pathname) ? true : false;
}

// Convert relative to absolute path
const convertToAbsolutePath = (pathname) => {
    const cwd = process.cwd();
    return path.resolve(cwd, pathname);
}

// Check if path is a directory
const isDirectory = (pathname) => {
    const stats = fs.statSync(pathname);
    return stats.isDirectory() ? true : false;
}

// Read Directory
const readDirectory = (pathname) => {
    const content = fs.readdirSync(pathname);
    return content;
}

// Check if the given path points to a file
const isFile = (pathname) => {
    const stats = fs.statSync(pathname);
    return stats.isFile() ? true : false;
}

// Check if the entered path points to a .md file
const isMdFile = (pathname) => {
    // const stats = fs.statSync(pathname);
    return path.extname(pathname) === ".md" ? true : false;
}

// Save an array of markdown files with a recursive function
const getMdFileArray = (pathname) => {
    let files = [];
    if (isFile(pathname) && isMdFile(pathname)) {
        files.push(pathname);
    } else if (isDirectory(pathname)) {
        const items = readDirectory(pathname);
        items.map((item) => {
            files = files.concat(getMdFileArray(`${pathname}/${item}`));
        });
    }
    return files;
}

// Third try that returns a Promise <Pending>
const readFile = (pathname) => {
    return new Promise((resolve, reject) => {
        fs.readFile(pathname, 'utf8', (error, file) => {
            return error ? reject(error) : resolve(file);
        });
    });
};
// Get links
const getLinks = (pathname) => {
    return new Promise((resolve, reject) => {
        const objectsArray = [];
        readFile(pathname)
            .then((data) => {
                const regEx = /\[([\w\s\d]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#]+[a-zA-Z0-9!-_$]+)\)/gi;
                let matchLink = regEx.exec(data);
                while (matchLink !== null) {
                    objectsArray.push({
                        href: matchLink[2],
                        text: matchLink[1],
                        file: pathname,
                    });
                    matchLink = regEx.exec(data);
                }
                resolve(objectsArray);
            })
            .catch((error) => reject(error));
    });
}

// Function to validate link with HTTP requests
const validateLinks = (objectsArray) => Promise.all(objectsArray.map((object) => fetch(object.href)
    .then((response) => {
        const objectResponse = {
            ...object,
            status: response.status,
            ok: response.ok ? 'ok' : 'fail',
        };
        return objectResponse;
    })
    .catch((error) => error)
))

// Stats for 'stats: true'
const reportStats = (objectsArray) => {
    const extractHref = objectsArray.map((link) => link.href);//Enter the promise and extract href's 
    const repeatedHref = new Set(extractHref); // remove repeated links
    return {
        total: extractHref.length,
        unique: repeatedHref.size
    }
}

const reportbrokenLinks = (objectsArray) => {
    const brokenLinks = objectsArray.filter((link) => link.ok === "fail");
    return {
        total: objectsArray.length, 
        unique: reportStats(objectsArray).unique,
        broken: brokenLinks.length
    }
}

// Get all of the links from all of the markdown files
// let arrayMDocuments = [];
const getAllMdDFiles = (pathname) => {
    if (fileExists(pathname)) {
        checkPath(pathname);
        convertToAbsolutePath(pathname);
    }
    return getMdFileArray(pathname)
}

module.exports = {
    fileExists, 
    checkPath, 
    convertToAbsolutePath, 
    isDirectory, 
    readDirectory, 
    isFile, 
    isMdFile, 
    getMdFileArray, 
    getLinks,
    validateLinks,
    readFile,
    reportStats,
    reportbrokenLinks,
    getAllMdDFiles,
    validateLinks
};