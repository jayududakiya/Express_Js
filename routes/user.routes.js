const express = require('express');
const userRoutes = express.Router();


/* -------------------------------------------------------------------------- */
/*//!-IMPORT CONTROLLERS FUNCTION FOR application level api or routes */
/*                             //* [21/08/2024]                             */
/* -------------------------------------------------------------------------- */

const { userRegistration, userLogin , userProfile , updateUser, deleteUser , changeUserPassword} = require('../controller/user.controller');

//! calling middlewares

const { verifyToken } = require('../helper/verifyToken')

userRoutes.post('/register',userRegistration);

userRoutes.post('/login',userLogin);

userRoutes.get('/profile',verifyToken,userProfile);

userRoutes.put('/updateProfile',verifyToken,updateUser);

userRoutes.put('/deleteProfile',verifyToken,deleteUser);

userRoutes.put('/changePassword',verifyToken,changeUserPassword);



module.exports = userRoutes;