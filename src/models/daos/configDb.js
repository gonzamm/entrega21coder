let productosDao
let carritosDao

let contenedor = 'mongodb'
switch (contenedor) {
    case 'txt':
        const ProductosDaoArchivo = require("./productos/ProductosDaoArchivo")
        const CarritosDaoArchivo = require("./carritos/CarritoDaoArchivo")

        productosDao = new ProductosDaoArchivo()
        carritosDao = new CarritosDaoArchivo()
        break
    case 'firebase':
        const ProductosDaoFirebase = require("./productos/ProductosDaoFirebase")
        const CarritosDaoFirebase = require("./carritos/CarritosDaoFirebase")
        
        productosDao = new ProductosDaoFirebase()
        carritosDao = new CarritosDaoFirebase()
        break
    case 'mongodb':
        const ProductosDaoMongoDb = require("./productos/ProductosDaoMongoDb")
        const CarritosDaoMongoDb = require("./carritos/CarritoDaoMongoDb")

        productosDao = new ProductosDaoMongoDb();
        carritosDao = new CarritosDaoMongoDb();
        break
/*     default:
        const ProductosDaoFirebase = require("./productos/ProductosDaoFirebase")
        const CarritosDaoFirebase = require("./carritos/CarritosDaoFirebase")

        productosDao = new ProductosDaoFirebase()
        carritosDao = new CarritosDaoFirebase()
        break */
}

exports.carritos = carritosDao;
exports.productos = productosDao;
