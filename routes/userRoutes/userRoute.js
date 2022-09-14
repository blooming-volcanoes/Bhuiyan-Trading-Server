

const router = require('express').Router();
const { registerUser, loginUser } = require('../../controller/User/userController')



// routes for user authentication

router.route('/signup').post(registerUser);
router.route('/login').post(loginUser)


module.exports = router;