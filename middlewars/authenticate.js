'use strict'

var jwt = require('jwt-simple')
var moment = require('moment')
var secret = 'onielespinal'

exports.auth = function (req, res, next) {

    if (!req.headers.authorization) {
        res.status(403).send({ message: 'NoHeadersError' })
    }

    var token = req.headers.authorization.replace(/['"]+/g, '')

    var segment = token.split('.')

    if (segment.length != 3) {
        res.status(403).send({ message: 'Invalid Token' })
    } else {
        try {
            var payload = jwt.decode(token,secret);
            if(payload.exp <= moment().unix()){
                res.status(403).send({ message: 'Token Expirado' })
            }
        } catch (error) {
            res.status(403).send({ message: 'NoHeadersError' })
        }
    }

    req.user = payload;
    

    next();
}