const Router = require('koa-router')
const {
  getPtos,
  getPtoId,
  createPto,
  updatePto,
  deletePto,
} = require("../controllers/productosController");

const router = new Router({
  prefix: '/productos'
})

//GET TODOS LOS PRODUCTOS
router.get("/", getPtos);

//GET PRODUCTO POR ID
router.get("/:id", getPtoId);

//POST CON PTO NUEVO ENVIADO POR PARAMETRO
router.post("/", createPto);

//PUT MODIFICANDO SEGUN ID
router.put("/:id", updatePto);

//DELETE SEGUN ID
router.delete("/:id", deletePto);

//EXPORT MODULO ROUTER
module.exports = router;
