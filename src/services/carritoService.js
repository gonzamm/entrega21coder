const Daos = require("../models/daos/configDb");

//Logs
const logs = require("../logs/loggers");
const loggerConsola = logs.getLogger("consola");
const loggerError = logs.getLogger("error");

//CLASE CONTENEDORA DE CARRITO Y PRODUCTO
let carros = Daos.carritos;
let productos = Daos.productos;

//FUNCION FECHA
function darFecha() {
  const fecha = new Date();
  let fechaOK =
    fecha.getDate() +
    "/" +
    (fecha.getMonth() + 1) +
    " - " +
    fecha.getHours() +
    ":" +
    fecha.getMinutes() +
    ":" +
    fecha.getSeconds();
  return fechaOK;
}

//POST VACIO CREA UN NUEVO CARRITO
const createCarritoService = async () => {
  try {
    let carrito = {
      timestamp: darFecha(),
      productos: [],
    };
    let aux = await carros.save(carrito);
    return { id: aux.id };
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en createCarritoService");
  }
};

//POST CON ID DE PTO
const addPtoToCarritoService = async (idPto, idCarrito) => {
  try {
    //Busco el producto por ID
    let ptoId = await productos.getById(idPto);
    //Me fijo si existe el pto con el ID solicitado
    if (Object.keys(ptoId).length != 0) {
      //Pto con ID solicitado encontrado
      //Busco el carrito con el id enviado por parametro
      let carrito = await carros.getById(idCarrito);
      //Me fijo si existe el carrito con id solicitado
      if (carrito) {
        //Carrito encontrado agrego el producto
        carrito.productos.push(ptoId);
        carros.update(carrito);
        return { estado: "ok", carrito: carrito };
      }
      //Carrito no encontrado envio error
      else {
        return { estado: "carritoFalse" };
      }
    }
    //Pto no encontrado envio error
    else {
      return { estado: "ptoFalse" };
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en addPtoToCarritoService");
  }
};

//DELETE CARRITO SEGUN ID
const deleteCarritoService = async (id) => {
  try {
    //Me fijo si existe el carrito con el ID solicitado
    let flag = await carros.getById(id);
    if (Object.keys(flag).length != 0) {
      //Carritto con ID solicitado encontrado
      //Borro el carrito con el ID solicitado, y envio respuesta
      await carros.deleteById(id);
      return { estado: "ok" };
    }
    //Carro con ID no encontrado, envio error
    else {
      return { estado: "carritoFalse" };
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en deleteCarritoService");
  }
};

//DELETE DE UN PRODUCTO DE UN CARRITO SEGUN ID
const deletePtoFromCarritoService = async (idPto, idCarrito) => {
  try {
    let carritoId = await carros.getById(idCarrito);
    //Me fijo si existe el carrito con el ID solicitado
    if (Object.keys(carritoId).length != 0) {
      //Carro con ID solicitado encontrado
      //Armo un array con los productos que tiene el carro
      let ptosCarro = carritoId.productos;
      //Busco el index del producto a eliminar
      let indexPto = ptosCarro.findIndex((aux) => aux.id == idPto);
      if (indexPto >= 0) {
        //Producoto en carrito encontrado borro el producto
        carritoId.productos.splice(indexPto, 1);
        carros.update(carritoId);
        return { estado: "ok", carrito: carritoId };
      }
      //El ID de producto no esta en el carrito, envio error
      else {
        return { estado: "ptoFalse" };
      }
    }
    //No existe el carrito con id solicitado envio error
    else {
      return { estado: "carritoFalse" };
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en deletePtoFromCarritoService");
  }
};

//GET PRODUCTOS EN CARRITO POR ID
const getPtosFromCarritoService = async (id) => {
  try {
    //Busco el carrito con el id enviado por parametro
    let carrito = await carros.getById(id);
    if (carrito) {
      const ptos = carrito.productos;
      return { estado: "ok", products: ptos };
    }
    //No existe el carrito con el id solicitado, envio error
    else {
      return { estado: "carritoFalse" };
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error obteniendo en getPtosFromCarritoService");
  }
};

//GET TODOS LOS CARRITOS
const getCarritosService = async () => {
  try {
    let aux = await carros.getAll();
    return aux;
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en getCarritosService");
  }
};

//EXPORT MODULO ROUTER
module.exports = {
  createCarritoService,
  addPtoToCarritoService,
  deleteCarritoService,
  deletePtoFromCarritoService,
  getPtosFromCarritoService,
  getCarritosService,
};
