/* // TODO ----------------------------------- lesson 08 [13/08/2024] ----------------------------------- */

const express = require('express');
const morgan = require('morgan');
const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/localServerDB')
.then(()=>{
    console.log("Database Connection established SuccessFully.......");
})
.catch((error)=>{
    console.log(error);
})

const server = express();

server.use(express.json());
server.use(morgan('dev'));

server.get('/',(req,res) => {
    res.write('<h1>This From Home</h1>')
    res.end()
})

const userRoutes = require('./routes/user.routes')
const productRoutes = require('./routes/products.routes')

server.use('/api/user',userRoutes);
server.use('/api/product',productRoutes);


server.listen(8000,()=>console.log('server Start At http://localhost:8000'));