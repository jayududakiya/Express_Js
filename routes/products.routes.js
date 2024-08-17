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
const { CreateProduct , FindProduct , GetAllProduct } = require("../controller/products.controller");

// //** GET ALL PRODUCTS
productsRoutes.get("/",GetAllProduct);

// //** FIND PRODUCTS
productsRoutes.get("/-q",FindProduct); // -q for find product base on sku field

// //** CREATE PRODUCTS
productsRoutes.post("/",CreateProduct);

// //** REPLACE PRODUCTS
// productsRoutes.put("/:id",RepealsProduct);

// // //** UPDATE PRODUCTS
// productsRoutes.patch("/:id",UpdateProduct);

// // ** DELETE PRODUCTS DATA
// productsRoutes.delete("/:id",DeleteProduct);

module.exports = productsRoutes;
