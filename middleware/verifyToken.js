const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) =>{
    try {
        console.log(req.body.token)
        const verificar = jwt.verify(req.body.token, process.env.JWT_SECRET); 
        req.token = verificar;

        next();
    } catch (error) {
        res.send({message:"Invalid token"}).status(400);
    }
}

module.exports = verifyToken;