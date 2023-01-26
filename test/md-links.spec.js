// const mdLinks = require('../');


// describe('mdLinks', () => {

//   it('should...', () => {
//     console.log('FIX ME!');
//   });

// });
const { fileExists, checkPath, convertToAbsolutePath } = require('../index.js');

const realAbsolutePath = 'C:/Users/palva/OneDrive/Documents/proyectosLaboratoria/DEV002-md-links/test/folder/archive.md';
const falseRelativePath = './notRealfolder/archive.md';
const realRelativePath = 'test/folder/archive.md'

describe('fileExists', () => {
  it('fileExists should be a function', () => {
    expect(typeof fileExists).toBe('function');
  });
  it('It should return true if the path exists', () => {
    expect(fileExists(realAbsolutePath)).toEqual(true);
  });
  it('It should return true if the path does not exist', () => {
    expect(fileExists(falseRelativePath)).toEqual(false);
  });
});

describe('checkPath', () => {
  it('checkPath should be a function', () => {
    expect(typeof checkPath).toBe('function');
  });
  it('It should return true if the is absolute', () => {
    expect(checkPath(realAbsolutePath)).toEqual(true);
  });
  it('It should return false if the path is not absolute', () => {
    expect(checkPath(realRelativePath)).toEqual(false);
  });
});

describe('convertToAbsolutePath', () => {
  it('convertToAbsolutePath should be a function', () => {
    expect(typeof convertToAbsolutePath).toBe('function');
  });
  it('It should convert the path entered to an absolute one', () => {
    expect(convertToAbsolutePath(realRelativePath)).toEqual('C:\\Users\\palva\\OneDrive\\Documents\\proyectosLaboratoria\\DEV002-md-links\\test\\folder\\archive.md');
  });
});