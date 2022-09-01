const { registerUser, loginUser } = require('../controller/userController');

const router = require('express').Router();




// routes for user authentication


router.route('/signup').post(registerUser);
router.route('/login').post(loginUser)


module.exports = router;