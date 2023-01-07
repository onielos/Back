'use strict'

var express = require('express')
var clienteController = require('../controllers/cliente.controller')

var api = express.Router();
api.post('/registro_cliente', clienteController.registro_cliente);
api.post('/login_cliente',clienteController.login_cliente)

module.exports = api;