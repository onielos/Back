'use strict'

var Admin = require('../models/admin.models');
var bcrypt = require('bcrypt-nodejs')
var jwt = require('../helpers/jwt')

const registro_admin = async function(req,res){
    var data = req.body;
    var admin_arr = [];
    admin_arr = await Admin.find({email:data.email})
    
    if (admin_arr.length == 0){
        if(data.password){
            //encriptamos la contrasenia
            bcrypt.hash(data.password,null,null,async function(err,hash){
                // verificamos se encripto la contrasenia
                if(hash){
                    data.password = hash
                    var reg = await Admin.create(data);
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

const login_admin= async function(req,res){
    var data = req.body;
    var admin_arr = [];

    admin_arr = await Admin.find({email:data.email})

    if(admin_arr.length== 0){
        res.status(200).send({message: 'No se encontro el correo'})
    }else{
        //LOGIN
        let user = admin_arr[0];

        bcrypt.compare(data.password,user.password,async function(err,check){
            if(check){
                res.status(200).send({data:user, token: jwt.createToken(user)})
                

            }else{
                res.status(200).send({message: 'Contrasenia incorrecto'})

            }
        })    
        

    }
    

}

module.exports={
    registro_admin,
    login_admin
}