const { createPost } = require('../controller/Post/postController');



const router = require('express').Router();


router.route('/post').post(createPost);


module.exports = router;