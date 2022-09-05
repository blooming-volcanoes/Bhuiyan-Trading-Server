const { createProduct, getProduct, getByCategoryId, deleteProduct } = require('../controller/productController');

const router = require('express').Router();




router.route('/add').post(createProduct)
router.route('/get').get(getProduct)
router.route('/categoryId/:id').get(getByCategoryId)
router.route('/delete/:id').delete(deleteProduct)

module.exports = router;