'use strict'
var Validator = require('validator');
var BCrypt = require('bcrypt-nodejs');
var Jwt = require('../services/Jwt');
var User = require('../models/User');
var MyResponse = require('../services/Utils');

var controller = {

    save: function(req, res){
        let params = req.body;

        try {
            var newUser = new User();
            newUser.email = params.email;
            newUser.password = params.password;
            newUser.image   = 'profile-default.png';
            newUser.status  = 'A';
            newUser.role    = params.role;
            newUser.person = params.personId
            newUser.save((err, result) => {
                if(err){
                    return res.status(MyResponse.CODE_ERROR).send({
                        status: MyResponse.STATUS_ERROR,
                        code: MyResponse.CODE_ERROR,
                        message: 'Ocurrio un problema al intentar registrar el usuario.',
                        define_error: 'Log (UserController.save): ' + err.message
                    });
                }

                if(!result){
                    return res.status(MyResponse.CODE_WARNING).send({
                        status: MyResponse.STATUS_WARNING,
                        code: MyResponse.CODE_WARNING,
                        message: 'No se pudo registrar el usuario. Verifique la informacion registrada.'
                    });    
                }

                return res.status(MyResponse.CODE_SUCCESS).send({
                    status: MyResponse.STATUS_SUCCESS,
                    code: MyResponse.CODE_SUCCESS,
                    message: 'Usuario registrado correctamente'
                })
            });
        } catch (error) {
            return res.status(MyResponse.CODE_ERROR).send({
                status: MyResponse.STATUS_ERROR,
                code: MyResponse.CODE_ERROR,
                message: 'No se enviar los parametros correctamente al servidor.',
                define_error: 'Log (UserController): ' + error.message
            });
        }

        
    },

    updateUser: function(req, res){
        let params = req.body;
        console.log(params);
        try {
            User.findByIdAndUpdate(req.params.id,{
                $set: params
            },(err, result) => {
                if(err){
                    return res.status(MyResponse.CODE_ERROR).send({
                        status: MyResponse.STATUS_ERROR,
                        code: MyResponse.CODE_ERROR,
                        message: 'Ocurrio un problema al intentar actualizar el usuario.',
                        define_error: 'Log (UserController.save): ' + err.message
                    });
                }

                if(!result){
                    return res.status(MyResponse.CODE_WARNING).send({
                        status: MyResponse.STATUS_WARNING,
                        code: MyResponse.CODE_WARNING,
                        message: 'No se pudo actualizar el usuario. Verifique la informacion registrada.'
                    });    
                }

                return res.status(MyResponse.CODE_SUCCESS).send({
                    status: MyResponse.STATUS_SUCCESS,
                    code: MyResponse.CODE_SUCCESS,
                    message: 'Usuario actualizado correctamente'
                })
            });
        } catch (error) {
            return res.status(MyResponse.CODE_ERROR).send({
                status: MyResponse.STATUS_ERROR,
                code: MyResponse.CODE_ERROR,
                message: 'No se enviar los parametros correctamente al servidor.',
                define_error: 'Log (UserController): ' + error.message
            });
        }

        
    },

    getMecanicos: function(req, res){
        try {
            User.find({role:"Mecanico"},(err, users) => {
                if(err){
                    return res.status(MyResponse.CODE_ERROR).send({
                        status: MyResponse.STATUS_ERROR,
                        code: MyResponse.CODE_ERROR,
                        message: 'Ocurrio un problema al traer los datos.',
                        define_error: 'Log (UserController.getUsers): ' + err.message
                    });
                }
                if(!users || users.length <= 0){
                    return res.status(MyResponse.CODE_WARNING).send({
                        status: MyResponse.STATUS_WARNING,
                        code: MyResponse.CODE_WARNING,
                        message: 'No existen usuarios registrados'
                    });
                }
                
                var activos = users.filter(function (el) {
                    return el.status == 'A';
                });

                return res.status(MyResponse.CODE_SUCCESS).send({
                    status: MyResponse.STATUS_SUCCESS,
                    code: MyResponse.CODE_SUCCESS,
                    users,
                    activeusers: activos 
                });

            })
        } catch (error) {
            return res.status(MyResponse.CODE_ERROR).send({
                status: MyResponse.STATUS_ERROR,
                code: MyResponse.CODE_ERROR,
                message: 'Ocurrio un problema en el controlador al intentar traer los usuarios.',
                define_error: 'Log (UserController.getUsers): ' + error.message
            });
        }
    },

    getUsers: function(req, res){
        try {
            User.find().populate('person').exec((err, users) => {
                if(err){
                    return res.status(MyResponse.CODE_ERROR).send({
                        status: MyResponse.STATUS_ERROR,
                        code: MyResponse.CODE_ERROR,
                        message: 'Ocurrio un problema al traer los datos.',
                        define_error: 'Log (UserController.getUsers): ' + err.message
                    });
                }
                if(!users || users.length <= 0){
                    return res.status(MyResponse.CODE_WARNING).send({
                        status: MyResponse.STATUS_WARNING,
                        code: MyResponse.CODE_WARNING,
                        message: 'No existen usuarios registrados'
                    });
                }
                
                var activos = users.filter(function (el) {
                    return el.status == 'A';
                });

                return res.status(MyResponse.CODE_SUCCESS).send({
                    status: MyResponse.STATUS_SUCCESS,
                    code: MyResponse.CODE_SUCCESS,
                    users,
                    activeusers: activos 
                });

            })
        } catch (error) {
            return res.status(MyResponse.CODE_ERROR).send({
                status: MyResponse.STATUS_ERROR,
                code: MyResponse.CODE_ERROR,
                message: 'Ocurrio un problema en el controlador al intentar traer los usuarios.',
                define_error: 'Log (UserController.getUsers): ' + error.message
            });
        }
    },

    getUser: function(req, res){
        try {
            User.findById(req.params.id,(err, user) => {
                if(err){
                    return res.status(MyResponse.CODE_ERROR).send({
                        status: MyResponse.STATUS_ERROR,
                        code: MyResponse.CODE_ERROR,
                        message: 'Ocurrio un problema al traer el usuario.',
                        define_error: 'Log (UserController.getUsers): ' + err.message
                    });
                }
                if(!user){
                    return res.status(MyResponse.CODE_WARNING).send({
                        status: MyResponse.STATUS_WARNING,
                        code: MyResponse.CODE_WARNING,
                        message: 'No existen usuarios registrados'
                    });
                }
                
                return res.status(MyResponse.CODE_SUCCESS).send({
                    status: MyResponse.STATUS_SUCCESS,
                    code: MyResponse.CODE_SUCCESS,
                    user
                });

            })
        } catch (error) {
            return res.status(MyResponse.CODE_ERROR).send({
                status: MyResponse.STATUS_ERROR,
                code: MyResponse.CODE_ERROR,
                message: 'Ocurrio un problema en el controlador al intentar traer los usuarios.',
                define_error: 'Log (UserController.getUsers): ' + error.message
            });
        }
    }

}

module.exports = controller;