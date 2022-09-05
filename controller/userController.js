


const prisma = require('../prisma/prisma-client.js')
const bcrypt = require('bcrypt')
const catchAsyncError = require('../middleware/catchAsyncError');
const ErrorHandler = require('../lib/errorHandler');
const { Prisma } = require('@prisma/client');
const sendToken = require('../lib/jwt.js');
const db = require('../db/connection')


/** Register User */
exports.registerUser =  (req, res, next) => {
  
  let {name, password, email,contactNumber} = req.body;

  console.log("oso",name, password, email,contactNumber);
 let query = "select email from user where email=?";

 try{
   db.query(query,[email], (err, result)=>{
        console.log(err,"oel",result);
        if(!err){
          console.log(result.length);
          if(result.length >0){
              return res.status(400).json({msg:"Email already exist"})
          }else{
              query = "insert into User(name,email,contactNumber, password,status,role) values (?,?,?,?,'active','user')";

              db.query(query, [ name,email,contactNumber, password], (err, result)=>{
                  if(!err){
                    sendToken(result[0],res, 200)
                  }else{
                      return res.status(500).json(err)
                  }
              })
          }
      }else{
          res.status(500).json({msg:err})
      }
      })

  }catch(err){
    throw err;
  }


}


/** Login user */

exports.loginUser = catchAsyncError(async (req, res, next) => {
  let {email, password} = req.body
  let query = "select email, password, role, status,name from user where email=?";
  
 
  db.query(query,[email], (err, result)=>{
        console.log(err, result);
        // let compare = 
          if(!err){
              if(result.length <=0 ){
                  return res.status(401).json({msg: "Incorrect username or password"})
              }else if(result[0].status == "false"){
                  console.log("Odoo");
                  return res.status(401).json({msg: "Wait for the admin approval"})
              }else if(password === result[0].password){
                sendToken(result[0],res, 200)
              }else{
                  return res.status(500).json({msg: "smeting went wrong"})
              }
          }else{
              res.status(500).json({msg: err})
          }
      })

})
