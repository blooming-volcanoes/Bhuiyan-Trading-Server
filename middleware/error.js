/***
 * Catch most common error before crashing server show it to the user
 */

const { Prisma } = require("@prisma/client");


module.exports = (error, req, res, next)=>{
    let err = error;
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';


    //DB credentioal error
    if(err instanceof Prisma.PrismaClientKnownRequestError){
        if(err.code === 'P1000'){
            const message =` Authentication failed against database server at {database_host}` ;
            err = new ErrorHandler(message, 400);
        }

        console.log("ig ot ", err.code);

        if (err.code === 'P2002') {
        console.log("i wan tto say this error eoro");

            const message = 
              'There is a unique constraint violation, a new user cannot be created with this email'
              err = new ErrorHandler(message, 400);   
        }
        if(err.code === 'P1008'){
            const message =` Operations timed out after {time}` ;
            err = new ErrorHandler(message, 400);
        }
        if(err.code === 'P1013'){
            const message =` The provided database string is invalid. {details}` ;
            err = new ErrorHandler(message, 400);
        }


    }


    //Wrong JWT error

    if(err.name === 'JsonWebTokenError'){
        const message = 'Json Web Token is invalid, Try again ';
        err = new ErrorHandler(message, 400);
    }

    //JWT Expire error

    if(err.name === 'TokenExpiredError'){
        const message = 'Json Web Token is Expired, Try again ';
        err = new ErrorHandler(message, 400)
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
}



