// module.exports = () => {
//   // ...
// };

// Access to Node core modules
const path = require('path');
// Import the Node.js file system module to work with the file system
// It reads, creates, updates, deletes, and renames files
const fs = require('fs');

// Check if path exists
export const fileExists = (pathname) => {
    const fileExists = fs.existsSync(pathname);
    return fileExists ? true : false;
}


module.exports = {fileExists};