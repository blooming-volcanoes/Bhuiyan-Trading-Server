const { createPost, getPost, updatePost, getPostBySlug, deletePost, searchPost } = require('../../controller/Post/postController');



const router = require('express').Router();


router.route('/blog').post(createPost).get(getPost);
router.route('/blog/:id').put(updatePost);
router.route('/blog/:slug').get(getPostBySlug);
router.route('/blog/:slug').delete(deletePost);
router.route('/search').post(searchPost);

module.exports = router;