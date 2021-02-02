const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    puesto:{
        type:String,
        required:true,
    },
    edad:{
        type:Number,
        required:true,
    },
    foto:{
        type:String,
    },
    datoCurioso:{
        type: String,
        required:true
    },
    conseguido:{
        type:Boolean,
        default : false,
        required: true,
    },
    tiempo:{
        type:Number,
        default : 0,
        required: true,
    }
})

const User = mongoose.model('User', UserSchema);

module.exports = User;