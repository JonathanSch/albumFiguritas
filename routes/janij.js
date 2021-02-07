const express = require('express');
const router = express.Router();
const Janij = require('../models/Janij');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/verifyToken')

router.post('/createJanij',async(req,res)=>{
    try {   
        
    const salt = bcrypt.genSaltSync(10);
    const hashPassword =  bcrypt.hashSync(req.body.password,salt);
    const newJanij = new Janij({
       name: req.body.name,
       password : hashPassword
   })
   
    const createUser = await newJanij.save();
    res.send(createUser).status(201);

    } catch (error) {
        console.log(error)
        res.send(error).status(400);
    }
})

router.post('/login',async(req,res)=>{
    try {
        const findUser = await Janij.findOne({name:req.body.name});
        if(!findUser) res.send({message:'User not found'});
    const comparePasswords = await bcrypt.compare(req.body.password,findUser.password);
    if(!comparePasswords) res.send({message:'Wrong password'})
    

    const token = jwt.sign({findUser},process.env.JWT_SECRET);

    res.send({token}).status(200);
    } catch (error) {
        res.send(error).status(400);
    }
    
})

router.post('/getMadrijim',verifyToken,async(req,res)=>{
    try{
        if(!req.body.name){
            res.send({message:"No name on request"}).status(400);
        }
        const janij = await Janij.findOne({name:req.body.name});
        res.send(janij.madrijim).status(200);
    }
    catch(error){
        res.send(error).status(400);
    }

})

router.patch('/conseguir',verifyToken,async(req,res)=>{
    try {
        const updatedUser = await Janij.updateOne({name:req.body.name,"madrijim.name":req.body.madrij},
    {$set:{"madrijim.$.conseguido" : true}})
    res.send(updatedUser).status(200);
    } catch (error) {
        res.send(error).status(400)
    }
    
})

router.patch('/updateTime',verifyToken,async(req,res)=>{
    try {
        const updatedUser = await Janij.updateOne({name:req.body.name,"madrijim.name":req.body.madrij},
        {$set:{"madrijim.$.tiempo": Date.now()+ 900000}})
        res.send(updatedUser).status(200)
    } catch (error) {
        console.log(error)
        res.send(error).status(400);
    }
})

module.exports = router;