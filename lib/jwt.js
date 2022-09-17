const jwt = require('jsonwebtoken');
const log4js = require('log4js');
const logger = log4js.getLogger();

// Create Token and saving in Cookie

const sendToken = (user, res, statusCode) => {
    logger.debug(user,"jwt token");
    const token =  jwt.sign({
        id: user.id,
        email: user.email,
        role:user.role,
    }, process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXPIRE
    }
    
    )

    res.status(statusCode).json({
        success: true,
        user,
        token,
    });
};
module.exports = sendToken;