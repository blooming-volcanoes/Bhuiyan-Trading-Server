

const router = require('express').Router();
const { registerUser, loginUser, forgetPassword, changePassword } = require('../../controller/User/userController');
const { isAuthenticated } = require('../../middleware/auth');



// routes for user authentication

router.route('/signup').post(registerUser);
router.route('/login').post(loginUser);
router.route('/forgetPassword').post(forgetPassword);
router.route('/changePassword').post(isAuthenticated,changePassword);


module.exports = router;