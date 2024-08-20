const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type : String,
        required: true
    },
    age: {
        type : Number
    },
    gender: {
        type : String
    },
    email: {
        type : String,
        required: true
    },
    "contact": String , // sort from to set Type In Schema 
    country: {
        type : String ,
        required: true,
    },
    jobInfo : {
        jobTitle:{
            type :String ,
            required : true
        },
        experience :{
            type : Number,
            required : true
        },
    },
    "isDeleted" : {
        type : Boolean,
        default : false
    },
    "isActive" : {
        type : Boolean,
        default : true
    }
})


// example of  export 
//? module.exports = mongoose.model('collectionName',"schemaName")

module.exports = mongoose.model('users',userSchema)