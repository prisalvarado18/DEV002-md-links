// module.exports = () => {
//   // ...
// };

// Access to Node core modules
const path = require('path');
// Import the Node.js file system module to work with the file system
// It reads, creates, updates, deletes, and renames files
const fs = require('fs');
// The Fetch API:
//...is a high-level function that takes a URL as argument to return 
// a promise that resolves to the response of that request.
//...provides a JavaScript interface to access and manipulate 
// (asynchronously over the network) parts of the HTTP channel,
// such as requests and responses.
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

// Check if the given path points to a file
const isFile = (pathname) => {
    const stats = fs.statSync(pathname);
    return stats.isFile() ? true : false;
}
// console.log(isFile('C:/Users/palva/OneDrive/Documents/proyectosLaboratoria/DEV002-md-links/test/folder'));
// console.log(isFile('C:/Users/palva/OneDrive/Documents/proyectosLaboratoria/DEV002-md-links/test/folder/archive.md'));

// Check if the entered path points to a .md file
const isMdFile = (pathname) => {
    // const stats = fs.statSync(pathname);
    return path.extname(pathname) === ".md" ? true : false;
}
// console.log(isMdFile('C:/Users/palva/OneDrive/Documents/proyectosLaboratoria/DEV002-md-links/test/folder/quiz.txt'));
// console.log(isMdFile('C:/Users/palva/OneDrive/Documents/proyectosLaboratoria/DEV002-md-links/test/folder/archive.md'));

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
// console.log(getMdFileArray('C:/Users/palva/OneDrive/Documents/proyectosLaboratoria/DEV002-md-links/test/folder'));
// Read files
// First try which directly returns the file's content
// fs.readFile('C:/Users/palva/OneDrive/Documents/proyectosLaboratoria/DEV002-md-links/test/folder/anotherFolder/randomStuff/theRaven.md', 'utf8', function(error, file){
//     console.log(file);
// });
// Second try with a synchronous function
// const readFile = (file) => fs.readFileSync(file, 'utf-8');

// Third try that returns a Promise <Pending>
const readFile = (pathname) => {
    return new Promise((resolve, reject) => {
        fs.readFile(pathname, 'utf8', (error, file) => {
            return error ? reject(error) : resolve(file);
        });
    });
};
// Get links
// First try
// const getLinks = (file) => {
//     fs.readFile(file, 'utf8', (error, data) => {
//         const links = data.match(/\[([\w\s\d]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#]+[a-zA-Z0-9!-_$]+)\)/gi);
//         return error ? (error) : (links);
//     });
// };
// console.log(getLinks('C:/Users/palva/OneDrive/Documents/proyectosLaboratoria/DEV002-md-links/test/folder/anotherFolder/randomStuff/theRaven.md'))
// Second try
// const getLinks = (file, type) => {
//     return new Promise((resolve, reject) => {
//         fs.readFile(file, type, (error, data) => {
//             const links = data.match(/\[([\w\s\d]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#]+[a-zA-Z0-9!-_$]+)\)/gi);
//             return error ? reject(error) : resolve(links);
//         });
//     });
// };
// Third try with a synchronous function
// const getLinks = (linksArray) => {
//     let links = [];
//     linksArray.forEach((file) => {
//         // Reading files
//         const content = readFile(file);
//         // Gathering the URLs
//         const regExp = /\[(.+)\]\((https?:\/\/.+)\)/gi;
//         const linksFound = [...content.matchAll(regExp)];
//         if (linksFound !== null || linksFound.length !== 0) {
//             // Ensambling the array of objects
//             linksFound.forEach(link => {
//                 links.push({
//                     file: file,
//                     href: link[2],
//                     text: link[1].slice(0, 50)
//                 })
//             })
//         }
//     })
//     return links
// }
// ......................................... Making tests .........................................
// ................................................................................................
// let linksArray = []
// const regEx = /\[([\w\s\d]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#]+[a-zA-Z0-9!-_$]+)\)/gi;
// const pathname = '[Edgar Allan Poe](https://www.poetryfoundation.org/poets/edgar-allan-poe)';
// let matchLink = regEx.exec(pathname);
// /*'[Edgar Allan Poe](https://www.poetryfoundation.org/poets/edgar-allan-poe)',
//       'Edgar Allan Poe', // ----> I need this one [1]
//       'https://www.poetryfoundation.org/poets/edgar-allan-poe', // ----> I need this one [2]
//       index: 0,
//       input: '[Edgar Allan Poe](https://www.poetryfoundation.org/poets/edgar-allan-poe)',
//       groups: undefined*/
// while (matchLink !== null) {
//     linksArray.push({
//         href: matchLink[2],
//         text: matchLink[1],
//         file: pathname,
//     });
//     matchLink = regEx.exec(pathname);
// }
// console.log(linksArray);
// /* 
// [
//     {
//       href: 'https://www.poetryfoundation.org/poets/edgar-allan-poe',
//       text: 'Edgar Allan Poe',
//       file: '[Edgar Allan Poe](https://www.poetryfoundation.org/poets/edgar-allan-poe)' // ----> Here, I need to pass the path
//     }
// ]
// */
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
                // if (objectsArray.length != 0) {
                //     resolve(objectsArray)
                // }
                resolve(objectsArray);
            })
            .catch((error) => reject(error));
    });
}
/*
let outcomeGoesToFetch = [
    {
        href: 'https://www.poetryfoundation.org/poets/edgar-allan-poe',
        text: 'Edgar Allan Poe',
        file: 'C:\\Users\\palva\\OneDrive\\Documents\\proyectosLaboratoria\\DEV002-md-links\\test\\folder/anotherFolder/inceptionFolder/archive_003.md'
    }
]
*/
// Function to validate link with HTTP requests
const validateLinks = (objectsArray) => Promise.all(objectsArray.map((object) => fetch(object.href)
    //Promise.all returns a resolved promise array and cuts off on the first reject
    .then((response) => {
        const objectResponse = {
            ...object,
            status: response.status,
            ok: response.ok ? 'ok' : 'fail',
        };
        return objectResponse;
    })
    .catch(() => ({
        ...object,
        status: 'broken file',
        ok: 'fail',
    }))));
