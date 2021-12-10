'use strict'

var express = require('express');
var PersonController = require ('../controllers/PersonController');

var router = express.Router();

router.post('/persons/add', PersonController.save);
router.get('/persons/list', PersonController.getPersons);
router.get('/persons/list/:personId', PersonController.getPerson);
router.put('/persons/update', PersonController.updatePerson);

module.exports = router;