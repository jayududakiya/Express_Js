const express = require('express');
const { verifyToken } = require('../helper/verifyToken');
const { addToCart , deleteToCart , updateToCart , getAllCart } = require('../controller/cart.controller');

const CartRoutes = express.Router();

CartRoutes.get('/',verifyToken,getAllCart); // [Done]

CartRoutes.post('/',verifyToken,addToCart); //[Done]

CartRoutes.post('/updateCart',verifyToken,updateToCart); // [done]

CartRoutes.post('/deleteCart',verifyToken,deleteToCart); // [done]

module.exports = CartRoutes;