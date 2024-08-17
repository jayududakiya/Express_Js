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
const { createUser, getAllUser , findUser, updateUser, deleteUser} = require("../controller/user.controller");

//** GET ALL USER DATA
userRoutes.get("/", getAllUser);

// //** GET SINGLE USER USER DATA
userRoutes.get("/-q", findUser); // user-q for find user base on name field

// //** CREATE new USER
userRoutes.post("/", createUser);

//** [16/08/2024]
// //** UPDATE USER
userRoutes.put("/", updateUser);

// ** DELETE USER
userRoutes.delete("/", deleteUser);


module.exports = userRoutes