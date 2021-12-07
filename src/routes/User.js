'use strict'

var express = require('express');
var UserController = require ('../controllers/UserController');

var router = express.Router();

router.post('/users/add', UserController.save);
router.get('/users/list', UserController.getUsers);
router.get('/users/mecanicos', UserController.getMecanicos);
router.get('/users/:id', UserController.getUser);
router.put('/users/:id', UserController.updateUser);


module.exports = router;