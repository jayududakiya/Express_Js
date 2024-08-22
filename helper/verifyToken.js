const User = require('../model/user.model');
const jwt = require('jsonwebtoken')

exports.verifyToken = async (req,res,next) => {
    try {
        // const authentication = req.headers['authorization'];
        const authentication = await req.headers['authorization'];
        console.log("authentication",authentication);
        if(!authentication){
            return res.status(500).json({message:"Internal Server Error"})
        }
        const token = await authentication.split(' ')[1];
        const payload = await jwt.verify(token,process.env.JWT_SECURE_KEY)
        const user = await User.findOne({ _id : payload.userId , isDeleted : false})
        if(!user){
            return res.status(401).json({message : "Unauthorize"});
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("Error",error);
        res.status(500).json({message : "Server Error"})
    }
}