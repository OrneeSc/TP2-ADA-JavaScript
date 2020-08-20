//ARRAY VENDEDORAS
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

// ARRAY SUCURSALES
const sucursales = [ 'Centro' , 'Caballito' ];

//------------------------------------------------------------------------//

/////////////////////////////FUNCIONES Y TESTS/////////////////////////////

//1 - función
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

//1 - test
describe("PrecioMaquina: testea sumar el precio de los componentes y obtener el valor de cada máquina", () => { 
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
//2 - función
const cantidadVentasComponente = componente => {

        let totalVentas = 0;
        for (let i = 0; i < ventas.length; i++) {
            let venta = ventas[i].flat();
            if(venta.includes(componente)) {
                totalVentas+= 1;
            };    
        };
        return totalVentas
};

//2 - test
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
//3 - función
const ventasVendedora = nombre => {
  const filtrarPorVendedora = ventas.filter(vendedora => vendedora.includes(nombre));

  let losComponentes =[];
    
  for (let i = 0;  i < filtrarPorVendedora.length; i++) {
    let obtenerComponentes = filtrarPorVendedora[i].slice(6);
    losComponentes.push(obtenerComponentes.flat()); 
   }
   return precioMaquina(losComponentes.flat()); 
};

// 3 - test
describe('ventasVendedora: devuelve el importe total de ventas de una vendedora', () => { 
    test("Devuelve el importe de la cantidad de ventas que tuvo esa vendedora", () => {
      expect(ventasVendedora('Grace')).toBe(990);
      expect(ventasVendedora('Ada')).toBe(820);
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
//4 - función
const componenteMasVendido = () => {

  let mayor = 0;
  let numero = 0;
  let componenteDeMasVentas ="";
  precios.forEach(componente => {
    numero = cantidadVentasComponente(componente[0]);
    if(mayor < numero) {
      mayor = numero;
      componenteDeMasVentas = componente[0];
    }
  });
  return componenteDeMasVentas;
};
//4 - test
describe('componenteMasVendido: devuelve nombre del componente más vendido', () => { 
    test("Devuelve un string como el nombre de un componente", () => {
      expect(componenteMasVendido()).toBe("Monitor GPRS 3000");
    });
});
  


//-------------------------------------------------------------------------//  
//5 -función (no nos da el mismo resultado que fede)
const ventasSucursal = sucursal => {
  const filtrarPorSucursal = ventas.filter(venta => venta.includes(sucursal));

  let porSucursal = [];
    
  for (let i = 0;  i < filtrarPorSucursal.length; i++) {
      let obtenerComponentes = filtrarPorSucursal[i].splice(6);
      porSucursal.push(obtenerComponentes.flat());  
   }
   return precioMaquina(porSucursal.flat());
};

//5 - test
describe('ventasSucursal: devuelve el total de ventas de la sucursal', () => { 
    test("Devuelve un número, el restulado de ventas de esa sucursal", () => {
    expect(ventasSucursal('Centro')).toBe(1140);
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
//6 - función - ERROR MUY RARO EN EL TEST (!!)
const mejorVendedora = () => {
    
  let mayorVendedora = "hola?";
  let mayor = 0;

  vendedoras.forEach(comp => {
      if(ventasVendedora(comp) > mayor) {
          mayor = ventasVendedora(comp);
          mayorVendedora = comp;
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
//6 - test
describe('mejorVendedora: devuelve el nombre de la vendedora que más ingresos generó',() =>{ 
    test("Devuelve el nombre de la vendedora que más ventas generó", () => {
    expect(mejorVendedora()).toBe("Grace");
    });
}); 

/*Nota:*/ /*El error de este TEST es *muy raro*. En el programa funciona bien, 'return mayorVendedora' devuelve
correctamente "Grace"-Pero en el test devuelve directamente 'hola?' como si no pudiera entrar al 'forEach(..)' (¿?) */

//--------------------------------------------------------------------------//
//7 - función - ERROR MUY RARO EN EL TEST (!!)
const ventaPromedio = () => {

  let porComponentes =[];
  
  for (let i = 0;  i < ventas.length; i++) {
    let obtenerComponentes = ventas[i].slice(6);
    porComponentes.push(obtenerComponentes.flat()); 
  } 
   
  const resultado = precioMaquina(porComponentes.flat()) / ventas.length;
  return Math.round(resultado);

};
/*Nota:*/ /*Sucede lo mismo que con "mejorVendedora()", en este caso 'resultado' arroja el valor "0" en el test 
y en consola arroja el valor "378"
pero a diferencia del anterior, si declarams al incio "let resultado = 5;" no arroja "5" y sigue arrojando "0" (¿?)*/


//7 - test
describe('ventaPromedio: devuelve el importe promedio por venta',() =>{ 

    test("Devuelve un numero con promedio de venta", () => {
    expect(ventaPromedio()).toBe(378);
    });
  });
//------------------------------------------------------------------------//

//8 - función
const obtenerIdVenta = () => {
  const maximo = 999999999;
  const minimo = 100000000;
  let idAleatorio = Math.random() * (maximo - minimo) + minimo;
    
  return Math.round(idAleatorio);
};

//8 - test
describe("obtenerIdVenta: devuelve un nuevo aleatorio entre 999999999 y 100000000", () => { 
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
//9 - función
const agregarVenta = (dia, mes, anio, vendedora, sucursal, componentes) => {

  let nuevaVenta = [];

  nuevaVenta.push(obtenerIdVenta(), dia, mes, anio, vendedora, sucursal, componentes);
  ventas.push(nuevaVenta);

  return nuevaVenta;
    
};

//9 - test
test("Probar si agrega nueva venta a la lista de ventas", () => {
    agregarVenta(14,8,2020, "Ada", "Caballito", [ 'Monitor ASC 543' ,'Motherboard ASUS 1200' , 'RAM Quinston' ] );
expect(ventas.length).toBe(7); 
    });

