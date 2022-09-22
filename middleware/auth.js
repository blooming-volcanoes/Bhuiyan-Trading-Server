/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const { findById } = require('../controller/User/userController');
const errorHandler = require('../lib/errorHandler');
const catchAsyncError = require('./catchAsyncError');
require('dotenv').config();

const log4js = require('log4js');
const logger = log4js.getLogger();



exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
    if(!req.headers.authorization){
        return next(new errorHandler('Please Login to access this resource', 401));
    }
    const authorization = req.headers.authorization.split(' ')[1];
    if (!authorization) {
        return next(new errorHandler('Please Login to access this resource', 401));
    }

    const decodeData = await jwt.verify(authorization, "secret");
    req.user = (decodeData);
    logger.debug(req.user, "is authenticated file");
    if(req.user){
        logger.debug(req.user,"req user");
        next();
    }
});

// Checking wether that person is an admin or not
exports.authorizeRoles = (req, res, next) => {
    logger.debug(req.user,"authorize roles");
        if ((req.user.role) !== 'admin') {
            return next(
                new errorHandler(`Role: ${req.user.role} is not allowed to access this resource`),
            );
        }
        next();
    };