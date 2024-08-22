const express = require('express');
const userRoutes = express.Router();


/* -------------------------------------------------------------------------- */
/*//!-IMPORT CONTROLLERS FUNCTION FOR application level api or routes */
/*                             //* [20/08/2024]                             */
/* -------------------------------------------------------------------------- */

const { userRegistration, userLogin } = require('../controller/user.controller')

userRoutes.post('/register',userRegistration)

userRoutes.post('/login',userLogin)


module.exports = userRoutes;