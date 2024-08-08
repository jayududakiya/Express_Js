/* ----------------------------------- // TODO : lesson 01 ----------------------------------- */
const express = require('express');

const server = express();
/*

server.get("/" ,(req,res)=>{
    res.write("<h1>Hello This is Home Page</h1>")
})

server.get("/about" ,(req,res)=>{
    res.write("<h1>Hello This is about Page</h1>")
})

server.listen(8000,()=>{
    console.log("server is running at http://127.0.0.1:8000");
})

*/ 

/* ----------------------------------- // TODO : lesson 02 ----------------------------------- */

// server.get("/", (req, res) => {
//     res.write('welcome to express server');
//     res.end();
// })

// server.get("/",(req,res)=>{
//     res.send('get method-1');
// })

// server.get("/user", (req, res) => {
//     res.status(200);
//     res.json({ message: 'use GET method' });
// })
// server.post("/user", (req, res) => {
//     res.status(201);
//     res.json({ message: 'use POST method' });
// })
// server.put("/user", (req, res) => {
//     // res.status(201);
//     res.json({ message: 'use PUT method' });
// })
// server.patch("/user", (req, res) => {
//     // res.status(201);
//     res.json({ message: 'use PATCH method' });
// })
// server.delete("/user", (req, res) => {
//     // res.status(201);
//     res.json({ message: 'use DELETE method' });
// })
// server.patch("/admin", (req, res) => {
//     // res.status(201);
//     res.json({ message: 'Admin patch method' });
// })
// server.delete("/admin", (req, res) => {
//     // res.status(201);
//     res.json({ message: 'Admin DELETE method' });
// })

// server.listen(1234, () => {
//     console.log('server start at http://localhost:1234');

// })

/* ------------------------------- // TODO practice ------------------------------ */

// const userData = [
//     {
//         id : 1,
//         name:"us01",
//         age : 10,
//         class : 5
//     },
//     {
//         id : 2,
//         name:"us02",
//         age : 10,
//         class : 5
//     },
//     {
//         id : 3,
//         name:"us03",
//         age : 10,
//         class : 5
//     },
//     {
//         id : 4,
//         name:"us04",
//         age : 10,
//         class : 5
//     }
// ]


// server.get('/ab',(req,res)=>{    
//     // res.status(100)
//     // res.status(101)
//     // res.status(102)
//     // res.status(103)

//     // scussec status code
//     // res.status(200)
//     // res.status(201)
//     // res.status(202)
//     // res.status(203)
//     // res.status(204)
//     // res.status(205)
//     // res.status(206) 
//     // res.status(207) 
//     // res.status(226) 

//     // redirect status code
//     // res.status(300) 
//     // res.status(301) 
//     // res.status(302) 
//     // res.status(303) 
//     // res.status(304) 
//     // res.status(307) 
//     // res.status(308)  
    
//     // client error status code
//     // res.status(400)    
//     // res.status(401)    
//     // res.status(402)    
//     // res.status(403)    
//     // res.status(404)    
//    // res.status(405)    
//    // res.status(406)  
    
    
//     res.write(`<h1> this is from server About  ${req.query.name} & ${req.query.age} & ${req.query.log} </h1>`)
//     res.end()

// })

// server.get('/user',(req,res)=>{
//     res.status(200)
//     res.write("<h1> this is from server user </h1>")
//     res.end()
// })

// server.get('/test',(req,res)=>{
//     res.status(300)
//     res.json({test:"test command with 101 status"})
//     // res.end()
// })

// server.get('/test/name',(req,res)=>{
//     res.status(200)
//     res.write("<h1> this is from server test/name </h1>")
//     // res.end()
// })

// const links = ["/","about","contact","service","admin" , "admin/user"]

// links.map((item)=>{
//     server.get(`/${item}`,(req,res)=>{
//         // res.status(200)
//         if(item === "/"){
//             res.write(`<h1> this is from server Home </h1>`)
//         }
//         else if(item === "admin/user"){
//             // res.write(`<h1> this is from server admin/user ${req.query.id} </h1>`)
//             if(req.query.id){
//                 res.json(userData.find(X=> X.id == req.query.id))
//             }else{
//                 res.json(userData)
//             }
//         }
//         else{
//             res.write(`<h1> this is from server ${item} </h1>`)
//         }
//         res.end()
//     })    
// })


// server.get('/',(req,res)=>{
//     // res.status(200)
//     res.set('Content-Type', 'text/html')
//     res.append('Link', ['<http://localhost/>', '<http://localhost:8000/>','<http://127.0.0.1:8000/>'])
//     res.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly')
//     res.append('Warning', '199 Miscellaneous warning')
//     // cookcie add with constion 
//     res.cookie('name', 'tobi01', { domain: 'localhost', path: '/' , expires: new Date(Date.now() + 900000) , secure : true})
//     // cookcie add with constion 
//     res.cookie('name', 'jhon/admin', { domain: 'example.com', path: '/admin', secure : true})
//     // cookcie add with constion 
//     res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true })
//     res.write("<h1> this is from server Home </h1>")

//     res.end()
// })

// server.listen(8000,()=>{console.log("server is running at 8000 port http://localhost:8000")})


/* -------------------------------- // TODO Lesson 03   -------------------------------- */


let middleWare = (req,res,next) => {
    if(req.query.password === "1234"){
        console.log('Success');
        next();
    }else{
        return res.json({message : "Incorrect Way!!!"})
    }
}

let logInMiddleWare = (req,res,next) => {
    let email = req.query.email
    if(email.includes('@')){
        console.log('Success');
        next();
    }else{
        console.log(req.query.email);
        return res.json({message : "Incorrect Way!!!"})
    }
}


// * Application Level  Middleware 
// server.use(middleWare)

server.get('/',(req,res)=>{
    res.write('<h1>Welcome to Server !!!!</h1>')
    res.end()
})

server.post('/user',(req,res)=>{
    res.send({message : "user was post Successfully"})
    res.end()
})

// * Route Level  Middleware 
server.get('/login',  logInMiddleWare ,(req,res)=>{
    res.send({message : "user logIn  Successfully"})
    res.end()
})


/* -------------------------------- // TODO Lesson 03_2 use file    -------------------------------- */


// * width require method using 
// const userData = require('./Data/Data.json');


// * width FS module 

const fs = require('fs')

const userData = fs.readFileSync('./Data/Data.json' , 'utf-8')

// ? this will return string like data 


server.get('/local_data',(req,res)=>{
    // To Convert In to JSON Formate
    res.json(JSON.parse(userData))
    res.end()
})


server.listen(8000,()=>{console.log("server is running at 8000 port http://localhost:8000")})