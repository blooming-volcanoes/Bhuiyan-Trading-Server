
const router = require('express').Router();
const { createProduct, getProduct, getByCategoryId, deleteProduct } = require('../../controller/product/productController')



router.route('/add').post(createProduct)
router.route('/get').get(getProduct)
router.route('/categoryId/:id').get(getByCategoryId)
router.route('/delete/:id').delete(deleteProduct)

module.exports = router;