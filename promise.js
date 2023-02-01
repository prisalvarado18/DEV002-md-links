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