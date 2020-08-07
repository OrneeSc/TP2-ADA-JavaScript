//VENDEDORAS
const vendedoras = [ "Ada" , "Grace" , "Hedy" , "Sheryl" ];

//VENTAS
const ventas = [
[ 100000000 , 4 , 2 , 2019 , 'Grace' , 'Centro' , [ 'Monitor GPRS 3000' ,
'Motherboard ASUS 1500' ] ],
[ 100000001 , 1 , 1 , 2019 , 'Ada' , 'Centro' , [ 'Monitor GPRS 3000' ,
'Motherboard ASUS 1500' ] ],
[ 100000002 , 2 , 1 , 2019 , 'Grace' , 'Caballito' , [ 'Monitor ASC 543' ,
'Motherboard MZI' , 'HDD Toyiva' ] ],
[ 100000003 , 10 , 1 , 2019 , 'Ada' , 'Centro' , [ 'Monitor ASC 543' ,
'Motherboard ASUS 1200' ] ],
[ 100000004 , 12 , 1 , 2019 , 'Grace' , 'Caballito' , [ 'Monitor GPRS 3000' ,
'Motherboard ASUS 1200' ] ],
[ 100000005 , 21 , 3 , 2019 , 'Hedy' , 'Caballito' , [ 'Monitor ASC 543' ,
'Motherboard ASUS 1200' , 'RAM Quinston' ] ]
]

//PRECIOS
const precios = [
[ 'Monitor GPRS 3000' , 200 ],   
[ 'Motherboard ASUS 1500' , 120 ], 
[ 'Monitor ASC 543' , 250 ],
[ 'Motherboard ASUS 1200' , 100 ],
[ 'Motherboard MZI' , 30 ],
[ 'HDD Toyiva' , 90 ],
[ 'HDD Wezter Dishital' , 75 ],
[ 'RAM Quinston' , 110 ],
[ 'RAM Quinston Fury' , 230 ]
];

//SUCURSALES
const sucursales = [ 'Centro' , 'Caballito' ];

//-----------------------------------------------------------------//
///FUNCIONES
//1 - terminado
const precioMaquina = componentes => { 
    let resultado = 0;
    let sumaComponentes = 0;
    for(let i = 0; i < componentes.length; i++){ /*Nota: Retorna todo el arreglo*/
        resultado = precios.find(componente => componente[0] == componentes[i])
        sumaComponentes += resultado[1]
        console.log(`El precio del componente ${componentes[i]} es ${resultado[1]}`);
    }
        return `El total es $${sumaComponentes}`
    };

//-----------------------------------------------------------------//
//2

const cantidadVentasComponente = componente => {
    /*recibe el nombre de un componente y devuelve la cantidad de veces que fue vendido. La lista de ventas no se pasa por parámetro, se asume que está identificada por la variable ventas */
};






//-----------------------------------------------------------------//
//3
const ventasVendedora = nombre => {
    //buscar vendedoras
    const buscarVentasDeVendedora = ventas.filter(vendedora => vendedora[4] === nombre)
            console.log(buscarVentasDeVendedora); 
};
//// 
/*  const posicionVendedora = ventas.findIndex(vendedora => vendedora === "Ada")
    console.log(posicionVendedora)
    if (posicionVendedora === -1) throw new Error ("No existe vendedora");*/
    
   /* const buscarVentas = buscarNombreVendedora.filter(nombre => {
        if (nombre === "Grace" ){
            return 
        }

            console.log(filtrarPorVendedora);
    };*/

//8
const obtenerIdVenta = () => {
        let max = 999999999;
        let min = 100000000;
        const resultado = Math.random() * (max - min) + min;
        return Math.round(resultado);
      };

      //floor para abajo
      //round entero mas cercano

//-----------------------------------------------------------------//
//9
const stringConvertarray = (string) => {
    let array = string.split(",");
    return array;
};


const agregarVenta = (dia, mes, año, vendedora, sucursal, componentes) => {
    let lastID = obtenerIdVenta(); //Por ahora...Con ej 8. se utilizara lastId obtenerIdVenta()/
    let arrComp = stringConvertarray(componentes);
    let nuevaVenta = [lastID, Number(dia), Number(mes), Number(año), vendedora, sucursal, arrComp];
    console.log("Agregando venta");
    ventas.push(nuevaVenta);
    console.log("Venta agregada. La lista de ventas actualizada es:");
    console.log(ventas);
};
