/***
 * Catch most common error before crashing server show it to the user
 */

const ErrorHandler = require("../lib/errorHandler");


module.exports = (error, req, res, next)=>{
    let err = error;
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';


    //DB credentioal error

    if(err.name === "sqlMessage"){
        err = new ErrorHandler("message", 400);
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



