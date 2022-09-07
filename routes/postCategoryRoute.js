const { createPostCategory } = require("../controller/Post/postCategoryController");

const router = require("express").Router();


router.route('/category').post(createPostCategory)


module.exports = router;