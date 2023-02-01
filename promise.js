const { getLinks, validateLinks, reportStats, reportbrokenLinks, getAllMdDFiles } = require('./index.js')

// mdLinks(path, options)
const mdLinks = (path, options) => {
    return new Promise((resolve, reject) => {
        if (options[0] === undefined && options[1] === undefined) {
            console.log('You have not entered any option')
            console.log('You have not entered any path')
            const pathname = getAllMdDFiles(path)
            pathname.forEach(element => {
                // resolve(getLinks(e))
                getLinks(element)
                    .then(item => {
                        resolve(item);
                        if (Object.keys(item).length == 0) {
                            console.log('\nValidation for: ' + element)
                            console.log('El archivo no contiene enlaces')
                        } else {
                            console.log('\nValidation for: ' + element + '\n')
                            console.log(item);
                        }
                    }).catch((error) => reject(error));
            })
        } else {
            if ((options[0] === '--validate' && options[1] === '--stats') || (options[0] === '--stats' && options[1] === '--validate')) {
                console.log('Ingresaste --validate y --stats');
                console.log(path)
                const pathname = getAllMdDFiles(path);
                pathname.forEach(element => {
                    getLinks(element)
                        .then((link) => {
                            validateLinks(link)
                                .then(outcome => {
                                    resolve(reportbrokenLinks(outcome));
                                    if (Object.keys(outcome).length == 0) {
                                        console.log('\nValidation for: ' + element)
                                        console.log('El archivo no contiene enlaces')
                                    } else {
                                        console.log('\nValidation for: ' + element + '\n')
                                        console.log(reportbrokenLinks(outcome));
                                    }
                                }).catch((error) => reject(error));
                        })
                })
            } else if (options[0] === '--validate') {
                console.log('Ingresaste es validate');
                console.log(path)
                const pathname = getAllMdDFiles(path)
                pathname.forEach(e => {
                    getLinks(e)
                        .then((link) => {
                            validateLinks(link)
                                .then(elemento => {
                                    resolve(elemento);
                                    if (Object.keys(elemento).length == 0) {
                                        console.log('Validation for: ' + e)
                                        console.log('El archivo no contiene enlaces\n')
                                    } else {
                                        console.log('\nValidation for: ' + e + '\n')
                                        console.log(elemento);
                                    }
                                }).catch((error) => reject(error));
                        })

                })
            } else if (options[0] === '--stats') {
                console.log('Ingresaste --stats')
                console.log(path);
                const pathname = getAllMdDFiles(path)
                pathname.forEach(e => {
                    getLinks(e)
                        .then((elemento) => {
                            resolve(reportStats(elemento))
                            if (Object.keys(elemento).length == 0) {
                                console.log('\nValidation for: ' + e)
                                console.log('El archivo no contiene enlaces')
                            } else {
                                console.log('\nValidation for: ' + e + '\n')
                                console.log(reportStats(elemento));
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