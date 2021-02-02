const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) =>{
    try {
        console.log(req.params.token)
        const verificar = jwt.verify(req.params.token, process.env.JWT_SECRET); 
        req.body.token = verificar;

        next();
    } catch (error) {
        res.send({message:"Invalid token"}).status(400);
    }
}

module.exports = verifyToken;