const dotenv = require("dotenv").config();
const Koa = require('koa');
const koaBody = require('koa-body')

//Logs
const logs = require("./src/logs/loggers");
const loggerConsola = logs.getLogger("consola");
const loggerError = logs.getLogger("error");

//Start Server
const app = new Koa();
app.use(koaBody())

  //Routes
const productosRoute = require("./src/routes/productos");
app.use(productosRoute.routes());
const carritoRoute = require("./src/routes/carrito");
app.use(carritoRoute.routes());

//COMIENZO SERVIDOR
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  loggerConsola.info(`Server is run on port ${server.address().port}`)
})
server.on('error', error => loggerError.error(`Error en servidor koa: ${error}`))
