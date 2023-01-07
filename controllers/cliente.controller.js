'use strict'

var Cliente = require('../models/cliente.models');
var bcrypt = require('bcrypt-nodejs')
var jwt = require('../helpers/jwt')
const registro_cliente = async function(req,res){
    var data = req.body;
    var clientes_arr = [];
    clientes_arr = await Cliente.find({email:data.email})
    
    if (clientes_arr.length == 0){
        if(data.password){
            //encriptamos la contrasenia
            bcrypt.hash(data.password,null,null,async function(err,hash){
                // verificamos se encripto la contrasenia
                if(hash){
                    data.password = hash
                    var reg = await Cliente.create(data);
                    res.status(200).send({data:reg})
                }else{
                    res.status(200).send({message:'ErrorServer',data:undefined})
                }
            })
        }else{
            res.status(200).send({message:'No hay una contrasenia',data:undefined})
        }
        
    }else{
        res.status(200).send({message:'El correo ya existe en la BD',data:undefined})
    }

    
    
}

const login_cliente = async function(req,res){
    var data = req.body;
    var cliente_arr = [];

    cliente_arr = await Cliente.find({email:data.email})

    if(cliente_arr.length== 0){
        res.status(200).send({message: 'No se encontro el correo'})
    }else{
        //LOGIN
        let user = cliente_arr[0];

        bcrypt.compare(data.password,user.password,async function(err,check){
            if(check){
                res.status(200).send({data:user,token: jwt.createToken(user)})
                

            }else{
                res.status(200).send({message: 'Contrasenia incorrecto'})

            }
        })    
        

    }
    

}

module.exports={
    registro_cliente,
    login_cliente
}