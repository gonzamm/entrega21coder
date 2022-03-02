const Daos = require("../models/daos/configDb");

const productos = Daos.productos;

//Logs
const logs = require("../logs/loggers");
const loggerConsola = logs.getLogger("consola");
const loggerError = logs.getLogger("error");

//GET TODOS LOS PRODUCTOS
const getPtosService = async () => {
  try {
    const response = await productos.getAll();
    return response;
  } catch (error) {
    throw Error("Error en getPtosService");
  }
};

//GET PRODUCTO POR ID
const getPtoIdService = async (id) => {
  try {
    const ptoId = await productos.getById(id);
    //Me fijo si existe el PTO con el ID solicitado
    if (Object.keys(ptoId).length != 0) {
      //Pto con ID solicitado encontrado, envio respuesta
      return { estado: "ok", producto: ptoId };
    } else {
      //Pto con ID solicitado NO encontrado, envio error
      return { estado: "ptoFalse" };
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en getPtoIdService");
  }
};

//POST CON PTO NUEVO ENVIADO POR PARAMETRO
const createPtoService = async (newPto) => {
  try {
    const addPto = await productos.save(newPto);
    return addPto;
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en createPtoService");
  }
};

//PUT MODIFICANDO SEGUN ID
const updatePtoService = async (ptoMod, id) => {
  try {
    //Me fijo si existe el PTO con el ID solicitado
    let flag = await productos.getById(id);
    if (Object.keys(flag).length != 0) {
      //Pto con ID solicitado encontrado
      //Modifico el PTO con el ID solicitado, y envio respuesta
      const pto = await productos.update(ptoMod);
      return { estado: "ok", producto: pto };
    } else {
      //Pto con ID solicitado NO encontrado, envio error
      return { estado: "ptoFalse" };
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en put modificacion productos");
  }
};

//DELETE SEGUN ID
const deletePtoService = async (id) => {
  try {
    //Me fijo si existe el PTO con el ID solicitado
    let flag = await productos.getById(id);

    if (Object.keys(flag).length != 0) {
      //Pto con ID solicitado encontrado
      //Borro el PTO con el ID solicitado, y envio respuesta
      await productos.deleteById(id);
      const ptosAll = await productos.getAll();
      return { estado: "ok", productos: ptosAll };
    } else {
      //PTO con ID no encontrado, envio error
      return { estado: "ptoFalse" };
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en deletePtoService");
  }
};

//EXPORT MODULO ROUTER
module.exports = {
  getPtosService,
  getPtoIdService,
  createPtoService,
  updatePtoService,
  deletePtoService,
};
