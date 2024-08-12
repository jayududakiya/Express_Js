const fs = require('fs')
const path = require('path')

// create Paths 
const filePath = path.join(__dirname,'../Data/userData.json')
// read file data 
const userData = JSON.parse(fs.readFileSync(filePath,'utf-8'))

// utils functions
const { CreateData, DeleteData, ReplacesData, UpdateData } = require('../utils/utils')

exports.getAllUser = (req,res)=>{
    res.json(userData)
}

exports.findUser = (req,res)=>{
    const ID  =  +req.params.id;
    const user = userData.find(user => user.id  === ID);
    if(user){
        res.json({message : "user Was Found " , user})
    }else{
        res.json({message : "User Was Not Found.. Try Again....."})
    }
}


exports.createUser = (req,res)=>{
    const BODY = req.body
    const response = CreateData(filePath,userData,BODY)
    res.json(response)
}

exports.replaceUser = (req,res)=>{
    const ID = +req.params.id;
    const replaceData = req.body;
    const response = ReplacesData(filePath , userData , replaceData , ID)
    res.json(response)
}

exports.updateUser = (req,res)=>{
    const ID = +req.params.id;
    const updateData = req.body;
    const response = UpdateData(filePath , userData , updateData , ID)
    res.json(response)
}

exports.deleteUser = (req,res)=>{
    const ID  = +req.params.id;
    const response  = DeleteData(filePath,userData,ID)
    res.json(response)
}