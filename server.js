/* // TODO ----------------------------------- lesson 08 [13/08/2024] ----------------------------------- */


const express = require('express');
const morgan = require('morgan');
const mongoose = require("mongoose");
const ejs = require('ejs');
const hbs = require('handlebars');
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
const path = require('path');

server.set('view engine','ejs');
server.set('view engine','hbs');

// server.use(path.join(__dirname,'asset/images/userImg'),express.static(path.join(__dirname,'asset/images/userImg')))
server.use(express.json());
server.use(express.urlencoded({extended : true }));
server.use(morgan('dev'));

server.use('/public/images/usersImg',express.static(path.join(__dirname,'/public/images/usersImg')))

server.get('/',(req,res) => {
    res.write('<h1>This From Home</h1>')
    res.end()
})

const userRoutes = require('./routes/user.routes')
const productRoutes = require('./routes/products.routes');
const CartRoutes = require('./routes/cart.routes');


server.use('/api/user',userRoutes);
server.use('/api/product',productRoutes);
server.use('/api/cart',CartRoutes);

const PORT = process.env.PORT || 8080;
server.listen(PORT,()=>console.log(`server Start At http://localhost:${PORT}`));