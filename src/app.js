'use strict'

//REQUIRES
var express = require('express');
var bodyParser = require('body-parser');

//EJECUTAR EL EXPRESS
var app = express();

//ROUTES

var user_routes = require('./routes/User');
var person_routes = require('./routes/Person');
var service_routes = require('./routes/Service');
var quote_routes =  require('./routes/Quote');

//MIDDLEWARE
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//API

app.use('/api', user_routes);
app.use('/api',person_routes);
app.use('/api', service_routes);
app.use('/api', quote_routes);
module.exports = app;