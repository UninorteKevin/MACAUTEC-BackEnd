'use-strict'

var Person = require('../models/Person');
var Validator = require('validator');
var MyResponse = require('../services/Utils');

var Controller = {

    save: function(req, res){
        var params = req.body;

        try {
            const validate_identity = !Validator.isEmpty(params.identity);
            const validate_names    =   !Validator.isEmpty(params.names);
            const validate_surname1 = !Validator.isEmpty(params.surname_1);
            const validate_surname2    = !Validator.isEmpty(params.surname_2);
            const validate_birthDate   = !Validator.isEmpty(params.birth_date);

            if(validate_identity
                && validate_names
                && validate_surname1
                && validate_surname2
                && validate_birthDate) {

                    let newPerson = new Person();
                    newPerson.identity= params.identity;
                    newPerson.names= params.names;
                    newPerson.surname_1= params.surname_1;
                    newPerson.surname_2= params.surname_2;
                    newPerson.birth_date= params.birth_date;
                    newPerson.phone = params.phone,
                    newPerson.location= params.location

                    newPerson.save((err, success) => {
                        if(err){
                            return res.status(MyResponse.CODE_ERROR).send({
                                status: MyResponse.STATUS_ERROR,
                                code: MyResponse.CODE_ERROR,
                                message: 'Ocurrio un problema al intentar registrar la persona.',
                                define_error: 'Log (PeopleController.save): ' + err.message
                            });
                        }

                        if(!success){
                            return res.status(MyResponse.CODE_WARNING).send({
                                status: MyResponse.STATUS_WARNING,
                                code: MyResponse.CODE_WARNING,
                                message: 'No se pudo registrar la persona.'
                            });
                        }

                        return res.status(MyResponse.CODE_SUCCESS).send({
                            status: MyResponse.STATUS_SUCCESS,
                            code: MyResponse.CODE_SUCCESS,
                            message: 'Persona registrada correctamente'
                        })
                    })

                    
                } else {

                    return res.status(MyResponse.CODE_WARNING).send({
                        status: MyResponse.STATUS_WARNING,
                        code: MyResponse.CODE_WARNING,
                        message: 'Lo sentimos, faltan datos por enviar.'
                    });

                }
        } catch (error) {
            return res.status(MyResponse.CODE_ERROR).send({
                status: MyResponse.STATUS_ERROR,
                code: MyResponse.CODE_ERROR,
                message: 'No se enviaron los parametros correctamente al servidor.',
                define_error: 'Log (PeopleController.save): ' + error.message
            })
        }

    },

    getPersons: function(req, res){
        try {
            Person.find((err, persons) => {
                if(err){
                    return res.status(MyResponse.CODE_ERROR).send({
                        status: MyResponse.STATUS_ERROR,
                        code: MyResponse.CODE_ERROR,
                        message: 'No se pudieron obtener las personas registradas',
                        define_error: 'Log (PeopleController.getPeoples): ' + error.message
                    });
                }

                if(!persons || persons.length <= 0){
                    return res.status(MyResponse.CODE_WARNING).send({
                        status: MyResponse.STATUS_WARNING,
                        code: MyResponse.CODE_WARNING,
                        message: 'No existen personas registradas.'
                    });
                }

                return res.status(MyResponse.CODE_SUCCESS).send({
                    status: MyResponse.STATUS_SUCCESS,
                    code: MyResponse.CODE_SUCCESS,
                    persons
                });
            });
        } catch (error) {
            return res.status(MyResponse.CODE_ERROR).send({
                status: MyResponse.STATUS_ERROR,
                code: MyResponse.CODE_ERROR,
                message: 'Error al obtener los datos en el servidor.',
                define_error: 'Log (PeopleController.getPeoples): ' + error.message
            });
        }
    },
    getPerson: function(req, res){
        try {
            const id = req.params.personId;
            Person.findById({_id: id}).exec((err, person) => {
                if(err){
                    return res.status(MyResponse.CODE_ERROR).send({
                        status: MyResponse.STATUS_ERROR,
                        code: MyResponse.CODE_ERROR,
                        message: 'Error al consultar la persona con el ID especificado.',
                        define_error: 'Log (PersonController.save): ' + err.message
                    });
                }
                if(!person){
                    return res.status(MyResponse.CODE_WARNING).send({
                        status: MyResponse.STATUS_WARNING,
                        code: MyResponse.CODE_WARNING,
                        message: 'No existe una persona registrada con el ID especificado.'
                    });
                }

                return res.status(MyResponse.CODE_SUCCESS).send({
                    status: MyResponse.STATUS_SUCCESS,
                    code: MyResponse.CODE_SUCCESS,
                    person
                });
            })
        } catch (error) {
            return res.status(MyResponse.CODE_ERROR).send({
                status: MyResponse.STATUS_ERROR,
                code: MyResponse.CODE_ERROR,
                message: 'Error en el servidor al intentar consultar la persona.',
                define_error: 'Log (PersonController.save): ' + error.message
            });
        }
    },

    updatePerson: function(req, res){
        let params = req.body;
        try {
            const validate_identity = !Validator.isEmpty(params.identity);
            const validate_names    =   !Validator.isEmpty(params.names);
            const validate_surname1 = !Validator.isEmpty(params.surname_1);
            const validate_surname2    = !Validator.isEmpty(params.surname_2);
            const validate_birthDate   = !Validator.isEmpty(params.birth_date);

            if(validate_identity
                && validate_names
                && validate_surname1
                && validate_surname2
                && validate_birthDate) {

                    Person.updateOne({identity: params.identity},params).exec((err, success) => {
                        if(err){
                            return res.status(MyResponse.CODE_ERROR).send({
                                status: MyResponse.STATUS_ERROR,
                                code: MyResponse.CODE_ERROR,
                                message: 'Error al modificar la persona con el ID especificado.',
                                define_error: 'Log (PersonController.save): ' + err.message
                            });
                        }

                        if(!success){
                            return res.status(MyResponse.CODE_WARNING).send({
                                status: MyResponse.STATUS_WARNING,
                                code: MyResponse.CODE_WARNING,
                                message: 'No se pudo modificar la persona con el ID especificado. Verifique su informacion'
                            });
                        }

                        return res.status(MyResponse.CODE_SUCCESS).send({
                            status: MyResponse.STATUS_SUCCESS,
                            code: MyResponse.CODE_SUCCESS,
                            message: 'Se ha modificado correctamente la persona.'
                        });
                    })
                }
        } catch (error) {
            return res.status(MyResponse.CODE_ERROR).send({
                status: MyResponse.STATUS_ERROR,
                code: MyResponse.CODE_ERROR,
                message: 'Error en el servidor al intentar modificar la persona.',
                define_error: 'Log (PersonController.save): ' + error.message
            });
        }
    }

}

module.exports = Controller;