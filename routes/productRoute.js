const { createProduct } = require('../controller/productController');

const router = require('express').Router();




router.route('/add').post(createProduct)

module.exports = router;