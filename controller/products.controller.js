/* ------------------------------ // ## IN USE ------------------------------ */

// ! CREATE FUNCTION FOR LOCAL_DATABASE MONGOOSE [CRUD OPERATIONS]
//** [14/08/2024]

// ? import data schema from model file 
const Product = require('../model/product.model')

// CREATE PRODUCTS 
exports.CreateProduct = async (req,res)  => {
    try {
        const {sku} = req.body;
        const product = await Product.findOne({sku : sku});
        if(product){
            return res.status(400).json({message : "product was already exists....",skuId : product.sku}) // codeName : "bad Request"
        }else{
            const product = await Product.create({...req.body})
            return res.status(201).json({message :"product Was Created....",product});
        }
    } catch (error) {
        console.log("Error",error);
        res.status(500).json({message : "Internal Server Error"});
    }
}

//GET ALL PRODUCTS 
exports.GetAllProduct = async (req,res) => {
    try {
        const product = await Product.find();
        if(product.length){
            res.status(200).json(product)
        }else{
            res.status(404).json({message:"products was not Found......"})
        }
    } catch (error) {
        console.log("Error",error);
        res.status(500).json({message : "Internal Server Error"});
    }
}

// FIND SINGLE PRODUCT
exports.FindProduct = async (req,res) => { //! END POINT IS BY QUERY 
    try {
        // const skuId = req.query.skuId;
        const {productId} = req.query;
        const product = await Product.findOne({ _id: productId});
        if(product){
            return res.status(200).json(product)
        }else{
            return res.status(404).json({message : "products not Fount SKU_ID dose not match......"}) // bad request
        }
    } catch (error) {
        console.log("Error",error);
        res.status(500).json({message : "Internal Server Error"});
    }
}

//** [16/08/2024]

// FOR UPDATE PRODUCTS 
// target by _id filed of mongodb 
exports.UpdateProduct = async (req,res) => {
    try {
        const {productId} = req.query;
        let product = await Product.findById(productId);
        console.log("product",product);
        if(!product){
            return res.status(404).json({message : "products Was Not Found....."});
        }else{
            product = await Product.findByIdAndUpdate(productId,{$set:req.body},{new : true})
            return res.status(202).json({message:"Products Was Update..",product})
        }

    } catch (error) {
        console.log("Error",error);
        res.status(500).json({message : "Internal Server Error"});   
    }
}

// FOR DELETE PRODUCTS [HEAR_DELETE]
exports.DeleteProduct = async (req,res) => {
    try {
        const {productId} = req.query; 
        let product = await Product.findById(productId);
        console.log("!product",!product);
        if(!product){
            return res.status(404).json({message : "product Was Not Found...."})
        }else{
            product = await Product.findByIdAndDelete(productId);
            return res.status(200).json({message:"product Was Deleted.....",product})
        }
    } catch (error) {
        console.log("Error==>",error);
        res.status(500).json({message : "Internal Server Error"})
    }
}


/* ---------------------------- // ## NOT IN USE ---------------------------- */
//**[11/08/2024]
// ! CREATE FUNCTION FOR LOCAL_FILE_DATA [CRUD OPERATIONS]
// // import core modules 
// const fs = require('fs');
// const path = require('path');
// // create file path 
// const filePath = path.join(__dirname , '../Data/products.json')
// // read file data 
// const products = JSON.parse(fs.readFileSync(filePath,'utf-8'))

// // import utils function 
// const {CreateData , DeleteData ,ReplacesData ,UpdateData} = require('../service/utils')

// exports.GetAllProduct = (req,res)=>{
//     res.json(products)
// }

// exports.FindProduct = (req,res)=>{
//     const ID = +req.params.id;
//     const product = products.find(product => product.id === ID)
//     if(product){
//         res.json({message : "Product was Found SuccessFully",product})
//     }else{
//         res.json({message : "Product Was Not Found.. Try Again....."})
//     }
// }

// exports.CreateProduct = (req,res)=>{
//     // console.log(req.body);  
//     const new_data = req.body
//     const response  =  CreateData(filePath , products , new_data);
//     res.json(response)
//     // if(Boolean(Object.keys(req.body).length)){
//     //     products.push(req.body);
//     //     // Add to json file 
//     //     fs.writeFileSync(filePath ,JSON.stringify(products, null, 4) , 'utf-8' )
//     //     res.json({message : "Products was Add SuccessFully",product_Id: req.body.id})
//     // }else{
//     //     res.json({message : "Products was NOT Add Try Again for Validate Schema.."})
//     // }
// }

// exports.RepealsProduct = (req,res)=>{
//     let ID = +req.params.id
//     const replacesData = req.body;
//     const response  =  ReplacesData(filePath , products , replacesData , ID );
//     res.json(response)
//     // const productIndex = products.findIndex(product => product.id === ID)
//     // if(productIndex !== -1){
//     //     products[productIndex] = {id : ID , ...req.body}
//     //     fs.writeFileSync(filePath , JSON.stringify(products , null , 4) ,'utf-8')
//     //     res.json({message : "Products Was Replace SuccessFully " , repealsData : products[productIndex]})
//     // }else{
//     //     res.json({message : "Products was NOT Replace Try Again"})
//     // }
// }

// exports.UpdateProduct = (req,res)=>{
//     let ID = +req.params.id
//     const updateData = req.body;
//     const response  =  UpdateData(filePath , products , updateData , ID );
//     res.json(response)
//     // const productIndex = products.findIndex(product => product.id === ID)
//     // if(productIndex !== -1){
//     //     products[productIndex] = {...products[productIndex],...req.body}
//     //     fs.writeFileSync(filePath, JSON.stringify(products , null , 4) ,'utf-8')
//     //     res.json({message : "Products Was Update SuccessFully " , UpdateData : req.body})
//     // }else{
//     //     res.json({message : "Products was NOT Update Try Again"})
//     // }
// }

// exports.DeleteProduct = (req,res)=>{
//     const ID = +req.params.id;
//     const response  =  DeleteData(filePath,products,ID);
//     res.json(response)
//     // const index = products.findIndex(product => product.id === ID)
//     // const restProducts = products.filter(product => product.id !== ID)
//     // if(index !== -1){
//     //     fs.writeFileSync(filePath,JSON.stringify(restProducts , null , 4) , 'utf-8')
//     //     res.json({message : "Product Was Delete SuccessFully" , product_Id : products[index].id})
//     // }else{
//     //     res.json({message : "Product Was NOT Delete"})
//     // }
// }