/* // TODO ----------------------------------- lesson 08 [13/08/2024] ----------------------------------- */


const express = require('express');
const morgan = require('morgan');
const mongoose = require("mongoose");
require('dotenv').config()


mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    const host = mongoose.connection.host;
    console.log("Database Connection established SuccessFully......",host);
})
.catch((error)=>{
    console.error("MongoDB Connection Error:", error.message);
    console.error("Error Stack:", error.stack);
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

const PORT = process.env.PORT || 3030;
server.listen(PORT,()=>console.log(`server Start At http://localhost:${PORT}`));