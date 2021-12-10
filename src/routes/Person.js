'use strict'

var express = require('express');
var PersonController = require ('../controllers/PersonController');

var router = express.Router();

router.post('/persons/add', PersonController.save);
router.get('/persons/list', PersonController.getPersons);


module.exports = router;