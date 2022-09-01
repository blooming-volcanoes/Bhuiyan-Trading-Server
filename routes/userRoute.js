const { registerUser } = require('../controller/userController');

const router = require('express').Router();




// routes for user authentication


router.route('/signup').post(registerUser);


module.exports = router;