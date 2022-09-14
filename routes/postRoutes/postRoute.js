const { createPost, getPost } = require('../../controller/Post/postController');



const router = require('express').Router();


router.route('/post').post(createPost).get(getPost);


module.exports = router;