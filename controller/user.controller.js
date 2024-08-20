/*--------------------------------- IN USE --------------------------------- */

// ! CREATE FUNCTION FOR LOCAL_DATABASE MONGOOSE [CRUD OPERATIONS]
//** [14/08/2024]

// ? import data schema from model file
const User = require("../model/user.model");

// CREATE USER  WITH CONDITION
exports.createUser = async (req, res) => {
  try {
    // const user  = await User.find({email : email}) // module.find Method use for find many object
    const { email } = req.body;
    const user = await User.findOne({ email: email }); // module.findOne Method use for find first object
    if (user) {
      // if user is Not null
      return res.status(400).json({ message: "user is already existing....." });
    } else {
      // if find user is Null
      const user = await User.create({ ...req.body });
      res.status(201).json({ message: "user Was Create", user });
    }
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//GET ALL USER DATA
exports.getAllUser = async (req, res) => {
  try {
    const user = await User.find({isDeleted : false});
    if (user.length) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({ user, message: "user was data was not Found....." });
    }
  } catch (error) {
    console.log("ERROR=>", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//FIND USER
exports.findUser = async (req, res) => {
  try {
    const userId = req.query.userId;
    const user = await User.findOne({ _id: userId , isDeleted:false});
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: "user Was Not Found......." });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


//** [16/08/2024]
//UPDATE USER
// const user = await User.update({FILTER},{$set:UPDATE_DATA},OPTIONAL:{upsert:true})
exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.query;
    let user = await User.findOne({_id : userId , isDeleted : false});
    if (!user) {
      return res.status(404).json({ message: "User was not found." });
    }else{
        // method 01 for update 
       // user = await User.updateOne({ _id: user._id },{ $set: req.body },{ new: true });
       // method 02 for update 
       user = await User.findByIdAndUpdate(user._id,{ $set: req.body },{ new: true });
     return res.status(202).json({ message: "User was updated.", user });
    }

  } catch (error) {
    console.log("Error==>", error);
    return res.status(500).json({ message: "Internal Server Error...." });
  }
};


// DELETE USER FROM DATABASE [HEAR_DELETE]
exports.deleteUserSoft = async (req,res) =>{
  try {
   const {userId}=req.query;
   let user = await User.findOne({_id : userId , isDeleted : false});
   if(!user){
      return res.status(404).json({message : "user Not Found....."})
   }else{
    // HERE NOT DELETE USER ONLY UPDATE FILED 
    user = await User.findByIdAndUpdate(userId , {$set : {"isDeleted" : true , "isActive":false} },{new : true})
    return res.status(200).json({message : "user Was Deleted..." , user})
   }
  } catch (error) {
      console.log("Error==>",error);
      res.status(500).json({message  : "Internal Server Error"})
  }
}


// DELETE USER FROM DATABASE [HEAR_DELETE]
exports.deleteUser = async (req,res) =>{
    try {
     const {userId}=req.query;
     let user = await User.findById(userId);
     if(!user){
        return res.status(404).json({message : "user Not Found....."})
     }else{
      // 01 method for delete
      // user = await User.deleteOne({_id:userId})
      // method 02 for update 
      user = await User.findByIdAndDelete(userId);
      return res.status(200).json({message : "user Was Deleted..." , user})
     }
    } catch (error) {
        console.log("Error==>",error);
        res.status(500).json({message  : "Internal Server Error"})
    }
}

/*----------------------------## NOT IN USE ---------------------------- */
//**[11/08/2024]
// ! CREATE FUNCTION FOR LOCAL_FILE_DATA [CRUD OPERATIONS]
// const fs = require('fs')
// const path = require('path')

// // create Paths
// const filePath = path.join(__dirname,'../Data/userData.json')
// // read file data
// const userData = JSON.parse(fs.readFileSync(filePath,'utf-8'))

// // utils functions
// const { CreateData, DeleteData, ReplacesData, UpdateData } = require('../service/utils')

// exports.getAllUser = (req,res)=>{
//     res.json(userData)
// }

// exports.findUser = (req,res)=>{
//     const ID  =  +req.params.id;
//     const user = userData.find(user => user.id  === ID);
//     if(user){
//         res.json({message : "user Was Found " , user})
//     }else{
//         res.json({message : "User Was Not Found.. Try Again....."})
//     }
// }

// exports.createUser = (req,res)=>{
//     const BODY = req.body
//     const response = CreateData(filePath,userData,BODY)
//     res.json(response)
// }

// exports.replaceUser = (req,res)=>{
//     const ID = +req.params.id;
//     const replaceData = req.body;
//     const response = ReplacesData(filePath , userData , replaceData , ID)
//     res.json(response)
// }

// exports.updateUser = (req,res)=>{
//     const ID = +req.params.id;
//     const updateData = req.body;
//     const response = UpdateData(filePath , userData , updateData , ID)
//     res.json(response)
// }

// exports.deleteUser = (req,res)=>{
//     const ID  = +req.params.id;
//     const response  = DeleteData(filePath,userData,ID)
//     res.json(response)
// }
