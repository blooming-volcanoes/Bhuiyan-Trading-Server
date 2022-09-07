const { createPostCategory, getPostCategory } = require("../controller/Post/postCategoryController");

const router = require("express").Router();


router.route('/category').post(createPostCategory).get(getPostCategory)


module.exports = router;