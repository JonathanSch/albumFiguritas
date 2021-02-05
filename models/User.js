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
    },
    opcionesRandom :{
        type:Array,
    }
})
UserSchema.pre('save',async function(next){
    try {
        const actualUser = this;
    const madrijim = await User.find();
    let random = [];
    for(let i = 0;i<3;i++){
        let numeroRandom = Math.floor(Math.random() * (madrijim.length))
        console.log(numeroRandom)
        random.push(madrijim[numeroRandom].name)
    }
    actualUser.opcionesRandom = random;
    } catch (error) {
        console.log(error)
    }

    
    next();
})

module.exports = mongoose.model('User',UserSchema)