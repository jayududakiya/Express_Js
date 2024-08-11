/* // TODO ---------------------------------- lesson 05 [09/08/2024]  ---------------------------------- */
// !CREATE [API] FOR PRODUCTS -> GET [read] , GET/:ID [find/read] , POST [create]

const express = require("express")
const morgan = require("morgan")
const fs = require('fs')
const path = require('path');


//? CREATE APP
const app  = express();
app.use( express.json())
app.use(morgan("dev"))

// IMPORT DATA 
// const products = require("./Data/products.json")

// IMPORT DATA AS FS MODULE 
const products =  JSON.parse(fs.readFileSync('./Data/products.json','utf-8'))


//** GET ALL PRODUCTS

app.get("/products",(req,res)=>{
    res.json(products)
})

//** FIND PRODUCTS

app.get("/products/:id",(req,res)=>{
    const ID = +req.params.id;
    const product = products.find(product => product.id === ID)
    console.log(product);
    if(product){
        res.json({message : "Product was Found SuccessFully" ,product})
    }else{
        res.json({message : "Product Was Not Found.. Try Again....."})
    }
})

//** CREATE PRODUCTS 
app.post("/products",(req,res)=>{
    // console.log(req.body);  
    if(Boolean(Object.keys(req.body).length)){
        products.push(req.body);
        // Add to json file 
        fs.writeFileSync('./Data/products.json' ,  JSON.stringify(products, null, 4) , 'utf-8' )
        res.json({message : "Products was Add SuccessFully",products : req.body})
    }else{
        res.json({message : "Products was NOT Add Try Again for Validate Schema.."})
    }
})

// !CREATE [API] FOR USERDATA -> GET [read] , GET/:ID [find/read] , POST [create]

//IMPORT ALL USER DATA with fs module 
const userData = JSON.parse(fs.readFileSync('./Data/userData.json' , 'utf-8'))

//** GET ALL USER DATA 
app.get('/user',(req,res)=>{
    res.json(userData)
})


//** GET SINGLE USER USER DATA 
app.get('/user/:id',(req,res)=>{
    const ID  =  +req.params.id;
    const user = userData.find(user => user.id  === ID);
    if(user){
        res.json({message : "user Was Found " , user})
    }else{
        res.json({message : "User Was Not Found.. Try Again....."})
    }
})

//** CREATE new USER

app.post('/user',(req,res)=>{
    const BODY = req.body
    if(Boolean(Object.keys(BODY).length)){
        userData.push(BODY)
        fs.writeFileSync('./Data/userData.json' , JSON.stringify(userData , null , 2) , 'utf-8')
        res.json({message : "User was Add SuccessFully",user : BODY})
    }else{
        res.json({message : "User was NOT Add Try Again for Validate Schema.."})
    }
})


app.listen(1200,()=>{
    console.log("Server Is Start At Port 1200");
})