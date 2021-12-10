'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    email: {type: String, require:true,unique: true},
    password: String,
    image: String,
    role: String,
    status: String,
    person: {type: Schema.ObjectId, ref: 'Person', required: true}
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