const multer = require("multer")

const path = require('path');
const ErrorHandler = require("./errorHandler");
const UPLOADS_FOLDER = '../lib/'; 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname);
      },
      filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const fileName =
          file.originalname
            .replace(fileExt, "")
            .toLowerCase()
            .split(" ")
            .join("-") +
          "-" +
          Date.now();
    
        cb(null, fileName + fileExt);
      },
});

const verifyFile = (req,file,cb)=>{
    console.log(file.fieldname,"checking");
    if(file.fieldname === "uploadFile"){
        if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg"
          ) {
            cb(null, true);
          } else {
            cb(new Error("Only .jpg, .png or .jpeg format allowed!"));
          }
    }else{
        cb(new Error("there was an unknow error"));
    }


}


const upload = multer({storage,  limits:{fileSize: 15000000}, fileFilter:verifyFile})

module.exports = upload;