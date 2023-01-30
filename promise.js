const { getLinks, validateLinks, stats, broken, getAllMdDFiles } = require('./index.js')

// mdLinks(path, options)
const mdLinks = (path, options) => {
    return new Promise((resolve, reject) => {
        if (options[0] === undefined && options[1] === undefined) {
            console.log('No has ingresado ninguna opcion')
            console.log('No has ingresado ningun path')
            const ruta = getAllMdDFiles(path)
            ruta.forEach(e => {
                // resolve(getLinks(e))
                getLinks(e)
                    .then(elemento => {
                        resolve(elemento);
                        if (Object.keys(elemento).length == 0) {
                            console.log('\nValidacion para: ' + e)
                            console.log('El archivo no contiene enlaces')
                        } else {
                            console.log('\nValidacion para: ' + e + '\n')
                            console.log(elemento);
                        }
                    }).catch((error) => reject(error));
            })
        } else {
            if ((options[0] === '--validate' && options[1] === '--stats') || (options[0] === '--stats' && options[1] === '--validate')) {
                console.log('Ingresaste --validate y --stats');
                console.log(path)
                const ruta = getAllMdDFiles(path);
                ruta.forEach(element => {
                    getLinks(element)
                        .then((link) => {
                            validateLinks(link)
                                .then(outcome => {
                                    resolve(broken(outcome));
                                    if (Object.keys(outcome).length == 0) {
                                        console.log('\nValidacion para: ' + element)
                                        console.log('El archivo no contiene enlaces')
                                    } else {
                                        console.log('\nValidacion para: ' + element + '\n')
                                        console.log(broken(outcome));
                                    }
                                }).catch((error) => reject(error));
                        })
                })
            } else if (options[0] === '--validate') {
                console.log('Ingresaste es validate');
                console.log(path)
                const ruta = getAllMdDFiles(path)
                ruta.forEach(e => {
                    getLinks(e)
                        .then((link) => {
                            validateLinks(link)
                                .then(elemento => {
                                    resolve(elemento);
                                    if (Object.keys(elemento).length == 0) {
                                        console.log('Validacion para: ' + e)
                                        console.log('El archivo no contiene enlaces\n')
                                    } else {
                                        console.log('\n Validacion para: ' + e + '\n')
                                        console.log(elemento);
                                    }
                                }).catch((error) => reject(error));
                        })

                })
            } else if (options[0] === '--stats') {
                console.log('Ingresaste --stats')
                console.log(path);
                const ruta = getAllMdDFiles(path)
                ruta.forEach(e => {
                    getLinks(e)
                        .then((elemento) => {
                            resolve(stats(elemento))
                            if (Object.keys(elemento).length == 0) {
                                console.log('\nValidacion para: ' + e)
                                console.log('El archivo no contiene enlaces')
                            } else {
                                console.log('\nValidacion para: ' + e + '\n')
                                console.log(stats(elemento));
                            }
                        }).catch((error) => reject(error));
                })
            } else {
                console.log('Ingrese una opcion valida');
                //console.log(path)
            }
        }
    })
}

module.exports = { mdLinks }

// const array3 = getAllMdDFiles('C:/Users/palva/OneDrive/Documents/proyectosLaboratoria/DEV002-md-links/test/folder');
// console.log(array3);
// const array4 = getAllMdDFiles('C:/Users/palva/OneDrive/Documents/proyectosLaboratoria/DEV002-md-links/test/folder/anotherFolder/randomStuff/theRaven.md');
// console.log(array4);

// const mdLinks = (paths, option) => {
//     // let error = 'error';
//     return new Promise((resolve, reject) => {
//         if (option.stats === true && option.validate === true) {
//             const ruta = getAllMdDFiles(paths)
//             ruta.forEach(element => {
//                 getLinks(element)
//                     .then((link) => {
//                         /*[{
//                             href: 'https://www.google.com/?hl=es',
//                             text: 'Google',
//                             file: 'C:\\Users\\palva\\OneDrive\\Documents\\proyectosLaboratoria\\DEV002-md-links\\test\\folder/anotherFolder/archive_001.md'
//                           }]*/
//                         validateLinks(link)
//                             .then(outcome => {
//                                 if (Object.keys(outcome).length == 0) {
//                                     console.log('\nValidacion para: ' + element)
//                                     console.log('El archivo no contiene enlaces')
//                                 } else {
//                                     console.log('\nValidacion para: ' + element + '\n')
//                                     console.log(broken(outcome));
//                                 }
//                                 // resolve(broken(outcome));
//                                 // console.log(outcome)
//                                 // const all = [].concat(outcome);
//                                 // console.log(all);
//                                 // let newArray = [];
//                                 // // outcome.length > 0
//                                 // outcome.forEach(element => {
//                                 //     console.log(element)
//                                 //     console.log(broken([element]));
//                                 //     // if (Object.keys(outcome).length !== 0) {
//                                 //     //     resolve(broken(outcome));  // <---- casi funciona completamente
//                                 //     //     // newArray = newArray.concat(outcome);
//                                 //     //     // let otroArray = [...newArray];
//                                 //     //     // resolve(broken(otroArray));
//                                 //     // }
//                                 // })
//                                 //console.log(element); // <---------------------------------
//                                 //console.log(broken(outcome)); // <---------------------------------
//                                 // let anotherArray = [];
//                                 // outcome.forEach((item) => {
//                                 //     resolve(item);
//                                 //     //anotherArray.push(item);
//                                 //     //console.log(anotherArray);
//                                 // }
//                                 // )
//                                 // resolve(broken(outcome));
//                             })//.catch((error) => reject(error));
//                         // if (Object.keys(link).length !== 0) {
//                         //     let newArray = [];
//                         //     // newArray.push(...link);
//                         //     newArray.concat(link);
//                         //     // console.log(newArray);
//                         // }
//                     })
//             }
//             )
//         }
//         else if (option.validate === true) {
//             const ruta = getAllMdDFiles(paths)
//             ruta.forEach(e => {
//                 getLinks(e)
//                     .then((link) => {
//                         validateLinks(link)
//                             .then(elemento => {
//                                 if (Object.keys(elemento).length == 0) {
//                                     console.log('Validacion para: ' + e)
//                                     console.log('El archivo no contiene enlaces\n')
//                                 } else {
//                                     console.log('\n Validacion para: ' + e + '\n')
//                                     console.log(elemento);
//                                 }
//                             })
//                     })

//             })
//         }
//         else if (option.validate === false) {
//             const ruta = getAllMdDFiles(paths)
//             ruta.forEach(e => {
//                 // resolve(getLinks(e))
//                 getLinks(e)
//                     .then(elemento => {
//                         if (Object.keys(elemento).length == 0) {
//                             console.log('\nValidacion para: ' + e)
//                             console.log('El archivo no contiene enlaces')
//                         } else {
//                             console.log('\nValidacion para: ' + e + '\n')
//                             console.log(elemento);
//                         }
//                     })
//             })
//         }
//         else if (option.stats === true) {
//             const ruta = getAllMdDFiles(paths)
//             ruta.forEach(e => {
//                 getLinks(e)
//                     .then((elemento) => {
//                         // resolve(stats(links))
//                         if (Object.keys(elemento).length == 0) {
//                             console.log('\nValidacion para: ' + e)
//                             console.log('El archivo no contiene enlaces')
//                         } else {
//                             console.log('\nValidacion para: ' + e + '\n')
//                             console.log(stats(elemento));
//                         }
//                     })
//             })
//         }

//     })
// }
// module.exports = {
//     mdLinks,

// };
