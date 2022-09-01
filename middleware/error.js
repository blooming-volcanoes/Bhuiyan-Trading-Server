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

    res.statusCode(err.statusCode).json({
        success: false,
        message: err.message
    })
}



