const { createCategory, getCategory } = require('../controller/categoryController');

const router = require('express').Router();


router.route('/add').post(createCategory)
router.route('/get').get(getCategory);


module.exports = router;