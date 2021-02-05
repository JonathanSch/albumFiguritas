const mongoose = require('mongoose');
const User = require('./User');

const JanijSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    madrijim:{
        type:Array,
    }
},
)
JanijSchema.pre("save",async function(){
    const janij = this;
    const madrijim = await User.find()
    janij.madrijim = madrijim

})

const Janij = mongoose.model('Janij', JanijSchema)

module.exports = Janij;