const express = require("express");

const productsRoutes = express.Router();

// ! IMPORT CONTROLLERS CREATE FUNCTION FOR LOCAL_FILE_DATA [CRUD OPERATIONS]
// ** [11/08/2024]
// const {
//   CreateProduct,
//   GetAllProduct,
//   DeleteProduct,
//   FindProduct,
//   UpdateProduct,
//   RepealsProduct,
// } = require("../controller/products.controller");


// ! CREATE FUNCTION FOR LOCAL_DATABASE MONGOOSE [CRUD OPERATIONS]
// ** [14/08/2024]
const { CreateProduct , FindProduct , GetAllProduct, UpdateProduct, productView, DeleteProductSoft } = require("../controller/products.controller");


// ! CALLING MIDDLEWARES
const { upload } = require('../helper/uploadImage')

// //** GET ALL PRODUCTS
productsRoutes.get("/",GetAllProduct);

// //** FIND PRODUCTS
productsRoutes.get("/-q",FindProduct); // -q for find product base on sku field

// //** CREATE PRODUCTS
productsRoutes.post("/",upload.array(),CreateProduct);

//** [16/08/2024]

//** UPDATE PRODUCTS
productsRoutes.put("/",UpdateProduct);

// ** DELETE PRODUCTS DATA
productsRoutes.delete("/",DeleteProductSoft);

productsRoutes.get('/viewProduct',productView)

module.exports = productsRoutes;
