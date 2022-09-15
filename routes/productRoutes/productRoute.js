
const router = require('express').Router();
const { createProduct, getProduct, getByCategoryId, deleteProduct } = require('../../controller/product/productController');
const { isAuthenticated } = require('../../middleware/auth');



router.route('/add').post(isAuthenticated,createProduct)
router.route('/get').get(isAuthenticated, getProduct)
router.route('/categoryId/:id').get(isAuthenticated, getByCategoryId)
router.route('/delete/:id').delete(isAuthenticated,deleteProduct)

module.exports = router;