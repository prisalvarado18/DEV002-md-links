// const mdLinks = require('../');


// describe('mdLinks', () => {

//   it('should...', () => {
//     console.log('FIX ME!');
//   });

// });
const { fileExists, checkPath, convertToAbsolutePath, isDirectory, readDirectory, isFile } = require('../index.js');

const realAbsolutePath = 'C:/Users/palva/OneDrive/Documents/proyectosLaboratoria/DEV002-md-links/test/folder/archive.md';
const falseRelativePath = './notRealfolder/archive.md';
const realRelativePath = 'test/folder/archive.md'
const dirPath = 'C:/Users/palva/OneDrive/Documents/proyectosLaboratoria/DEV002-md-links/test/folder';
const dirEmptyPath = 'C:/Users/palva/OneDrive/Documents/proyectosLaboratoria/DEV002-md-links/test/folder/emptyFolder';

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
    expect(readDirectory(dirPath)).toEqual(['archive.md', 'emptyFolder']);
  });
  it('should return an empty array if it is empty', () => {
    expect(readDirectory(dirEmptyPath)).toEqual([ ]);
  });
});

describe('isFile', () => {
  it('should be a function', () => {
    expect(typeof isFile).toBe('function');
  });
  it('should return an array of files if it is not empty', () => {
    expect(isFile(realAbsolutePath)).toEqual(true);
  });
  it('should return an empty array if it is empty', () => {
    expect(readDirectory(dirEmptyPath)).toEqual([ ]);
  });
});