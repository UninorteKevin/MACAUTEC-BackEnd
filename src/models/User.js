'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    identity: String,
    names: String,
    surnames: String,
    email: {type: String, require:true,unique: true},
    password: String,
    image: String,
    role: String,
    status: String
},
{
    timestamps: true
});

UserSchema.methods.toJSON = function(){
    var obj = this.toObject();
    delete obj.password;

    return obj;
}
module.exports = mongoose.model('User', UserSchema);