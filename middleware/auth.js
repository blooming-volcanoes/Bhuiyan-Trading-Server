/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const { findById } = require('../controller/User/userController');
const errorHandler = require('../lib/errorHandler');
const catchAsyncError = require('./catchAsyncError');
require('dotenv').config();



exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
    console.log(req.headers.authorization, 'auth');
    const authorization = req.headers.authorization.split(' ')[1];
    if (!authorization) {
        return next(new errorHandler('Please Login to access this resource', 401));
    }

    const decodeData = jwt.verify(authorization, process.env.JWT_SECRET);
    console.log(decodeData,"Ol");
    req.user = findById(decodeData.id);
    console.log(req.user,"odlo");
    next();
});

// Checking wether that person is an admin or not
exports.authorizeRoles = (req, res, next) => {
    console.log(req.user,"reqes");
        if ((req.user.role) == 'admin') {
            return next(
                new errorHandler(`Role: ${req.user.role} is not allowed to access this resource`),
            );
        }
        next();
    };