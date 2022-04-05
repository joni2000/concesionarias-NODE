let concesionaria = require('./modulo/moduloConcesionaria');
let fs = require('fs')
let autosDB = JSON.parse(fs.readFileSync('././data/autos.json', 'utf-8'))
let personasDB = JSON.parse(fs.readFileSync('././data/personas.json', 'utf-8'))

// console.log(concesionaria.autos)
// console.log(concesionaria.buscarAuto("ABC584"))
// console.log(concesionaria.venderAuto("ZPO158"))
// console.log(concesionaria.autosParaLaVenta())
// console.log(concesionaria.autosNuevos())
// console.log(concesionaria.listaDeVentas())
//console.log(concesionaria.totalDeVentas())
// console.log(concesionaria.puedeComprar(autosDB[0], personasDB[0]))
console.log(concesionaria.autosQuePuedeComprar(personasDB[3]))