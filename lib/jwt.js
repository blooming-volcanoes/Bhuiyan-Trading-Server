const jwt = require('jsonwebtoken');

// Create Token and saving in Cookie


const sendToken = (user, res, statusCode) => {
    const token =  jwt.sign({
        id: user.id,
        email: user.email,
        role:user.role,
    }, "secret",
    {
        expiresIn: "24h"
    }
    )

    res.status(statusCode).json({
        success: true,
        user,
        token,
    });
};
module.exports = sendToken;