
/* ------------------------------ // ## IN USE ------------------------------ */

// ! CREATE FUNCTION FOR LOCAL_DATABASE MONGOOSE [CRUD OPERATIONS]
//** [14/08/2024]

// ? import data schema from model file 
const User = require("../model/user.model")

// CREATE USER  WITH CONDITION
exports.createUser = async (req,res) => {
    try {
        // const user  = await User.find({email : email}) // module.find Method use for find many object 
        const { email } = req.body;
        const user  = await User.findOne({email : email}) // module.findOne Method use for find first object
        if(user){ // if user is Not null 
            return res.status(400).json({message : "user is already existing....."})
        }else{ // if find user is Null 
            const user = await User.create({...req.body});
            res.status(201).json({message : "user Was Create",user});
        }
    } catch (error) {
        console.log("Error",error);
        res.status(500).json({message : "Internal Server Error"});
    }
}


//GET ALL USER DATA 
exports.getAllUser = async (req,res) => {
    try {
        const user = await User.find()
        if(user.length){
            res.status(200).json(user)
        }else{
            res.status(404).json({user , message : "user was data was not Found....."})
        }
    } catch (error) {
        console.log("ERROR=>",error);
        res.status(500).json({message : "Internal Server Error"});
    }
}

//FIND USER 
exports.findUser = async (req,res) => {
    try {
        const name =  req.query.name;
        const user = await User.findOne({name : name})
        console.log("user",user);
        if(user){
            return res.status(200).json(user)
        }else{
            return res.status(404).json({message : "user Was Not Found......."})
        }
    } catch (error) {
        console.log("error",error);
        res.status(500).json({message : "Internal Server Error"})
    }
}



/* ---------------------------- // ## NOT IN USE ---------------------------- */
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