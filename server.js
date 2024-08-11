
/* // TODO ---------------------------------- lesson 06 [10/08/2024]  ---------------------------------- */

// !CREATE [API] FOR PRODUCTS -> GET [read] , GET/:ID [find/read] , POST [create] , PUT [reples] , PATCH [update] , DELETE 

const express = require("express")
const morgan = require("morgan")
const fs = require('fs')

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

//** REPLASE PRODUCTS 
app.put("/products/:id",(req,res)=>{
    let ID = +req.params.id
    const productIndex = products.findIndex(product => product.id === ID)
    if(productIndex !== -1){
        products[productIndex] = {id : ID , ...req.body}
        fs.writeFileSync('./Data/products.json' , JSON.stringify(products , null , 4) ,'utf-8')
        res.json({message : "Products Was Reples SuccesFuly " , product : products[productIndex]})
    }else{
        res.json({message : "Products was NOT Replase Try Again"})
    }
})

//** UPADTE PRODUCTS 
app.patch("/products/:id",(req,res)=>{
    let ID = +req.params.id
    const productIndex = products.findIndex(product => product.id === ID)
    if(productIndex !== -1){
        products[productIndex] = {...products[productIndex],...req.body}
        fs.writeFileSync('./Data/products.json' , JSON.stringify(products , null , 4) ,'utf-8')
        res.json({message : "Products Was Upadte SuccesFuly " , product : products[productIndex]})
    }else{
        res.json({message : "Products was NOT Upadte Try Again"})
    }
})

// ** DELETE PRODUCTS DATA 
app.delete("/products/:id",(req,res)=>{
    const ID = +req.params.id;
    const index = products.findIndex(product => product.id === ID)
    const restProducts = products.filter(product => product.id !== ID)
    if(index !== -1){
        fs.writeFileSync('./Data/products.json',JSON.stringify(restProducts , null , 4) , 'utf-8')
        res.json({message : "Product Was Delete SuccessFully",product : products[index]})
    }else{
        res.json({message : "Product Was NOT Delete"})
    }
})

// !CREATE [API] FOR USERDATA -> GET [read] , GET/:ID [find/read] , POST [create] , PUT [reples] , PATCH [update] , DELETE

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
 
//** REPLASE USER

app.put('/user/:id' , (req,res)=>{
    const ID = +req.params.id;
    const userIndex = userData.findIndex(user => user.id === ID)
    if(userIndex !== -1){
        //  * WAHY 01 TO REAPLSE DATA 
        // userData[userIndex] = {id : ID , ...req.body};
        //  * WAHY 02 TO REAPLSE DATA 
        userData.splice(userIndex , 1,{id : ID , ...req.body})
        fs.writeFileSync('./Data/userData.json',JSON.stringify(userData , null , 2) , 'utf-8');
        res.json({message:"user Data replase SuccessFully" , user : req.body})
    }else{
        res.json({message:"user Data Not replase Try Again"})
    }
})

//** UPDATE USER
app.patch('/user/:id' , (req,res)=>{
    const ID = +req.params.id;
    const userIndex = userData.findIndex(user => user.id === ID)
    if(userIndex !== -1){
        //  * WAHY 01 TO UPDATE DATA 
        // userData[userIndex] = {...userData[userIndex] , ...req.body};
        //  * WAHY 02 TO REAPLSE DATA 
        userData.splice(userIndex , 1,{...userData[userIndex], ...req.body})
        fs.writeFileSync('./Data/userData.json',JSON.stringify(userData , null , 2) , 'utf-8');
        res.json({message:"user Data replase SuccessFully" , user : req.body})
    }else{
        res.json({message:"user Data Not replase Try Again"})
    }
})

// ** DELETE USER 
app.delete('/user/:id' , (req,res)=>{
    const ID  = +req.params.id;
    const index = userData.findIndex(user => user.id === ID);
    //* WAHY 01 TO DELETE DATA 
    // const restUser = userData.filter(user => user.id !== ID);
    //* WAHY 02 TO DELETE DATA 
    const user = userData[index]
    userData.splice(index,1);
    if(index !== -1){
        //* use with WAHY 01 TO DELETE DATA 
        // fs.writeFileSync('./Data/userData.json',JSON.stringify(restUser,null,2),"utf-8");
        //* use with WAHY 02 TO DELETE DATA 
        fs.writeFileSync('./Data/userData.json',JSON.stringify(userData,null,2),"utf-8");
        res.json({message : "user Was Delete SuccessFully",user})
    }else{
        res.json({message : "user Was Not Deleter"})
    }
})

app.listen(1200,()=>{
    console.log("Server Is Start At Port 1200");
})