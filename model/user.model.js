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
        required: true,
        unique : true
    },
    password : {
        type :String ,
        required: true
    },
    contactNo:{
        type : String ,
        required : true
    },
    country: {
        type : String ,
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
    profileImage : {
        type : String,
    },
    "isDeleted" : {
        type : Boolean,
        default : false
    },
    "isActive" : {
        type : Boolean,
        default : true
    }
},{
    versionKey : false , 
    timestamps : true 
})


// example of  export 
//? module.exports = mongoose.model('collectionName',"schemaName")

module.exports = mongoose.model('users',userSchema)