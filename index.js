// module.exports = () => {
//   // ...
// };

// Access to Node core modules
const path = require('path');

// Check if path exists
const fileExists = (pathname) => {
    const fileExists = fs.existsSync(pathname);
    return fileExists ? true : false;
}
