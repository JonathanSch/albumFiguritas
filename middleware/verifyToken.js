const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) =>{
    const verificar = jwt.verify(req.body.token, process.env.JWT_SECRET); 
    if(!verificar) res.send({message:"Invalid token"}).status(400);

    next();

}

module.exports = verifyToken;