'use strict'

var express = require('express')
var ProductoController = require('../controllers/Producto.controller')

var api = express.Router();

var auth = require('../middlewars/authenticate')

var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir: './uploads/productos'});

api.post('/registro_producto_admin',[auth.auth,path],ProductoController.registro_producto_admin);
api.get('/listar_productos_admin',auth.auth,ProductoController.listar_productos_admin);
api.get('/obtener_portada/:img',ProductoController.obtener_portada);
module.exports = api