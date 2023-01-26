// const mdLinks = require('../');


// describe('mdLinks', () => {

//   it('should...', () => {
//     console.log('FIX ME!');
//   });

// });
const { fileExists } = require('../index.js');

const realPath = 'C:/Users/palva/OneDrive/Documents/proyectosLaboratoria/DEV002-md-links/test/folder/archive.md';
const falsePath = './notRealfolder/archive.md'

describe('fileExists', () => {
    it('fileExists should be a function', () => {
        expect(typeof fileExists).toBe('function');
    });
    it('It should return true if the path exists', () => {
        expect(fileExists(realPath)).toEqual(true);
      });
      it('It should return true if the path does not exist', () => {
        expect(fileExists(falsePath)).toEqual(false);
      });
});
