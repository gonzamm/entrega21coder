const Router = require('koa-router')
const {
  createCarrito,
  addPtoToCarrito,
  deleteCarrito,
  deletePtoFromCarrito,
  getPtosFromCarrito,
  getCarritos,
} = require("../controllers/carritoController");

const router = new Router({
  prefix: '/carrito'
})

//POST VACIO CREA UN NUEVO CARRITO
router.post("/", createCarrito);

//POST CON ID DE PTO
router.post("/:idCarrito/:idPto", addPtoToCarrito);

//DELETE CARRITO SEGUN ID
router.delete("/:id", deleteCarrito);

//DELETE DE UN PRODUCTO DE UN CARRITO SEGUN ID
router.delete(
  "/:idCarrito/:idPto",
    deletePtoFromCarrito
);

//GET PRODUCTOS EN CARRITO POR ID
router.get("/:id", getPtosFromCarrito);

//GET TODOS LOS CARRITOS
router.get("/", getCarritos);

//EXPORT MODULO ROUTER
module.exports = router;
