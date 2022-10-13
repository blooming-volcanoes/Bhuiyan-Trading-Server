const { createPost, getPost, updatePost } = require('../../controller/Post/postController');



const router = require('express').Router();


router.route('/blog').post(createPost).get(getPost);
router.route('/blog/:id').put(updatePost);


module.exports = router;