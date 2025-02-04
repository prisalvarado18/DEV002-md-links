// const mdLinks = require('../');


// describe('mdLinks', () => {

//   it('should...', () => {
//     console.log('FIX ME!');
//   });

// });
const { fileExists, checkPath, convertToAbsolutePath, isDirectory, readDirectory, isFile, isMdFile, getMdFileArray, readFile, getLinks, validateLinks, reportStats, reportbrokenLinks, getAllMdDFiles } = require('../index.js');

const realAbsolutePath = 'C:/Users/palva/OneDrive/Documents/proyectosLaboratoria/DEV002-md-links/test/folder/archive.md';
const falseRelativePath = './notRealfolder/archive.md';
const realRelativePath = 'test/folder/archive.md'
const dirPath = 'C:/Users/palva/OneDrive/Documents/proyectosLaboratoria/DEV002-md-links/test/folder';
const dirEmptyPath = 'C:/Users/palva/OneDrive/Documents/proyectosLaboratoria/DEV002-md-links/test/folder/emptyFolder';
const txtPath = 'C:/Users/palva/OneDrive/Documents/proyectosLaboratoria/DEV002-md-links/test/folder/quiz.txt';
const mdFilesPath = 'C:/Users/palva/OneDrive/Documents/proyectosLaboratoria/DEV002-md-links/test/folder/anotherFolder';
const mdFilesArray = [
  'C:/Users/palva/OneDrive/Documents/proyectosLaboratoria/DEV002-md-links/test/folder/anotherFolder/archive_001.md',
  'C:/Users/palva/OneDrive/Documents/proyectosLaboratoria/DEV002-md-links/test/folder/anotherFolder/archive_002.md',
  'C:/Users/palva/OneDrive/Documents/proyectosLaboratoria/DEV002-md-links/test/folder/anotherFolder/inceptionFolder/archive_003.md',
  'C:/Users/palva/OneDrive/Documents/proyectosLaboratoria/DEV002-md-links/test/folder/anotherFolder/inceptionFolder/archive_004.md',
  'C:/Users/palva/OneDrive/Documents/proyectosLaboratoria/DEV002-md-links/test/folder/anotherFolder/inceptionFolder/archive_005.md',
  'C:/Users/palva/OneDrive/Documents/proyectosLaboratoria/DEV002-md-links/test/folder/anotherFolder/randomStuff/globalBrief.md',
  'C:/Users/palva/OneDrive/Documents/proyectosLaboratoria/DEV002-md-links/test/folder/anotherFolder/randomStuff/shortFile.md',
  'C:/Users/palva/OneDrive/Documents/proyectosLaboratoria/DEV002-md-links/test/folder/anotherFolder/randomStuff/theRaven.md',
]
const latinQuote = 'C:/Users/palva/OneDrive/Documents/proyectosLaboratoria/DEV002-md-links/test/folder/anotherFolder/randomStuff/shortFile.md';

const googlePath = 'C:/Users/palva/OneDrive/Documents/proyectosLaboratoria/DEV002-md-links/test/folder/anotherFolder/archive_001.md';
let getLinksOutcome = [
    {
        href: 'https://www.google.com/?hl=es',
        text: 'Google',
        file: 'C:/Users/palva/OneDrive/Documents/proyectosLaboratoria/DEV002-md-links/test/folder/anotherFolder/archive_001.md'
    }
]

let getLinksOutcomeBroken = [
  {
    href: 'http://globalbrief.ca/blog/2013/06/19/what%e2%80%99s-the-future-of-capricious-war/',
    text: 'extend threats',
    file: 'C:\\Users\\palva\\OneDrive\\Documents\\proyectosLaboratoria\\DEV002-md-links\\test\\folder/anotherFolder/randomStuff/globalBrief.md',
  }
]

let validateLinksOutcome = [{
  href: 'https://www.google.com/?hl=es',
  text: 'Google',
  file: 'C:/Users/palva/OneDrive/Documents/proyectosLaboratoria/DEV002-md-links/test/folder/anotherFolder/archive_001.md',
  status: 200,
  ok: 'ok'
}];

let validateLinksOutcomeBroken = [{
  href: 'http://globalbrief.ca/blog/2013/06/19/what%e2%80%99s-the-future-of-capricious-war/',
  text: 'extend threats',
  file: 'C:\\Users\\palva\\OneDrive\\Documents\\proyectosLaboratoria\\DEV002-md-links\\test\\folder/anotherFolder/randomStuff/globalBrief.md',
  status: 404,
  ok: 'fail'
}];

const reportStatsOutcome = {"total": 1, "unique": 1};
const reportbrokenLinksOutcome = { total: 1, unique: 1, broken: 0 };

describe('fileExists', () => {
  it('should be a function', () => {
    expect(typeof fileExists).toBe('function');
  });
  it('should return true if the path exists', () => {
    expect(fileExists(realAbsolutePath)).toEqual(true);
  });
  it('should return true if the path does not exist', () => {
    expect(fileExists(falseRelativePath)).toEqual(false);
  });
});

describe('checkPath', () => {
  it('should be a function', () => {
    expect(typeof checkPath).toBe('function');
  });
  it('should return true if the is absolute', () => {
    expect(checkPath(realAbsolutePath)).toEqual(true);
  });
  it('should return false if the path is not absolute', () => {
    expect(checkPath(realRelativePath)).toEqual(false);
  });
});

