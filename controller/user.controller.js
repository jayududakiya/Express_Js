/*--------------------------------- IN USE --------------------------------- */

/* -------------------------------------------------------------------------- */
/*//!-CREATE FUNCTION FOR application level api or routes */
/*                             //* [21/08/2024]                             */
/* -------------------------------------------------------------------------- */

const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { getISTTimestamp } = require('../service/timeStamp')

const filePath = path.join(__dirname,process.env.LOG_FILE_NAME);

exports.userRegistration = async (req,res) => {
  try {
    const {email,password} = req.body;
    let user = await  User.findOne({email : email , isDeleted : false});
    if(user){
      return res.status(400).json({message : "User Is Already Exists"});
    }
    const hasPassword = await bcrypt.hashSync(password,10)     
    user = await User.create({...req.body,password:hasPassword});
    res.status(200).json({message : "user is Created",user});
  } catch (error) {
    console.log("Error==>",error);
    res.status(500).json({message : "Internal Server Error"});
  }
}

exports.userLogin = async (req,res) => {
  try {
    const {email , password} = req.body;
    const user = await User.findOne({email : email , isDeleted : false});
    if(!user){
      return res.status(404).json({message:'user Was Not Found....'})
    }
    const confirmPassword = await bcrypt.compareSync(password,user.password);
    if(!confirmPassword){
      return res.status(400).json({message:'Enter Valid Email Or Password'});
    }
    const token = jwt.sign({userId:user._id},process.env.JWT_SECURE_KEY);
    const userLog = `{ \n userId : "${user._id}" ,\n userName : "${user.name}" ,\n userEmail : "${user.email}" ,\n tokenID : "${token}" ,\n createAT : "${getISTTimestamp()}" \n} ,\n`
    fs.appendFileSync(filePath,userLog,'utf8')
    res.status(200).json({message : 'login Was SussesFul......',token})
  } catch (error) {
    console.log('Error==>',error);    
    res.status(500).json({message : "Internal Server Error"});
  }
}

exports.userProfile = async (req,res) => {
  try {
    const {user} = req;    
    res.status(200).json({user})
  } catch (error) {
    console.log("Error==>",error);
    res.status(500).json({message : "Internal Server Error"}) 
  }
}

