const { mdLinks } = require('./promise');

mdLinks('./test/folder', '--validate  ""'  )
    .then(link => console.log(link))