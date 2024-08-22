const express = require("express");
const userRoutes = express.Router();


// ! IMPORT CONTROLLERS CREATE FUNCTION FOR application level api or routes 
// ** [20/08/2024]

const {registrationUser,loginUser,userProfile} = require('../controller/user.controller')

const {verifyToken} = require("../helper/verifyToken")

// for registrationUser
userRoutes.post('/registration',registrationUser)

userRoutes.post('/login',loginUser)

userRoutes.get('/profile',verifyToken,userProfile)

module.exports = userRoutes