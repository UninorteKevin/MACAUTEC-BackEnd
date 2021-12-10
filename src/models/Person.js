'use-strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PersonSchema = Schema({
    identity: String,
    names: String,
    surname_1: String,
    surname_2: String,
    birth_date: Date,
    phone: {type:String, default: '---'},
    location: {type: String, default: '---'}
},
{
    timestamps: true
});

module.exports = mongoose.model('Person', PersonSchema);