
const router = require('express').Router();
const { createProduct, getProduct, getByCategoryId, deleteProduct, getSingleProduct } = require('../../controller/product/productController');
const { isAuthenticated, authorizeRoles } = require('../../middleware/auth');



router.route('/add').post(isAuthenticated, authorizeRoles,createProduct)
router.route('/get').get( getProduct)
router.route('/get/:id').get( getSingleProduct);
router.route('/categoryId/:id').get( getByCategoryId)
router.route('/delete/:id').delete(isAuthenticated, authorizeRoles,deleteProduct)

module.exports = router;