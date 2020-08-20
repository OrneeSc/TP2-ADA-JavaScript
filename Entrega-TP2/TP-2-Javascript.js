//AARAY VENDEDORAS
const vendedoras = [ "Ada" , "Grace" , "Hedy" , "Sheryl" ];

//ARRAY VENTAS
const ventas = [
[ 100000000 , 4 , 2 , 2019 , 'Grace' , 'Centro' , [ 'Monitor GPRS 3000' ,
'Motherboard ASUS 1500' ] ],
[ 100000001 , 1 , 1 , 2019 , 'Ada' , 'Centro' , [ 'Monitor GPRS 3000' ,
'Motherboard ASUS 1500' ] ],
[ 100000002 , 2 , 1 , 2019 , 'Grace' , 'Caballito' , [ 'Monitor ASC 543' ,
'Motherboard MZI' , 'HDD Toyiva' ] ],
[ 100000003 , 10 , 1 , 2019 , 'Ada' , 'Centro' , [ 'Monitor ASC 543' ,
'Monitor ASC 543' ] ],
[ 100000004 , 12 , 1 , 2019 , 'Grace' , 'Caballito' , [ 'Monitor GPRS 3000' ,
'Motherboard ASUS 1200' ] ],
[ 100000005 , 21 , 3 , 2019 , 'Hedy' , 'Caballito' , [ 'Monitor ASC 543' ,
'Motherboard ASUS 1200' , 'RAM Quinston' ] ]
]

// ARRAY PRECIOS
const precios = [
[ 'Monitor GPRS 3000' , 200 ],   
[ 'Motherboard ASUS 1500' , 120 ], 
[ 'Monitor ASC 543' , 250 ],
[ 'Motherboard ASUS 1200' , 100 ],
[ 'Motherboard MZI' , 30 ],
[ 'HDD Toyiva' , 90 ],
[ 'HDD Wezter Dishital' , 75 ],
[ 'RAM Quinston' , 110 ],
[ 'RAM Quinston Fury' , 230 ],
[ 'Monitor GPRS 4000' , 100 ]
];

//ARRAY SUCURSALES
const sucursales = [ 'Centro' , 'Caballito' ];

//------------------------------------------------------------------------//
///FUNCIONES
//1 
const precioMaquina = componentes => { 
    let resultado = 0;
    let sumaComponentes = 0;
  
    for(let i = 0; i < componentes.length; i++){
        if(componentes[i] === Number) throw new Error ("El componente no existe.");
        resultado = precios.find(componente => componente[0] === componentes[i]);
        if(!resultado) throw new Error ("El componente no existe.");      
        sumaComponentes += resultado[1];
    }
    return sumaComponentes
  };
//-----------------------------------------------------------------------//
//2

const cantidadVentasComponente = componente => {

        let totalVentas = 0;
        for (let i = 0; i < ventas.length; i++) {
            let venta = ventas[i].flat();
            if(venta.includes(componente)) {
                totalVentas+= 1;
            }     
        }
        return totalVentas
};

//-----------------------------------------------------------------------//
//3
const ventasVendedora = nombre => {
    //buscar vendedoras
    const buscarVentasDeVendedora = ventas.filter(vendedora => vendedora[4] === nombre)
            //console.log(buscarVentasDeVendedora); 

    let resultadoVentasVendedora = [] ;

    for(let i = 0; i < buscarVentasDeVendedora.length; i++){
            let obtenerComponentes = buscarVentasDeVendedora[i].slice(6);
            //console.log(obtenerComponentes);
            resultadoVentasVendedora.push(obtenerComponentes.flat());
        }
        //console.log(resultadoVentasVendedora);
        return precioMaquina(resultadoVentasVendedora.flat());
};

//------------------------------------------------------------------------//
//4
const componenteMasVendido = () => {

    let mayor = 0;
    let componenteDeMasVentas ="";
    precios.forEach(componente => {
      let numero = cantidadVentasComponente(componente[0]);
      if(mayor < numero) {
        mayor = numero;
        componenteDeMasVentas = componente[0];
      }
  });
    return componenteDeMasVentas;
  };

//-------------------------------------------------------------------------//  
//5 // no nos da el mismo resultado que fede
const ventasSucursal = sucursal => {
    const buscarSucursal = ventas.filter(sucursales => sucursales[5] === sucursal)
    console.log(buscarSucursal); 

    let resultadoComponentes = [] ;

    for(let i = 0; i < buscarSucursal.length; i++){
        let obtenerComponentes = buscarSucursal[i].slice(6);
        console.log(obtenerComponentes);
        resultadoComponentes.push(obtenerComponentes.flat());
           }
        console.log(resultadoComponentes);
        return precioMaquina(resultadoComponentes.flat());
    };
//--------------------------------------------------------------------------//
//6
//6 - función - ERROR MUY RARO EN EL TEST (!!)
const mejorVendedora = () => {
    
    let mayorVendedora = "hola?";
    let mayor = 0;
    vendedoras.forEach(comp => {
        if(ventasVendedora(comp)>mayor) {
            mayor=ventasVendedora(comp);
            mayorVendedora=comp;
        }
    });

    //for(let i = 0; i < vendedoras.length; i++){
    //    if(mayor < ventasVendedora(vendedoras[i])){
    //        mayor = ventasVendedora(vendedoras[i]);
    //        mayorVendedora = vendedoras[i];
    //    }
    //};
    return mayorVendedora;
  };
//--------------------------------------------------------------------------//
//7 - ERROR MUY RARO EN EL TEST (!!)
const ventaPromedio = () => {

    let porComponentes = [] ;

    for(let i = 0; i < ventas.length; i++){
        let obtenerComponentes = ventas[i].slice(6);
        porComponentes.push(obtenerComponentes.flat());
    }

    const resultado = precioMaquina(porComponentes.flat())/ventas.length;
    console.log(`El resultado del promedio de ventas es:`,resultado);
    return Math.round(resultado);

};
//------------------------------------------------------------------------//

//8
const obtenerIdVenta = () => {
        let max = 999999999;
        let min = 100000000;
        const resultado = Math.random() * (max - min) + min;
        return Math.round(resultado);
      };

      //floor para abajo
      //round entero mas cercano

//----------------------------------------------------------------------//
//9
const agregarVenta = (dia, mes, anio, vendedora, sucursal, componentes) => {

    let nuevaVenta = [];

    nuevaVenta.push(obtenerIdVenta(), dia, mes, anio, vendedora, sucursal, componentes);
    ventas.push(nuevaVenta);

    return nuevaVenta;
    
};


