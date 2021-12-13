'use-strict'

var express = require('express');
var QuoteController = require ('../controllers/QuoteController');

var router = express.Router();

router.post('/quotes/add', QuoteController.create);
router.get('/quotes/list', QuoteController.getQuotes);
router.get('/quotes/list/:search', QuoteController.searchQuotes);
module.exports = router;