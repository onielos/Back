'use strict'

var Etiqueta = require('../models/Etiqueta.model')

const listar_etiquetas_admin = async function(req,res){
    if(req.user){
        var reg = await Etiqueta.find();
        res.status(200).send({data:reg});
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const eliminar_etiqueta_admin = async function(req,res){
    if(req.user){
        var id = req.params['id'];

        let reg = await Etiqueta.findByIdAndRemove({_id:id});
        res.status(200).send({data:reg});
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const agregar_etiqueta_admin = async function(req,res){
    if(req.user){
        try {
            let data = req.body;

            data.slug = data.titulo.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');;
            var reg = await Etiqueta.create(data);
            res.status(200).send({data:reg});
        } catch (error) {
            res.status(200).send({data:undefined,message:'Etiqueta ya existente'});
            
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

module.exports={
    listar_etiquetas_admin,
    eliminar_etiqueta_admin,
    agregar_etiqueta_admin
}