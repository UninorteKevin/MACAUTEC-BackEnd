'use-strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Modelo de comments

var commentSchema = Schema({
    content: String,
    date: {type: Date, default: Date.now},
    user: {type: Schema.ObjectId, ref: 'User'}
});

var Comment = mongoose.model('comment', commentSchema);

var QuoteSchema = Schema({
    vehicle_id: String,
    owner_id: String,
    owner:String,
    service: {type: Schema.ObjectId, ref: 'Service'},
    initial_date: Date,
    end_date: {type: Date, default: null},
    comments: [commentSchema],
    status: {type:String, default: 'Registrada'}
},
{
    timestamps: true
});

module.exports = mongoose.model('Quote', QuoteSchema);