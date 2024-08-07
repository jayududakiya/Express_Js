const express = require('express');

const server = express();

server.get("/" ,(req,res)=>{
    res.write("<h1>Hello This is Home Page</h1>")
})

server.get("/about" ,(req,res)=>{
    res.write("<h1>Hello This is about Page</h1>")
})

server.listen(8000,()=>{
    console.log("server is running at http://127.0.0.1:8000");
})