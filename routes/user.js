const express = require('express');
const router = express.Router();
const User = require('../models/User')

const multer = require('multer');
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

router.post('/create',async(req,res)=>{
    console.log(req.body.datoCurioso)
    try {
        const newUser = new User({
            name:req.body.name,
            puesto:req.body.puesto,
            edad:req.body.edad,
            datoCurioso: req.body.datoCurioso,
        })
        const guardado = await newUser.save()
        res.send(guardado).status(201)
    } catch (error) {
        res.send({error}).status(400)
    }
})

router.post('/subirFoto/:name', (req,res)=>{
    const upload = multer({storage}).single('foto');
    upload(req,res,function(err){
    if(err) res.send(err).status(200);
    cloudinary.uploader.upload(req.file.path,{tags:'foto',public_id: `blog/${req.file.originalname}`},async(err,image)=>{
        if(err) res.send(err);
        const fs = require('fs')
        
        fs.unlinkSync(req.file.path)

        const updatedUser = await User.updateOne({name :req.params.name},{$set : {foto:image.secure_url}})
        res.send(updatedUser)
    })
})
})

router.patch('/random/:name',async(req,res)=>{
    try {
        const actualUser = await User.findOne({name:req.params.name})
    const guardar = await actualUser.save();
    res.send(guardar).status(200)
    } catch (error) {
       res.send(error).status(400) 
    }
    

})

module.exports = router;