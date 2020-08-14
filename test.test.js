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

//3 TEST investigar lo del before

test("Probar si filtra vendedora", () => {
    const ventasVendedora = nombre => {
        const buscarVentasDeVendedora = ventas.filter(vendedora => vendedora[4] === nombre)
        }
       expect(ventasVendedora("Ada")).toBe(
            [100000001, 1, 1, 2019, "Ada", "Centro",["Monitor GPRS 3000", "Motherboard ASUS 1500"]] /*sin coma */
            [100000003, 10, 1, 2019, "Ada", "Centro",["Monitor ASC 543", "Motherboard ASUS 1200"]])
        });

test("Probar si filtra vendedora que no existe", () => {
    const ventasVendedora = nombre => {
        const buscarVentasDeVendedora = ventas.filter(vendedora => vendedora[4] === nombre)    
        expect(ventasVendedora("Orne")).toBe()
    }
});

//9

test("Probar si agrega nueva venta junto a la funcion de obtener ID", () => {

    const obtenerIdVenta = () => {
        let max = 999999999;
        let min = 100000000;
        const resultado = Math.random() * (max - min) + min;
        return Math.round(resultado);
      };

    const agregarVenta = (dia, mes, anio, vendedora, sucursal, componentes) => {

        let nuevaVenta = [];
    
        nuevaVenta.push(obtenerIdVenta(), dia, mes, anio, vendedora, sucursal, componentes);
        ventas.push(nuevaVenta)
    }
    expect(agregarVenta(obtenerIdVenta(), 14,8,2020, "Ada", "Caballito", [[ 'Monitor ASC 543' ,
    'Motherboard ASUS 1200' , 'RAM Quinston' ]] ))
});


