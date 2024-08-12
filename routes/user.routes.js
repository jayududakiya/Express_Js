const express = require("express");
const userRoutes = express.Router();

// import Controllers
const {
  findUser,
  getAllUser,
  createUser,
  replaceUser,
  updateUser,
  deleteUser,
} = require("../controller/user.controller");

//** GET ALL USER DATA
userRoutes.get("/", getAllUser);

//** GET SINGLE USER USER DATA
userRoutes.get("/:id", findUser);

//** CREATE new USER
userRoutes.post("/", createUser);

//** REPLACE USER

userRoutes.put("/:id", replaceUser);

//** UPDATE USER
userRoutes.patch("/:id", updateUser);

// ** DELETE USER
userRoutes.delete("/:id", deleteUser);


module.exports = userRoutes