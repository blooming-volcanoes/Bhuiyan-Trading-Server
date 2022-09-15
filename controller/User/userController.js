
require('dotenv').config();
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const catchAsyncError = require('../../middleware/catchAsyncError');

const sendToken = require('../../lib/jwt.js');
const db = require('../../db/connection');
const ErrorHandler = require('../../lib/errorHandler');


/** Register User */
exports.registerUser =  (req, res, next) => {
  
  let {name, password, email,contactNumber} = req.body;

  // console.log("oso",name, password, email,contactNumber);
 let query = "select email from user where email=?";

 try{
   db.query(query,[email], (err, result)=>{
        console.log(err,"oel",result);
        if(!err){
          console.log(result.length);
          if(result.length >0){
              return res.status(400).json({msg:"Email already exist"})
          }else{
              query = "insert into user(name,email,contactNumber, password,status,role) values (?,?,?,?,'active','user')";

              db.query(query, [ name,email,contactNumber, password], (err, result)=>{
                  if(!err){
                    console.log(result,"oo",err);
                    query = "select * from user"
                    // let res = db.query
                    // sendToken(result[0],res, 200)
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
  let query = "select email, password, role, status,name, id from user where email=?";
  
  db.query(query,[email], (err, result)=>{
        console.log(err, result[0].password);
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
                  return res.status(400).json({msg: "Password didn't match"})
              }
          }else{
              res.status(500).json({msg: err})
          }
      })
})

let transporter = nodemailer.createTransport({
  service: 'Yandex',
  auth:{
      user: process.env.EMAIL,
      pass: process.env.PASS
  }
})


exports.forgetPassword = catchAsyncError(async (req, res, next) => { 
  let user = req.body;
  let query = "select email, password from user where email=?"

  console.log(process.env.EMAIL, process.env.PASS);
  db.query(query,[user.email], (err, result)=>{
      if(!err){
          if(result.length <=0 ){
              res.status(200).json({msg: "your mail is not enlisted"})
          }else{
              let mailOptions = {
                  from: process.env.EMAIL,
                  to: result[0].email,
                  subject: "Your Lost password by bhuiyantrad",
                  html: `<p>
                      <b>Your login detail are </b> </br>
                      <b> ${result[0].password}</b>
                  </p>`
              }

              transporter.sendMail(mailOptions, (err, info)=>{
                  if(err){
                      res.status(500).json({msg: err})
                  }else{
                     if(info.response){

                         res.status(200).json({msg: "YOur password sent successfully"})
                     }
                  }
              })

             
          }
      }else{
          res.status(500).json({msg: err})
      }
  })
})


/** Change Password */

exports.changePassword = catchAsyncError(async (req, res, next) => { 
  console.log(req.user,"ofaload");
  const email = req.user.email;
    const {oldPass, newPass, confirmPass} = req.body;
    let query = "select * from user where email=?";

    db.query(query, [email], (err, result)=>{
        if(!err){
            const passCompare = oldPass === result[0].password
            console.log(result, passCompare);
            if( !passCompare){
                return res.status(400).json({msg: "Your old Password is incorrect"})
            } else if(passCompare){
              if(newPass !== confirmPass){
                return (new ErrorHandler("new password didn't match"))
              }
                query = "update user set password=? where email=?";
                db.query(query, [newPass, email], (err, result)=>{
                    if(!err){
                        return res.status(200).json({msg: "YOur password has been sucessfully changed"})
                    }else{
                        return res.status(500).json(err)
                    }
                })

            }else{
                return res.status(500).json(err)
            }
        }else{
            return res.status(500).json({msg: "Something went wrong, please try again later"})
        }
    })

})







exports.findById=(id)=>{
  const query = "select id, email, role from user where id=?"
  console.log(id,"formo re");
  db.query(query,[id], (err, result)=>{
    if(!err){
      console.log(result[0],"don't know");
      return result[0];
    }
  })
}