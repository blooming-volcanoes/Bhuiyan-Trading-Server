const { createProduct, getProduct } = require('../controller/productController');

const router = require('express').Router();




router.route('/add').post(createProduct)
router.route('/get').get(getProduct)

module.exports = router;