/*
let validateLinksOutcome = [{
    href: 'https://www.youtube.com/?hl=es&gl=BR',
    text: 'Youtube',
    file: 'C:\\Users\\palva\\OneDrive\\Documents\\proyectosLaboratoria\\DEV002-md-links\\test\\folder/anotherFolder/inceptionFolder/archive_003.md',
    status: 200,
    ok: 'ok'
}];
*/
// ..................................................................Third try: HTTP requests
// const decons = outcomeGoesToFetch[0];
// const object = outcomeGoesToFetch.map(arrayLinks => arrayLinks.href);
// const link = object[0];
// fetch(link)
//     .then(res => {
//         // const status = res.headers.get("status");
//         // console.log(status);
//         const newObject = {
//             ...decons,
//             status: res.status,
//             ok: res.ok ? 'ok' : 'fail',
//         }
//         console.log(newObject);
//     })

// ..................................................................Second try: HTTP requests
// const status200 = 'https://jsonplaceholder.typicode.com/users';
// const status400= 'https://www.domain.com/kb/%%404_not_found_error/';
// const status404 = 'https://www.tumblr.com/kjewhfuijwe';
// fetch(status404)
//     .then(res => {
//         const newObject = {
//             status: res.status,
//         }
//         console.log(newObject);
//     })
// ..................................................................First try: HTTP requests
// fetch('https://jsonplaceholder.typicode.com/users')
//     .then(res => res.json())
//     .then(json => {
//         console.log("First user in the array:");
//         console.log(json[0]);
//         console.log("Name of the first user in the array:");
//         console.log(json[0].name);
// })
/*
let outcomeGoesToFetch2 = [
    {
        href: 'https://www.poetryfoundation.org/poets/edgar-allan-poe',
        text: 'Edgar Allan Poe',
        file: '[Edgar Allan Poe](https://www.poetryfoundation.org/poets/edgar-allan-poe)' // ---> Should be the path
    },
    {
        href: 'https://www.google.com',
        text: 'Google',
        file: '[Google](https://www.google.com)' // ---> Should be the path
    },
    {
        href: 'https://www.youtube.com/watch?v=F4i3O7T488I&t',
        text: 'Youtube',
        file: '[Youtube](https://www.youtube.com/watch?v=F4i3O7T488I&t)' // ---> Should be the path
    }
]
*/
// Stats for 'stats: true'
const reportStats = (objectsArray) => {
    const extractHref = objectsArray.map((link) => link.href);//Enter the promise and extract href's 
    // The Set object lets you store unique values of any type, whether primitive values or object references.
    // https://stackoverflow.com/questions/36588890/es6-set-allows-duplicate-array-object
    const repeatedHref = new Set(extractHref); // remove repeated links
    return {
        total: extractHref.length,
        unique: repeatedHref.size
    }
}

// const print = reportStats(outcomeGoesToFetch2);
// console.log(print);
// const reportStatsOutcome = { total: 3, unique: 3 };

const reportbrokenLinks = (objectsArray) => {
    // console.log(objectsArray.length)
    const brokenLinks = objectsArray.filter((link) => link.ok === "fail");
    // console.log(brokenLinks)
    return {
        total: objectsArray.length, /*reportStats(objectsArray).total,*/
        unique: reportStats(objectsArray).unique,
        broken: brokenLinks.length
    }
}

// const print = reportbrokenLinks(outcomeGoesToFetch2);
// console.log(print);
// const reportbrokenLinksOutcome = { total: 3, unique: 3, broken: 0 };

// Get all of the links from all of the markdown files
// let arrayMDocuments = [];
const getAllMdDFiles = (pathname) => {
    if (fileExists(pathname)) {
        checkPath(pathname);
        convertToAbsolutePath(pathname);
    }
    return getMdFileArray(pathname)
}

// const array = getAllMdDFiles('C:/Users/palva/OneDrive/Documents/proyectosLaboratoria/DEV002-md-links/test/folder');
// arrayMDocuments.forEach((file) => {
//     getLinks(file, 'utf8')
//         .then((file2) => {
//             console.log(file2);
//         })
// })

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