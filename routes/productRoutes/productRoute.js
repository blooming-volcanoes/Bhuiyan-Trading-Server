
const router = require('express').Router();
const { createProduct, getProduct, getByCategoryId, deleteProduct, getSingleProduct, getBySubCategory, updateProduct, searchProduct } = require('../../controller/product/productController');
const { isAuthenticated, authorizeRoles } = require('../../middleware/auth');



router.route('/add').post(isAuthenticated, authorizeRoles,createProduct);
router.route('/get').get( getProduct);
router.route('/search').post(searchProduct);
router.route('/get/:id').get( getSingleProduct);
router.route('/categoryId/:id').get( getByCategoryId);
router.route('/subCategory/:name').get( getBySubCategory);
router.route('/update/:id').put(updateProduct);
router.route('/delete/:id').delete(isAuthenticated, authorizeRoles,deleteProduct);

module.exports = router;