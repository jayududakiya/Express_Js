/* // TODO ---------------------------------- lesson 07 [12/08/2024]  ---------------------------------- */
 
// TODO :[1] create ROUTING 
// TODO :[2] create controller Method 
// TODO :[3] Connect To Server 
// TODO :[4] Create Utile Folder with different function 

//* IMPORT  DEFAULT MODULES
const express = require('express');
const morgan = require('morgan')

//* IMPORT  DEFAULT ROUTES 
const productsRoutes = require('./routes/products.routes')
const userRoutes = require('./routes/user.routes')

const server = express();

// ? middlewares 
server.use(morgan('dev'))
server.use(express.json())

server.get("/" , (req,res)=>{
    res.write("<h1>Welcome To Home Routes</h1>");
    res.end();
})

server.use('/api/product',productsRoutes)
server.use('/api/user',userRoutes)

server.listen(8000,()=>console.log('Server Is Start.... At 8000 Port....'))