/* // TODO ---------------------------------- lesson 04 (08/08/2024) ---------------------------------- */

/* ------------------------- //? Know Extra Middleware ------------------------ */

//* -> < 4.0 version ---> body-parser

// now use 
//* -> express.json() ---> raw / json formate
//* -> express.urlencoded({extended : true})  --> forms
        //* extended:
        //* If true, the middleware will parse the URL-encoded data with the qs library (allowing for rich objects and arrays).
        //* If false, it will use the querystring library, which does not support nested objects.
//* -> express.static() -->  for use static url and image links
//* -> morgan as  parti middleware for log 
/* -------------------------------------------------------------------------- */

// ! CODE
const express = require("express");
const morgan = require('morgan')

const server = express();

// TODO : TOPIC : 1 [Application & Routes level Midd]

//* Custom middleware as Application level
let Middleware = (req, res, next) => {
  //! in if (req.query.name != "") is not Working 
 // fix by this if (req.query.name && req.query.name != "")

  if (req.query.name && req.query.name != "") {
    console.log("Success Middleware Is Working");
    next();
  } else {
    console.log(req.query);
    res.json({ message: "Not Found Correct Routes For Express Js !!!" });
  }
};

//* Custom middleware as Application level
let middleWare = (req,res,next) => {
   if(Object.keys(req.query).length !== 0 && req.query.password.trim() !== "") {
        console.log('Success');
        next();
    }else{
        res.json({message : "Incorrect Way!!"})
    }
}

//* Custom middleware as Route level
function LogInMiddleware(req, res, next) {
  if (req.query.login === "true") {
    //if query login is true then is go for next
    console.log("LogIn Is Success Full");
    next();
  } else {
    res.json({ message: "Login Id Was Not Found pleas try Aging" });
  }
}

// * EXAMPLES
// server.use(Middleware)
// server.use(middleWare)

// * use of Route level 
// server.get("/user", LogInMiddleware, (req, res) => {
//     res.json({ user: "from the user Route OK" });
//   });
      
// TODO : TOPIC : 2 [Extra express.json() & express.urlencoded()]

// server.use(express.json())
// server.use(express.urlencoded({extended : true}))

//* Examples
// server.get("/user", (req, res) => {
//     console.log(req.body)
//     res.write(`<p>Hello Hi : <b>${(req.body.name) ? req.body.name : "Jack" }</b></p>`)
//     res.end()
// });    



// TODO : TOPIC : 3 [Extra express.static() & server.use(morgan('dev'))]

server.use("/",express.static('./public')) // this is show index.html file directly 
server.use("/demo",express.static('./public/data.json')) // this is show data.json

server.use(morgan('dev'))

// server.use((req,res,next)=>{
//     console.log(req.url , "\t" ,  req.method ,"\t");
//     next()  
// })

server.get("/", (req, res) => {
    res.write("<h1>this is Home Page Route</h1>");
    res.end();
});

server.post("/user", (req, res) => {
    const BODY = req.body;
    res.send(BODY)
});


//! server start 
server.listen(8000, () => {
  console.log(`Server Start At This PORT : 8000`);
});
