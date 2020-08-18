//VENDEDORAS
const vendedoras = [ "Ada" , "Grace" , "Hedy" , "Sheryl" ];

//VENTAS
const ventas = [
[ 100000000 , 4 , 2 , 2019 , 'Grace' , 'Centro' , [ 'Monitor GPRS 4000' ,
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
[ 'Monitor GPRS 4000' , 100 ]
];

//SUCURSALES
const sucursales = [ 'Centro' , 'Caballito' ];

//------------------------------------------------------------------------//
///FUNCIONES
//1 - terminado
const precioMaquina = componentes => { 
    let resultado = 0;
    let sumaComponentes = 0;
    for(let i = 0; i < componentes.length; i++){ /*Nota: Retorna todo el arreglo*/
        resultado = precios.find(componente => componente[0] == componentes[i])
        sumaComponentes += resultado[1]
        //console.log(`El precio del componente ${componentes[i]} es ${resultado[1]}`);
    }
        return sumaComponentes;
};

describe('PrecioMaquina: testea sumar el precio de los componentes y obtener el valor de cada máquina', () => { 
    test("Probando si funciona obtener precio al ingresar un array de 3 componentes", () => {
      expect(precioMaquina(['Monitor ASC 543' , 'Motherboard ASUS 1200' , 'RAM Quinston'] )).toBe(460);
    });
    test("Probando si funciona obtener precio al ingresar un array de 2 componentes", () => {
      expect(precioMaquina(['Monitor GPRS 3000' , 'Motherboard ASUS 1200'])).toBe(300);
    });
    test("Si se ingresa un sólo componente devuelve el precio del único componente", () => {
      expect(precioMaquina(['RAM Quinston Fury'])).toBe(230);
    });
    test("Si se pasa un array vacío debe arrojar cero (0)", () => {
      expect(precioMaquina([])).toBe(0);
    });
  });
  
  describe('PrecioMaquina: testeo de errores', () => { 
    test('Arroja "Error" cuando el parámetro ingresado no existe entre los datos de ventas', () => {  
      const fn = () => precioMaquina(['xIMB' , 'Monitor 7800']);
      expect(fn).toThrow(Error);
    });
    test("Arroja mensaje de 'Error' si se pasa por parámetro componentes que no existen en el catálogo de componentes", () => {
      const fn = () => precioMaquina(['CPU IMB' , 'Monitor 7800']);
      expect(fn).toThrow("El componente no existe.");
    }); 
    test("Arroja mensaje de 'Error' si el parámetro se pasa como string", () => {
      const fn = () => precioMaquina('Monitor ASC 543 Motherboard ASUS 1200');
      expect(fn).toThrow("El componente no existe.");
    });
    test("Arroja mensaje 'TypeError' si el parámetro se pasa vacío", () => {
      const fn = () => precioMaquina();
      expect(fn).toThrow(TypeError);
    });
  });



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

describe('cantidadVentasComponente: devuelve la cantidad de veces que se vendió un componente', () => { 
    test("Debe devolver la cantidad de ventas del componente", () => {
      expect(cantidadVentasComponente('RAM Quinston')).toBe(1);
    });
    test("Devuelve la cantidad de ventas del componente", () => {
      expect(cantidadVentasComponente('Monitor GPRS 3000')).toBe(3);
    });
    test("Devuelve 0 si el componente ingresado no existe en el catálogo de ventas", () => {
      expect(cantidadVentasComponente('Mouse inalámbrico JK')).toBe(0);
    });
    test("Devuelve 0 si el parámetro se pasa vacío", () => {
      expect(cantidadVentasComponente()).toBe(0);
    });
    test("Devuelve 0 si el componente ingresado se pasa como Array", () => {
      expect(cantidadVentasComponente(['RAM Quinston'])).toBe(0);
    });
  });


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

describe('ventasVendedora: devuelve el importe total de ventas de una vendedora', () => { 
    test("Devuelve el importe de la cantidad de ventas que tuvo esa vendedora", () => {
      expect(ventasVendedora('Grace')).toBe(990);
      expect(ventasVendedora('Ada')).toBe(670);
      expect(ventasVendedora('Hedy')).toBe(460);
    });
    test("Devuelve 0 si la vendedora no vendió nada", () => {
      expect(ventasVendedora('Sheryl')).toBe(0);
    });
    test("Devuelve 0 si el nombre ingresado no corresponde a ninguna vendedora de la sucursal", () => {
      expect(ventasVendedora('Jess')).toBe(0);
      });
    test("Devuelve 0 si el parámetro se ingresa como un Array", () => {
      expect(ventasVendedora(['Ada'])).toBe(0);
      });
    test("Devuelve 0 si el parámetro se ingresa vacío", () => {
      expect(ventasVendedora()).toBe(0);
    });
  });
  

//------------------------------------------------------------------------//
//4
const componenteMasVendido = () => {

    let mayor = 0;
    let componenteDeMasVentas ="";
    precios.forEach(componente => {
        console.log(`Que es lo que hay en componente[0]:`,componente[0]);
      let numero = cantidadVentasComponente(componente[0]);
      if(mayor < numero) {
        mayor = numero;
        componenteDeMasVentas = componente[0];
      }
  });
    return componenteDeMasVentas;
};

describe('componenteMasVendido: devuelve nombre del componente más vendido', () => { 
    test("Devuelve un string como el nombre de un componente", () => {
      expect(componenteMasVendido()).toBe("Monitor GPRS 3000");
    });
    // test("Devuelve 0 si el parámetro se ingresa vacío", () => {
    //   expect(ventasVendedora()).toBe(0);
    // });
});
  


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

describe('ventasSucursal: devuelve el total de ventas de la sucursal', () => { 
    test("Devuelve un número, el restulado de ventas de esa sucursal", () => {
      expect(ventasSucursal('Centro')).toBe(990);
      expect(ventasSucursal('Caballito')).toBe(1130);
    });
    test("Devuelve cero(0) si la sucursal no existe", () => {
      expect(ventasSucursal('Sur')).toBe(0);
    });
    test("Devuelve cero(0) si el nombre de la sucursal se ingresa como array", () => {
      expect(ventasSucursal(['Centro'])).toBe(0);
    });
  });
  
    
//--------------------------------------------------------------------------//
//6
const mejorVendedora = () => {
    
    let mayorVendedora;
    let mayor = 0;
    for(let i = 0; i < vendedoras.length; i++){
        if(mayor < ventasVendedora(vendedoras[i])){
            mayor = ventasVendedora(vendedoras[i]);
            mayorVendedora = vendedoras[i];
              };
            };
              return mayorVendedora;
};

describe('mejorVendedora: devuelve el nombre de la vendedora que más ingresos generó',() =>{ 
    test("Devuelve el nombre de la vendedora que más ventas generó", () => {
      expect(mejorVendedora()).toContain('Grace');
    });
}); 


//--------------------------------------------------------------------------//
//7
const ventaPromedio = () => {

    let ventasTotales = [] ;

    for(let i = 0; i < ventas.length; i++){
        let obtenerComponentes = ventas[i].slice(6);
        console.log(obtenerComponentes);
        ventasTotales.push(obtenerComponentes.flat());
           }
        console.log(ventasTotales);
        const resultado = precioMaquina(ventasTotales.flat())/ventas.length;
        return Math.floor(resultado);

};
describe('ventaPromedio: devuelve el importe promedio por venta',() =>{ 

    test("Devuelve un numero con promedio de venta", () => {
      expect(ventaPromedio()).toBe(353);
    });
  });
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
      describe('obtenerIdVenta: devuelve un nuevo aleatorio entre 999999999 y 100000000', () => { 
        test("Probando obtener un número aleatorio mayor que 100000000", () => {
          const maximo = 999999999;
          const minimo = 100000000;
          expect(obtenerIdVenta(Math.round(maximo, minimo))).toBeGreaterThan(100000000)
        });
        test("Probando obtener un número aleatorio menos que 999999999", () => {
          const maximo = 999999999;
          const minimo = 100000000;
          expect(obtenerIdVenta(Math.round(maximo, minimo))).toBeLessThanOrEqual(999999999)
        });
      });
//----------------------------------------------------------------------//
//9
const agregarVenta = (dia, mes, anio, vendedora, sucursal, componentes) => {

    let nuevaVenta = [];

    nuevaVenta.push(obtenerIdVenta(), dia, mes, anio, vendedora, sucursal, componentes);
    ventas.push(nuevaVenta);

    return nuevaVenta;
    
};

describe("Test usando beforeEach()", () => {
    beforeEach(()=> {
        ventas = []
    });
    test("Probar si agrega nueva venta a la lista de ventas", () => {
        //este expect no esta testeando nada .toBe? .toThrow?
        agregarVenta(14,8,2020, "Ada", "Caballito", [ 'Monitor ASC 543' ,'Motherboard ASUS 1200' , 'RAM Quinston' ] );
        expect(ventas.length).toBe(1); 
    });
});

