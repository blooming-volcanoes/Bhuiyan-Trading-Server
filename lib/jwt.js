const jwt = require('jsonwebtoken');


// Create Token and saving in Cookie

const sendToken = (user, res, statusCode) => {
    console.log(user);
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