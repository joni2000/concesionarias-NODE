let fs = require('fs')
let autosDB = JSON.parse(fs.readFileSync('././data/autos.json', 'utf-8'))
let escribirJSon = (arrayDataBase) => {
    fs.writeFileSync('././data/autos.json', JSON.stringify(arrayDataBase),'utf-8')
}

let concesionaria = {  //objeto consecionaria que contiene metodos
    autos: autosDB,
    buscarAuto: function(patente){
        let autoEncontrado = autosDB.find(auto => auto.patente == patente) //metodo para buscar auto por patente usando find que devuelve un solo valor
        if(autoEncontrado){
            return autoEncontrado
        }else{
            return null
        }
    },
    venderAuto: function (patente) { //metodo para cambiar de true a false o viceversa
        let auto = this.buscarAuto(patente)
        if(auto.vendido === false){
            auto.vendido = true
            escribirJSon(autosDB) //usando la funcion de escribir de la linea 3
            return auto
       }else{
           auto.vendido = false
       }
    },
    autosParaLaVenta: function() { //metodo para mostrar los autos que no esten vendidos osea que contengan false
        return this.autos.filter(auto => auto.vendido == false)
        
    },
    autosNuevos: function(){
        //reutilizando metodo de autosParalaVenta
        return this.autosParaLaVenta().filter(auto => auto.km <= 100)
    },
    listaDeVentas: function (){ //metodo para listar el monto de cada venta
        let autosVendidos = this.autos.filter(auto => auto.vendido == true);
        return autosVendidos.map(auto => auto.precio)
    },
    totalDeVentas: function (){ //metodo para calcular el total de ventas
        let vendidos = this.listaDeVentas()
        let total = vendidos.length !== 0 ? vendidos.reduce((acum, element)=> acum + element) : 0;
        return total;
    },
    puedeComprar: function(auto, persona){ //modulo para evaluar si la persona puede pagar el auto
        let cuota = auto.precio / auto.cuotas
        return auto.precio <= persona.capacidadDePagoTotal && persona.capacidadDePagoEnCuotas >= cuota; 
    },
    autosQuePuedeComprar: function(persona){ //modulo para arrojar los autos que puede comprar una determinada persona
        return this.autosParaLaVenta().filter(auto => this.puedeComprar(auto, persona))
    }

}

module.exports = concesionaria;