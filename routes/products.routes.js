const express = require("express");

const productsRoutes = express.Router();

// IMPORT CONTROLLERS
const {
  CreateProduct,
  GetAllProduct,
  DeleteProduct,
  FindProduct,
  UpdateProduct,
  RepealsProduct,
} = require("../controller/products.controller");

//** GET ALL PRODUCTS
productsRoutes.get("/",GetAllProduct);

// //** FIND PRODUCTS
productsRoutes.get("/:id",FindProduct);

// //** CREATE PRODUCTS
productsRoutes.post("/",CreateProduct);

// //** REPLACE PRODUCTS
productsRoutes.put("/:id",RepealsProduct);

// //** UPDATE PRODUCTS
productsRoutes.patch("/:id",UpdateProduct);

// ** DELETE PRODUCTS DATA
productsRoutes.delete("/:id",DeleteProduct);

module.exports = productsRoutes;
