'use-strict'

var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var SchemaService = Schema({
    name: String,
    description: {type:String, default: '---'},
    estimated_time: Number,
    price: Number,
    status: {type: String, default: 'Disponible'}
},
{
    timestamps: true
});

module.exports = Mongoose.model('Service', SchemaService);