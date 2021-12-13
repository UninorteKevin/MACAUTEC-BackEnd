'use-strict'

var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var SchemaService = Schema({
    name: String,
    description: {type:String, default: '---'},
    estimated_time: Number,
    price: Number,
    status: {type: String, default: 'Disponible'},
    mecanic: {type: Schema.ObjectId, default: null}
},
{
    timestamps: true
});

module.exports = Mongoose.model('Service', SchemaService);