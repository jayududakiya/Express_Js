const express = require('express');
const userRoutes = express.Router();


/* -------------------------------------------------------------------------- */
/*//!-IMPORT CONTROLLERS FUNCTION FOR application level api or routes */
/*                             //* [21/08/2024]                             */
/* -------------------------------------------------------------------------- */

const { userRegistration, userLogin , userProfile , updateUser, deleteUser , changeUserPassword} = require('../controller/user.controller');

//! calling middlewares

const { verifyToken } = require('../helper/verifyToken')

const { upload } = require('../helper/uploadImage');

userRoutes.post('/register', upload.single('profileImage'),userRegistration);

userRoutes.post('/login',userLogin);

userRoutes.get('/profile',verifyToken,userProfile);

userRoutes.put('/updateProfile',verifyToken , upload.single('profileImage') ,updateUser);

userRoutes.put('/deleteProfile',verifyToken,deleteUser);

userRoutes.put('/changePassword',verifyToken,changeUserPassword);



module.exports = userRoutes;