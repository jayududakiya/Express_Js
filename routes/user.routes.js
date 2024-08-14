const express = require("express");
const userRoutes = express.Router();


// ! IMPORT CONTROLLERS CREATE FUNCTION FOR LOCAL_FILE_DATA [CRUD OPERATIONS]
// ** [11/08/2024]
// const {
//   findUser,
//   getAllUser,
//   createUser,
//   replaceUser,
//   updateUser,
//   deleteUser,
// } = require("../controller/user.controller");

// ! CREATE FUNCTION FOR LOCAL_DATABASE MONGOOSE [CRUD OPERATIONS]
// ** [14/08/2024]
const { createUser } = require("../controller/user.controller");

//** GET ALL USER DATA
// userRoutes.get("/", getAllUser);

// //** GET SINGLE USER USER DATA
// userRoutes.get("/:id", findUser);

// //** CREATE new USER
userRoutes.post("/", createUser);

// //** REPLACE USER

// userRoutes.put("/:id", replaceUser);

// //** UPDATE USER
// userRoutes.patch("/:id", updateUser);

// // ** DELETE USER
// userRoutes.delete("/:id", deleteUser);


module.exports = userRoutes