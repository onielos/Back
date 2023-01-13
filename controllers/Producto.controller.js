'use strict'
var Producto = require('../models/Producto.model')
var Etiqueta = require ('../models/Etiqueta.model')
var Producto_etiqueta = require('../models/Producto_etiqueta')

var fs = require('fs');
var path = require('path');
const registro_producto_admin = async function(req,res){
    if(req.user){
        let data = req.body;
  
        let productos = await Producto.find({titulo:data.titulo});
        
        let arr_etiquetas = JSON.parse(data.etiquetas);

        if(productos.length == 0){
            var img_path = req.files.portada.path;
            var name = img_path.split('\\');
            var portada_name = name[2];

            data.slug = data.titulo.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
            data.portada = portada_name;
            let reg = await Producto.create(data);

            if(arr_etiquetas.length >= 1){
                for(var item of arr_etiquetas){
                    await Producto_etiqueta.create({
                        etiqueta: item.etiqueta,
                        producto: reg._id,
                    });
                }
            }

            res.status(200).send({data:reg});
        }else{
            res.status(200).send({data:undefined, message: 'El título del producto ya existe'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const listar_productos_admin = async function(req,res){
    if(req.user){
        var productos = await Producto.find();
        res.status(200).send({data:productos});
    }else{
        res.status(500).send({message: 'NoAccess'});
    } 
}

const obtener_portada = async function(req,res){
    var img = req.params['img'];


    fs.stat('./uploads/productos/'+img, function(err){
        if(!err){
            let path_img = './uploads/productos/'+img;
            res.status(200).sendFile(path.resolve(path_img));
        }else{
            let path_img = './uploads/default.jpg';
            res.status(200).sendFile(path.resolve(path_img));
        }
    })
}

module.exports={
    registro_producto_admin,
    listar_productos_admin,
    obtener_portada
}
