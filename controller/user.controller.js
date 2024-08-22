/*--------------------------------- IN USE --------------------------------- */
// ! CREATE FUNCTION FOR USER DB REGISTRATION AND LOGIN
//** [20/08/2024]

const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path');
 
const filePath = path.join(__dirname,'../userLog.txt')

exports.registrationUser = async (req, res) => {
  try {
    const { email,password } = req.body;
    let user = await User.findOne({ email: email, isDeleted: false });
    if (user) {
      return res.status(400).json({ message: "user is already exist...." });
    }
    const PasswordToken = await bcrypt.hashSync(password, 10);

    user = await User.create({ ...req.body , password : PasswordToken});
    res.status(201).json({ message: "User Registration sussesfull....", user });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email, isDeleted: false });
    if (!user) {
      return res.status(404).json({ message: "user Was Not Found..." });
    }
    // if password is match of not
    const hasPassword = await bcrypt.compare(password , user.password)
    if (!hasPassword) {
      return res.status(400).json({ message: "enter Valid Email Or Password" });
    }
    const token = await jwt.sign({userId : user._id},process.env.JWT_SECURE_KEY)
    
    const userLog = `\t { \t userName : ${user.name} ,\n userId : ${user._id} ,\n token : ${token} ,\n createAt : ${new Date(8.64e15).toString()} \n \t } , \n`

    fs.appendFileSync(filePath,userLog,"utf-8")
    // req.setHeaders({"authorization":`${token}`})
    return res
      .status(200)
      .json({ message: "user login Was SussesFully...", token });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.userProfile = async (req,res) => {
  try {
    const user = await req.user;
    res.status(200).json({message : "user Was Get",user})
  } catch (error) {
    console.log("Error",error);
    res.status(500).json({message : "Internal Server Error"})
  }
}


exports.deleteUser = async () => {
  
}