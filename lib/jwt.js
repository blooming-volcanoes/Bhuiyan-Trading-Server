const jwt = require('jsonwebtoken');
const log4js = require('log4js');
const logger = log4js.getLogger();

// Create Token and saving in Cookie


const sendToken = (user, res, statusCode) => {
    logger.debug(user, "from token");
    const token =  jwt.sign({
        id: user.id,
        email: user.email,
        role:user.role,
    }, "secret",
    {
        expiresIn: "24h"
    }
    )
    logger.debug(token,"identify jwt token")

    res.status(statusCode).json({
        success: true,
        user,
        token,
    });
};
module.exports = sendToken;