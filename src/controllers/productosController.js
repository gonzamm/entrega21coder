const {
  getPtosService,
  getPtoIdService,
  createPtoService,
  updatePtoService,
  deletePtoService,
} = require("../services/productosService");

//Logs
const logs = require("../logs/loggers");
const loggerConsola = logs.getLogger("consola");
const loggerError = logs.getLogger("error");

//FECHA
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

//GET TODOS LOS PRODUCTOS
const getPtos = async (ctx) => {
  try {
    const response = await getPtosService();
    ctx.body = {
      status: 'sucess',
      message: response
    }
  } catch (error) {
    throw Error("Error en getPtos productosController");
  }
};

//GET PRODUCTO POR ID
const getPtoId = async (ctx) => {
  try {
    const id = ctx.params.id
    const response = await getPtoIdService(id);
    if (response.estado === "ok") {
      ctx.body = {
        status: 'sucess',
        message: response.producto
      };
    } else if (response.estado === "ptoFalse") {
      ctx.body = {
        status: 'fail',
        error: `Producto con ID ${id} no existe`
      }
    } 
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en getPtoId productosController");
  }
};

//POST CON PTO NUEVO ENVIADO POR PARAMETRO
const createPto = async (ctx) => {
  try {
    const { nombre, descripcion, codigo, thumbail, precio, stock } = ctx.request.body;
    const newObj = {
      timestamp: darFecha(),
      nombre,
      descripcion,
      codigo,
      thumbail,
      precio,
      stock,
    };
    const response = await createPtoService(newObj);
    ctx.body = {
      status: 'sucess',
      message: response
    };

  } catch (error) {
    loggerError.error(error);
    throw Error("Error en createPto productosController");
  }
};

//PUT MODIFICANDO SEGUN ID
const updatePto = async (ctx) => {
  try {
    //Armo un nuevo PTO con los datos recibidos por parametro
    const { nombre, descripcion, codigo, thumbail, precio, stock } = ctx.request.body;
    const id = ctx.params.id;
    const ptoMod = {
      id,
      timestamp: darFecha(),
      nombre,
      descripcion,
      codigo,
      thumbail,
      precio,
      stock,
    };
    const response = await updatePtoService(ptoMod, id);
    if (response.estado === "ok") {
      ctx.body = {
        status: 'sucess',
        message: response.producto
      };
    } else if (response.estado === "ptoFalse") {
      ctx.body = {
        status: 'error',
        message: `Producto con ID ${id} no existe`
      };
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en updatePto productosController");
  }
};

//DELETE SEGUN ID
const deletePto = async (ctx) => {
  try {
    const id  = ctx.params.id;
    const response = await deletePtoService(id);
    if (response.estado === "ok") {
      ctx.body = {
        status: 'sucess',
        message: response.productos
      };
    } else if (response.estado === "ptoFalse") {
      ctx.body = {
        status: 'error',
        message: `Producto con ID ${id} no existe`
      };
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en deletePto productosController");
  }
};

//EXPORT MODULO ROUTER
module.exports = {
  getPtos,
  getPtoId,
  createPto,
  updatePto,
  deletePto,
};
