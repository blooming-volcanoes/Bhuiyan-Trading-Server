


const prisma = require('../prisma/prisma-client.js')
const bcrypt = require('bcrypt')
const catchAsyncError = require('../middleware/catchAsyncError');
const ErrorHandler = require('../lib/errorHandler');
const { Prisma } = require('@prisma/client');



exports.registerUser = catchAsyncError(async(req, res, next)=>{
    const {name, pass, email} = req.body;
  // console.log(name, password, email);
    if(!name || !pass || !email){
      return next(new ErrorHandler("provide valid credentials", 400))
    }
    let password =  await bcrypt.hash (pass, 10);
 
    try{

      const user = await prisma.user.create({
        data:{
          email,
          name,
          password
        }
      })
  
      res.status(200).json({
        success: true,
        user: user
      })
    }catch(err){
      // console.log(err);
      if(err instanceof Prisma.PrismaClientKnownRequestError){
        if(err.code === 'P2002'){
            const message =`'There is a unique constraint violation, a new user cannot be created with this email` ;
           return next(new ErrorHandler(message, 400))
        }
      }

      throw err;
    }


})

