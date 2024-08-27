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
        const product = await Product.find({isDeleted : false});
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
        const product = await Product.findOne({_id : productId , isDeleted : false});
        if(product){
            return res.status(200).json(product)
        }else{
            return res.status(404).json({message : "products not Fount productID dose not match......"}) // bad request
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
        let product = await Product.findOne({_id : productId , isDeleted : false});
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

// FOR DELETE PRODUCTS [SOFT_DELETE]
exports.DeleteProductSoft = async (req,res) => {
    try {
        const {productId} = req.query; 
        let product = await Product.findOne({_id : productId , isDeleted : false});
        if(!product){
            return res.status(404).json({message : "product Was Not Found...."})
        }else{
            product = await Product.findByIdAndUpdate(productId,{$set : {isDeleted : true}},{new : true});
            return res.status(200).json({message:"product Was Deleted.....",product})
        }
    } catch (error) {
        console.log("Error==>",error);
        res.status(500).json({message : "Internal Server Error"})
    }
};