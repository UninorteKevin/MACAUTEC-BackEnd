'use-strict'

const Validator = require('validator');
const MyResponse = require('../services/Utils');
const Quote = require('../models/Quote');

var Service = require('../models/Service');


var Controller = {

    create: function(req, res){
        let params = req.body;

        try {
            const validate_vehicleId = !Validator.isEmpty(params.vehicle_id);
            const validate_ownerId = !Validator.isEmpty(params.owner_id);
            const validate_owner = !Validator.isEmpty(params.owner);
            const validate_service = !Validator.isEmpty(params.service);
            const validate_initialDate = !Validator.isEmpty(params.initial_date);

            if(validate_vehicleId
                && validate_ownerId
                && validate_owner
                && validate_service
                && validate_initialDate) {

                    Service.findById(params.service).exec((err, service) => {
                        if(err){
                            return res.status(MyResponse.CODE_ERROR).send({
                                status: MyResponse.STATUS_ERROR,
                                code: MyResponse.CODE_ERROR,
                                message: 'Error en el servidor al intentar obtener el servicio especificado.',
                                defie_error: 'Log (QuoteController.create): ' + err.message
                            });
                        }

                        if(!service){
                            return res.status(MyResponse.CODE_WARNING).send({
                                status: MyResponse.STATUS_WARNING,
                                code: MyResponse.CODE_WARNING,
                                message: 'No existe un servicio registrado con el ID especificado.'
                            });
                        }

                        const date_initial = new Date(Date.parse(params.initial_date));
                        if(date_initial > Date.now()){
                            
                            let newQuote = new Quote();
                            newQuote.vehicle_id = params.vehicle_id;
                            newQuote.owner_id = params.owner_id;
                            newQuote.owner = params.owner;
                            newQuote.service = params.service;

                            newQuote.save((err, success) => {
                                if(err){
                                    return res.status(MyResponse.CODE_ERROR).send({
                                        status: MyResponse.STATUS_ERROR,
                                        code: MyResponse.CODE_ERROR,
                                        message: 'Error en el servidor al intentar registrar la cita.'
                                    });
                                }
                                if(!success){
                                    return res.status(MyResponse.CODE_WARNING).send({
                                        status: MyResponse.STATUS_WARNING,
                                        code: MyResponse.CODE_WARNING,
                                        message: 'No se pudo registrar la cita. Verifique su informacion.'
                                    });
                                } else
                                    return res.status(MyResponse.CODE_SUCCESS).send({
                                        status: MyResponse.STATUS_SUCCESS,
                                        code: MyResponse.CODE_SUCCESS,
                                        message: 'Cita registrada exitosamente.'
                                    });
                            });

                        } else
                            return res.status(MyResponse.CODE_WARNING).send({
                                status: MyResponse.STATUS_WARNING,
                                code: MyResponse.CODE_WARNING,
                                message: 'La fecha y hora para la cita no es valida. Verifique la informacion.'
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
                message: 'Error en el servidor, los parametros no se enviaron correctamente.',
                define_error: 'Log (QuoteController.save): ' + error.message
            });
        }
    },

    getQuotes: function(req, res){
        try {
            Quote.find().populate('service').exec((err, list) => {
                if(err){
                    return res.status(MyResponse.CODE_ERROR).send({
                        status: MyResponse.STATUS_ERROR,
                        code: MyResponse.CODE_ERROR,
                        message: 'Error en el servidor al traer las citas registradas.',
                        defie_error: 'Log (QuoteController.getQuotes): ' + err.message
                    });
                }

                if(!list || list.length <= 0) {
                    return res.status(MyResponse.CODE_WARNING).send({
                        status: MyResponse.STATUS_WARNING,
                        code: MyResponse.CODE_WARNING,
                        message: 'No existen citas registradas.'
                    });
                }

                return res.status(MyResponse.CODE_SUCCESS).send({
                    status: MyResponse.STATUS_SUCCESS,
                    code: MyResponse.CODE_SUCCESS,
                    quotes: list
                });
            })
        } catch (error) {
            return res.status(MyResponse.CODE_ERROR).send({
                status: MyResponse.STATUS_ERROR,
                code: MyResponse.CODE_ERROR,
                message: 'Error en el servidor al intentar consultar las citas.',
                defie_error: 'Log (QuoteController.getQuotes): ' + error.message
            });
        }
    },

    searchQuotes: function(req, res){
        try {
            const search = req.params.search;
            Quote.find({$or:[{vehicle_id: search}, {owner_id: search}]}).populate('Service').exec((err, list) => {
                if(err){
                    return res.status(MyResponse.CODE_ERROR).send({
                        status: MyResponse.STATUS_ERROR,
                        code: MyResponse.CODE_ERROR,
                        message: 'Error en el servidor al traer las citas registradas.',
                        defie_error: 'Log (QuoteController.getQuotes): ' + err.message
                    });
                }

                if(!list || list.length <= 0) {
                    return res.status(MyResponse.CODE_WARNING).send({
                        status: MyResponse.STATUS_WARNING,
                        code: MyResponse.CODE_WARNING,
                        message: 'No existen citas registradas.'
                    });
                }

                return res.status(MyResponse.CODE_SUCCESS).send({
                    status: MyResponse.STATUS_SUCCESS,
                    code: MyResponse.CODE_SUCCESS,
                    quotes: list
                });
            })
        } catch (error) {
            return res.status(MyResponse.CODE_ERROR).send({
                status: MyResponse.STATUS_ERROR,
                code: MyResponse.CODE_ERROR,
                message: 'Error en el servidor al intentar buscar una cita.',
                defie_error: 'Log (QuoteController.getQuotes): ' + error.message
            });
        }
    }


}

module.exports = Controller;