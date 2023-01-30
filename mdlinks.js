const { argv } = require('process');
const { mdLinks } = require('./promise');

let path = argv[2];
let optionOne = argv[3];
let optionTwo = argv[4];
let options = [optionOne, optionTwo];


mdLinks(path, options);