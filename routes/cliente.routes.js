'use strict'

var express = require('express')
var clienteController = require('../controllers/cliente.controller')

var api = express.Router();

var auth = require('../middlewars/authenticate')
api.post('/registro_cliente_tienda',clienteController.registro_cliente_tienda);
api.post('/registro_cliente', clienteController.registro_cliente);
api.post('/login_cliente',clienteController.login_cliente)
api.get('/listar_clientes_tienda',auth.auth,clienteController.listar_clientes_tienda);
module.exports = api;