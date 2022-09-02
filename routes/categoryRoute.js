const { createCategory } = require('../controller/categoryController');

const router = require('express').Router();


router.route('/add').post(createCategory)


module.exports = router;