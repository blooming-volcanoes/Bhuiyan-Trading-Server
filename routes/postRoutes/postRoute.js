const { createPost, getPost, updatePost, getPostBySlug, deletePost } = require('../../controller/Post/postController');



const router = require('express').Router();


router.route('/blog').post(createPost).get(getPost);
router.route('/blog/:id').put(updatePost);
router.route('/blog/:slug').get(getPostBySlug);
router.route('/blog/:slug').delete(deletePost);


module.exports = router;