'use-strict'

const Validator = require('validator');
const MyResponse = require('../services/Utils');
var Service = require('../models/Service');
var User = require('../models/User');

var Controller = {
    save: function(req, res){
        let params = req.body;

        try {
            const validate_name = !Validator.isEmpty(params.name);
            const validate_description = !Validator.isEmpty(params.description);
            const validate_estimatedTime = !Validator.isEmpty(params.estimated_time);
            const validate_price    = !Validator.isEmpty(params.price);

            if(validate_name
                && validate_description
                && validate_estimatedTime
                && validate_price) {
                    
                    let newService = new Service();
                    
                    newService.name = params.name;
                    newService.description = params.description;
                    newService.estimated_time = params.estimated_time;
                    newService.price = params.price;
                    newService.status = params.status;
                    newService.mecanic = params.mecanic;

                    User.findById(newService.mecanic).exec((err, mecanic) => {
                        if(err){
                            return res.status(MyResponse.CODE_ERROR).send({
                                status: MyResponse.STATUS_ERROR,
                                code: MyResponse.CODE_ERROR,
                                message: 'Error al intentar validar la informacion del mecanico.',
                                define_error: 'Log (ServiceController.save): ' + err.message
                            });
                        }

                        if(!mecanic){
                            return res.status(MyResponse.CODE_WARNING).send({
                                status: MyResponse.STATUS_WARNING,
                                code: MyResponse.CODE_WARNING,
                                message: 'No se encontro ningun usuario con el ID especificado.'
                            });
                        }

                        if(mecanic.role == 'MECANICO' || mecanic.role == 'Mecanico' || mecanic.role == 'Mecanic'){
                            newService.save((err, success) => {
                                if(err){
                                    return res.status(MyResponse.CODE_ERROR).send({
                                        status: MyResponse.STATUS_ERROR,
                                        code: MyResponse.CODE_ERROR,
                                        message: 'Error al intentar registrar el servicio.',
                                        define_error: 'Log (ServiceController.save): ' + err.message
                                    });
                                }
        
                                if(!success){
                                    return res.status(MyResponse.CODE_WARNING).send({
                                        status: MyResponse.STATUS_WARNING,
                                        code: MyResponse.CODE_WARNING,
                                        message: 'No se pudo registrar el servicio. Verifique sus datos'
                                    });
                                }
        
                                return res.status(MyResponse.CODE_SUCCESS).send({
                                    status: MyResponse.STATUS_SUCCESS,
                                    code: MyResponse.CODE_SUCCESS,
                                    message: 'Servicio registrado correctamente.'
                                });
                            });
                        } else 
                            return res.status(MyResponse.CODE_WARNING).send({
                                status: MyResponse.STATUS_WARNING,
                                code: MyResponse.CODE_WARNING,
                                message: 'El usuario no es un mecanico. valida su informacion'
                            });
                    })
                    
                } else
                    return res.status(MyResponse.CODE_WARNING).send({
                        status: MyResponse.STATUS_WARNING,
                        code: MyResponse.CODE_WARNING,
                        message: 'Faltan datos por enviar'
                    }); 

        } catch (error) {
            return res.status(MyResponse.CODE_ERROR).send({
                status: MyResponse.STATUS_ERROR,
                code: MyResponse.CODE_ERROR,
                message: 'Error en el servidor al intentar registrar el servicio.',
                define_error: 'Log (ServiceController.save): ' + error.message
            });
        }
    },

    getServices: function(req, res){
        try {
            Service.find((err, list) => {
                if(err){
                    return res.status(MyResponse.CODE_ERROR).send({
                        status: MyResponse.STATUS_ERROR,
                        code: MyResponse.CODE_ERROR,
                        message: 'Error al consultar los servicios.',
                        define_error: 'Log (ServiceController.getServices): ' + err.message
                    });
                }

                if(!list || list.length <= 0){
                    return res.status(MyResponse.CODE_WARNING).send({
                        status: MyResponse.STATUS_WARNING,
                        code: MyResponse.CODE_WARNING,
                        message: 'No existen ningun servicio registrado.'
                    });
                }

                return res.status(MyResponse.CODE_SUCCESS).send({
                    status: MyResponse.STATUS_SUCCESS,
                    code: MyResponse.CODE_SUCCESS,
                    services: list
                });
            })
        } catch (error) {
            return res.status(MyResponse.CODE_ERROR).send({
                status: MyResponse.STATUS_ERROR,
                code: MyResponse.CODE_ERROR,
                message: 'Error en el servidor al intentar consultar los servicios.',
                define_error: 'Log (ServiceController.getServices): ' + error.message
            });
        }
    },

    getService: function(req, res){
        try {
            const id = req.params.serviceId;
            Service.findById({_id: id}).populate('mecanic').exec((err, service) => {
                if(err){
                    return res.status(MyResponse.CODE_ERROR).send({
                        status: MyResponse.STATUS_ERROR,
                        code: MyResponse.CODE_ERROR,
                        message: 'Error al intentar consultar el servicio.',
                        define_error: 'Log (ServiceController): ' + err.message
                    });
                }

                if(!service){
                    return res.status(MyResponse.CODE_WARNING).send({
                        status: MyResponse.STATUS_WARNING,
                        code: MyResponse.CODE_WARNING,
                        message: 'No existe un servicio con el ID especificado.'
                    });
                }

                return res.status(MyResponse.CODE_SUCCESS).send({
                    status: MyResponse.STATUS_SUCCESS,
                    code: MyResponse.CODE_SUCCESS,
                    service
                });
            });
        } catch (error) {
            return res.status(MyResponse.CODE_ERROR).send({
                status: MyResponse.STATUS_ERROR,
                code: MyResponse.CODE_ERROR,
                message: 'Error en el servidor al intentar consultar el servicio con el ID especificado.',
                define_error: 'Log (ServiceController.getService): ' + error.message
            });
        }
    },

    getServiceByName: function(req, res){
        try {
            const id = req.params.serviceName;
            Service.findOne({name: id}).exec((err, service) => {
                if(err){
                    return res.status(MyResponse.CODE_ERROR).send({
                        status: MyResponse.STATUS_ERROR,
                        code: MyResponse.CODE_ERROR,
                        message: 'Error al intentar consultar el servicio.',
                        define_error: 'Log (ServiceController): ' + err.message
                    });
                }

                if(!service){
                    return res.status(MyResponse.CODE_WARNING).send({
                        status: MyResponse.STATUS_WARNING,
                        code: MyResponse.CODE_WARNING,
                        message: 'No existe un servicio con el ID especificado.'
                    });
                }

                return res.status(MyResponse.CODE_SUCCESS).send({
                    status: MyResponse.STATUS_SUCCESS,
                    code: MyResponse.CODE_SUCCESS,
                    service
                });
            });
        } catch (error) {
            return res.status(MyResponse.CODE_ERROR).send({
                status: MyResponse.STATUS_ERROR,
                code: MyResponse.CODE_ERROR,
                message: 'Error en el servidor al intentar consultar el servicio con el ID especificado.',
                define_error: 'Log (ServiceController.getService): ' + error.message
            });
        }
    },

    updateService: function(req, res){
        var id = req.params.serviceId;
        let params = req.body;

        try {
            const validate_name = !Validator.isEmpty(params.name);
            const validate_description = !Validator.isEmpty(params.description);
            const validate_estimatedTime = !Validator.isEmpty(params.estimated_time);
            const validate_price    = !Validator.isEmpty(params.price);

            if(validate_name
                && validate_description
                && validate_estimatedTime
                && validate_price) {
                    
                    let newService = new Service();
                    
                    newService._id = id;
                    newService.name = params.name;
                    newService.description = params.description;
                    newService.estimated_time = params.estimated_time;
                    newService.price = params.price;
                    newService.status = params.status;
                    newService.mecanic_id = params.mecanic_id;

                    User.findById(newService.mecanic_id).exec((err, mecanic) => {

                        if(err){
                            return res.status(MyResponse.CODE_ERROR).send({
                                status: MyResponse.STATUS_ERROR,
                                code: MyResponse.CODE_ERROR,
                                message: 'Error al intentar validar la informacion del mecanico.',
                                define_error: 'Log (ServiceController.save): ' + err.message
                            });
                        }

                        if(!mecanic){
                            return res.status(MyResponse.CODE_WARNING).send({
                                status: MyResponse.STATUS_WARNING,
                                code: MyResponse.CODE_WARNING,
                                message: 'No se encontro ningun usuario con el ID especificado.'
                            });
                        }

                        //Se valida si es ROL mecanico y se modifica el servicio
                        if(mecanic.role == 'MECANICO' || mecanic.role == 'Mecanico' || mecanic.role == 'Mecanic'){
                            Service.updateOne({_id: id}, newService).exec((err, success) => {
                                if(err){
                                    return res.status(MyResponse.CODE_ERROR).send({
                                        status: MyResponse.STATUS_ERROR,
                                        code: MyResponse.CODE_ERROR,
                                        message: 'Error al intentar modificar el servicio.',
                                        define_error: 'Log (ServiceController.save): ' + err.message
                                    });
                                }
        
                                if(!success){
                                    return res.status(MyResponse.CODE_WARNING).send({
                                        status: MyResponse.STATUS_WARNING,
                                        code: MyResponse.CODE_WARNING,
                                        message: 'No se pudo modificar el servicio. Verifique sus datos'
                                    });
                                }
        
                                return res.status(MyResponse.CODE_SUCCESS).send({
                                    status: MyResponse.STATUS_SUCCESS,
                                    code: MyResponse.CODE_SUCCESS,
                                    message: 'Se ha modificado el servicio correctamente.'
                                });
                            });
                        } else
                            return res.status(MyResponse.CODE_WARNING).send({
                                status: MyResponse.STATUS_WARNING,
                                code: MyResponse.CODE_WARNING,
                                message: 'El usuario no es un mecanico. valida su informacion'
                            });
                    });
                    
                } else
                    
                return res.status(MyResponse.CODE_WARNING).send({
                    status: MyResponse.STATUS_WARNING,
                    code: MyResponse.CODE_WARNING,
                    message: 'Faltan datos por enviar'
                });
            

        } catch (error) {
            return res.status(MyResponse.CODE_ERROR).send({
                status: MyResponse.STATUS_ERROR,
                code: MyResponse.CODE_ERROR,
                message: 'Error en el servidor al intentar modificar el servicio.',
                define_error: 'Log (ServiceController.save): ' + error.message
            });
        }
    },
}

module.exports = Controller;