describe('convertToAbsolutePath', () => {
  it('should be a function', () => {
    expect(typeof convertToAbsolutePath).toBe('function');
  });
  it('should convert the path entered to an absolute one', () => {
    expect(convertToAbsolutePath(realRelativePath)).toEqual('C:\\Users\\palva\\OneDrive\\Documents\\proyectosLaboratoria\\DEV002-md-links\\test\\folder\\archive.md');
  });
});

describe('isDirectory', () => {
  it('should be a function', () => {
    expect(typeof isDirectory).toBe('function');
  });
  it('should return true if the given path points to a Directory', () => {
    expect(isDirectory(dirPath)).toEqual(true);
  });
  it('should return false if the given path does not point to a Directory', () => {
    expect(isDirectory(realAbsolutePath)).toEqual(false);
  });
});

describe('readDirectory', () => {
  it('should be a function', () => {
    expect(typeof readDirectory).toBe('function');
  });
  it('should return an array of files if it is not empty', () => {
    expect(readDirectory(dirPath)).toEqual(['anotherFolder', 'archive.md', 'emptyFolder', 'quiz.txt']);
  });
  it('should return an empty array if it is empty', () => {
    expect(readDirectory(dirEmptyPath)).toEqual([]);
  });
});

describe('isFile', () => {
  it('should be a function', () => {
    expect(typeof isFile).toBe('function');
  });
  it('should return true if the path points to a markdown file', () => {
    expect(isFile(realAbsolutePath)).toEqual(true);
  });
  it('should return false if does not point to a markdown file', () => {
    expect(isFile(dirPath)).toEqual(false);
  });
});

describe('isMdFile', () => {
  it('should be a function', () => {
    expect(typeof isMdFile).toBe('function');
  });
  it('should return true if the path points to a file', () => {
    expect(isMdFile(realAbsolutePath)).toEqual(true);
  });
  it('should return false if the path points to a directory', () => {
    expect(isMdFile(txtPath)).toEqual(false);
  });
});

describe('getMdFileArray', () => {
  it('should be a function', () => {
    expect(typeof getMdFileArray).toBe('function');
  });
  it('should return an empty array', () => {
    expect(getMdFileArray(dirEmptyPath)).toEqual([]);
  });
  it('should return an array with markdwon files', () => {
    expect(getMdFileArray(mdFilesPath)).toEqual(mdFilesArray);
  });
});

describe('readFile', () => {
  it('should be a function', () => {
    expect(typeof readFile).toBe('function');
  });
  it('should return "Nemo censetur ignorare legem"', () => {
    expect(readFile(latinQuote)).resolves.toEqual('Nemo censetur ignorare legem');
  });
  it('should return error', () => {
    expect(readFile('./nonExistentPath')).rejects.toThrow("ENOENT: no such file or directory, open 'C:\\Users\\palva\\OneDrive\\Documents\\proyectosLaboratoria\\DEV002-md-links\\nonExistentPath'");
  });
});

describe('getLinks', () => {
  it('should be a function', () => {
    expect(typeof getLinks).toBe('function');
  });
  it('should return array of objects', () => {
    expect(getLinks(googlePath)).resolves.toEqual(getLinksOutcome);
  });
  // it('should return regEx', () => {
    // const data = 'By [Edgar Allan Poe](https://www.poetryfoundation.org/poets/edgar-allan-poe)';
    // const regEx = /\[([\w\s\d]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#]+[a-zA-Z0-9!-_$]+)\)/gi;
    // let matchLink = regEx.exec(data);
    // expect(matchLink).toMatchObject('["[Edgar Allan Poe](https://www.poetryfoundation.org/poets/edgar-allan-poe)", "Edgar Allan Poe", "https://www.poetryfoundation.org/poets/edgar-allan-poe"]');
  // });
  it('should return array of objects', () => {
    expect(getLinks('./nonExistentPath')).rejects.toThrow("ENOENT: no such file or directory, open 'C:\\Users\\palva\\OneDrive\\Documents\\proyectosLaboratoria\\DEV002-md-links\\nonExistentPath'");
  });
});

describe('validateLinks', () => {
  it('should be a function', () => {
    expect(typeof validateLinks).toBe('function');
  });
  it('should return array of objects', () => {
    expect(validateLinks(getLinksOutcome)).resolves.toEqual(validateLinksOutcome);
  });
  it('should return array of objects', () => {
    expect(validateLinks(getLinksOutcomeBroken)).resolves.toEqual(validateLinksOutcomeBroken);
  });
});

describe('reportStats', () => {
  it('should be a function', () => {
    expect(typeof reportStats).toBe('function');
  });
  it('should return {"total": 1, "unique": 1}', () => {
    expect(reportStats(getLinksOutcome)).toEqual(reportStatsOutcome);
  });
});

describe('reportbrokenLinks', () => {
  it('should be a function', () => {
    expect(typeof reportbrokenLinks).toBe('function');
  });
  it('should return { "total": 1, "unique": 1, "broken": 0 }', () => {
    expect(reportbrokenLinks(getLinksOutcome)).toEqual(reportbrokenLinksOutcome);
  });
});

describe('getAllMdDFiles', () => {
  it('should be a function', () => {
    expect(typeof getAllMdDFiles).toBe('function');
  });
  it('should return an array of .md files', () => {
    expect(getAllMdDFiles(mdFilesPath)).toEqual(mdFilesArray);
  });
});