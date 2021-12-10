'use-strict'

var express = require('express');
var ServiceController = require ('../controllers/ServiceController');

var router = express.Router();

router.post('/services/add', ServiceController.save);
router.get('/services/list', ServiceController.getServices);
router.get('/services/list/:serviceId', ServiceController.getService);
router.get('/services/list/name/:serviceName', ServiceController.getServiceByName);
router.put('/services/list/:serviceId', ServiceController.updateService);

module.exports = router;