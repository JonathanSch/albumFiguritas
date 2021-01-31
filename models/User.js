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
    }
})

const User = mongoose.model('User', UserSchema);

module.exports = User;