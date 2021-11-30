'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');
const ServerEnum = require('../controllers/enum/serverEnum');
var secret = 'clave-secreta-para-generar-token-macautec-api'
exports.authenticated = function(req, res, next){

    //COMPROBAR SI LLEGA LA AUTORIZACION
    if(!req.headers.authorization){
        return res.status(ServerEnum.CODE_WARNING_SERVER).send({
            status: ServerEnum.WARNING_SERVER,
            code: ServerEnum.CODE_WARNING_SERVER,
            message: 'La peticion no contiene la cabecera de authorization (Autorizar la peticion).'
        });
    }

    //LIMPIAR EL TOKEN Y QUITAR COMILLAS
    var token = req.headers.authorization.replace(/['"']+/g, '');

    //DECODIFICAR EL TOKEN 
    try {
        var payLoad = jwt.decode(token, secret);

        //COMPROBAR QUE NO HA EXPIRADO
        if(payLoad.exp <= moment().unix()){
            return res.status(404).send({message: 'El token ha expirado'});
        }
    } catch (ex) {
        return res.status(404).send({message: 'El token no es valido'});
    }

    //AJUNTAR TOKEN A LA PETICION
    req.user = payLoad;

    next();
}