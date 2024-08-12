// import core modules 
const fs = require('fs');
const path = require('path');
// create file path 
const filePath = path.join(__dirname , '../Data/products.json')
// read file data 
const products = JSON.parse(fs.readFileSync(filePath,'utf-8'))

// import utils function 
const {CreateData , DeleteData ,ReplacesData ,UpdateData} = require('../utils/utils')

exports.GetAllProduct = (req,res)=>{
    res.json(products)
}

exports.FindProduct = (req,res)=>{
    const ID = +req.params.id;
    const product = products.find(product => product.id === ID)
    if(product){
        res.json({message : "Product was Found SuccessFully",product})
    }else{
        res.json({message : "Product Was Not Found.. Try Again....."})
    }
}

exports.CreateProduct = (req,res)=>{
    // console.log(req.body);  
    const new_data = req.body
    const response  =  CreateData(filePath , products , new_data);
    res.json(response)
    // if(Boolean(Object.keys(req.body).length)){
    //     products.push(req.body);
    //     // Add to json file 
    //     fs.writeFileSync(filePath ,JSON.stringify(products, null, 4) , 'utf-8' )
    //     res.json({message : "Products was Add SuccessFully",product_Id: req.body.id})
    // }else{
    //     res.json({message : "Products was NOT Add Try Again for Validate Schema.."})
    // }
}

exports.RepealsProduct = (req,res)=>{
    let ID = +req.params.id
    const replacesData = req.body;
    const response  =  ReplacesData(filePath , products , replacesData , ID );
    res.json(response)
    // const productIndex = products.findIndex(product => product.id === ID)
    // if(productIndex !== -1){
    //     products[productIndex] = {id : ID , ...req.body}
    //     fs.writeFileSync(filePath , JSON.stringify(products , null , 4) ,'utf-8')
    //     res.json({message : "Products Was Replace SuccessFully " , repealsData : products[productIndex]})
    // }else{
    //     res.json({message : "Products was NOT Replace Try Again"})
    // }
}

exports.UpdateProduct = (req,res)=>{
    let ID = +req.params.id
    const updateData = req.body;
    const response  =  UpdateData(filePath , products , updateData , ID );
    res.json(response)
    // const productIndex = products.findIndex(product => product.id === ID)
    // if(productIndex !== -1){
    //     products[productIndex] = {...products[productIndex],...req.body}
    //     fs.writeFileSync(filePath, JSON.stringify(products , null , 4) ,'utf-8')
    //     res.json({message : "Products Was Update SuccessFully " , UpdateData : req.body})
    // }else{
    //     res.json({message : "Products was NOT Update Try Again"})
    // }
}

exports.DeleteProduct = (req,res)=>{
    const ID = +req.params.id;
    const response  =  DeleteData(filePath,products,ID);
    res.json(response)
    // const index = products.findIndex(product => product.id === ID)
    // const restProducts = products.filter(product => product.id !== ID)
    // if(index !== -1){
    //     fs.writeFileSync(filePath,JSON.stringify(restProducts , null , 4) , 'utf-8')
    //     res.json({message : "Product Was Delete SuccessFully" , product_Id : products[index].id})
    // }else{
    //     res.json({message : "Product Was NOT Delete"})
    // }
}