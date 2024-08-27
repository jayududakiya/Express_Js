const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(__dirname,'../public/images/usersImg')) //! add file path to store images and files 
    },
    filename: function (req, file, cb) {
      let fileName = '';
      const uniqueSuffix = Date.now()+'-'+Math.round(Math.random() * 1E9)
      if(file.originalname){
        fileName = file.originalname.replace(/ /g,'%20');
      }
      cb(null, `${uniqueSuffix}_${fileName}`) //! to add file name  
    }
  });

exports.upload = multer({storage : storage});