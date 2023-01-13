'use strict'

var express = require('express')
var EtiquetaController = require('../controllers/Etiqueta.controller')

var api = express.Router();

var auth = require('../middlewars/authenticate')

api.get('/listar_etiquetas_admin',auth.auth,EtiquetaController.listar_etiquetas_admin);
api.delete('/eliminar_etiqueta_admin/:id',auth.auth,EtiquetaController.eliminar_etiqueta_admin);
api.post('/agregar_etiqueta_admin',auth.auth,EtiquetaController.agregar_etiqueta_admin);
module.exports = api;