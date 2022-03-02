const {
  createCarritoService,
  addPtoToCarritoService,
  deleteCarritoService,
  deletePtoFromCarritoService,
  getPtosFromCarritoService,
  getCarritosService,
} = require("../services/carritoService");

//Logs
const logs = require("../logs/loggers");
const loggerConsola = logs.getLogger("consola");
const loggerError = logs.getLogger("error");

//POST VACIO CREA UN NUEVO CARRITO
const createCarrito = async (ctx) => {
  try {
    let idCarrito = await createCarritoService();
    ctx.body = idCarrito
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en createCarrito carritoController");
  }
};

//POST CON ID DE PTO
const addPtoToCarrito = async (ctx) => {
  try {
    const { idPto, idCarrito } = ctx.params;
    const response = await addPtoToCarritoService(idPto, idCarrito);
    if (response.estado === "ok") {
      ctx.body = response.carrito;
    } else if (response.estado === "carritoFalse") {
      ctx.body = {
        status: 'error',
        message: `Carrito con ID ${idCarrito} no existe`
      }
    } else if (response.estado === "ptoFalse") {
      ctx.body = {
        status: 'error',
        message: `Producto con ID ${idPto} no existe`
      }
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en addPtoToCarrito carritoController");
  }
};

//DELETE CARRITO SEGUN ID
const deleteCarrito = async (ctx) => {
  try {
    const id = ctx.params.id;
    const response = await deleteCarritoService(id);
    if (response.estado === "ok") {
      ctx.body = {
        status: 'sucess',
        message: `Carrito con ID ${id} borrado`
      }
    } else if (response.estado === "carritoFalse") {
      ctx.body = {
        status: 'error',
        message: `Carrito con ID ${id} no existe`
      }
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en deleteCarrito carritoController");
  }
};

//DELETE DE UN PRODUCTO DE UN CARRITO SEGUN ID
const deletePtoFromCarrito = async (ctx) => {
  try {
    const { idPto, idCarrito } = ctx.params;
    const response = await deletePtoFromCarritoService(idPto, idCarrito);
    if (response.estado === "ok") {
      ctx.body = response.carrito
    } else if (response.estado === "carritoFalse") {
      ctx.body = {
        status: 'error',
        message: `Carrito con ID ${idCarrito} no existe`
      }
    } else if (response.estado === "ptoFalse") {
      ctx.body = {
        status: 'error',
        message: `Producto con ID ${idPto} no existe`
      }
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en deletePtoFromCarrito carritoController");
  }
};

//GET PRODUCTOS EN CARRITO POR ID
const getPtosFromCarrito = async (ctx) => {
  try {
    const { id } = ctx.params;
    const response = await getPtosFromCarritoService(id);

    if (response.estado === "ok") {
      ctx.body = response.products
    } else if (response.estado === "carritoFalse") {
      ctx.body = {
        status: 'error',
        message: `Carrito con ID ${id} no existe`
      }
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en getPtosFromCarrito carritoController");
  }
};

//GET TODOS LOS CARRITOS
const getCarritos = async (ctx) => {
  try {
    const response = await getCarritosService();
    ctx.body = response
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en getCarritos carritoController");
  }
};

//EXPORT MODULO ROUTER
module.exports = {
  createCarrito,
  addPtoToCarrito,
  deleteCarrito,
  deletePtoFromCarrito,
  getPtosFromCarrito,
  getCarritos,
};
