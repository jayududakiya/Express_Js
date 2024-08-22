const User = require('../model/user.model');
const jwt = require('jsonwebtoken');

exports.verifyToken = async (req,res,next) => {
    try {
        const authorization = req.headers['authorization'];
        if(!authorization){
            return res.status(500).json({message : 'Internal  Server Error'});
        }
        const Token = await authorization.split(' ')[1];
        const payload =  await jwt.verify(Token,process.env.JWT_SECURE_KEY)
        const user = await User.findOne({_id : payload.userId,isDeleted : false});
        if(!user){
            return res.status(401).json({message : "Unauthorize"});
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("Error==>",error);
        res.status(500).json({message : 'Server Error'});
    }
}