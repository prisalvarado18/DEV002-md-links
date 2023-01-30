// import { argv } from 'node:process';
const { argv } = require('node:process');
// console.log(argv)
// console.log(argv.slice(2));
console.log(argv[2]);

// print process.argv
// argv.forEach((val, index) => {
//   console.log(`${index}: ${val}`);
// });


// const { mdLinks } = require("./cli.js");
// const path = process.argv[2];
// console.log(typeof path)
// const options = process.argv.slice(3); //option es un arreglo nos trae el texto --validate

// console.log(options)
// The join() method creates and returns a new string by concatenating all of the elements in an array 
// ''''const option = options.join(' ');
// // console.log(option)
// if (options.length === 0) {
// 	mdLinks(path, { validate: false })
// 		.then(response => response)
// } else if (options.length >= 1) {
// 	switch (option) {
// 		case '--validate --stats':
// 			mdLinks(path, { validate: true, stats: true })
// 				.then(response => response)
// 			break;

// 		case '--validate':
// 			mdLinks(path, { validate: true })
// 				.then(response => response)
// 			break;

// 		case '--stats':
// 			mdLinks(path, { stats: true })
// 				.then(response => response)
// 			break;

// 		case '--stats --validate':
// 			mdLinks(path, { stats: true, validate: true })
// 				.then(response => response)
// 			break;

// 		default:
// 			console.log('Por favor, ingrese una opción válida');
// 			break;
// 	}
// }

