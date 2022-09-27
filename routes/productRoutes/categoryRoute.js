const { createCategory, getCategory, getCategoryByID, updateCategory, deleteCategory } = require('../../controller/product/categoryController');


const router = require('express').Router();


router.route('/add').post(createCategory);
router.route('/get').get(getCategory);
router.route('/get/:id').get(getCategoryByID);
router.route('/update/:id').put(updateCategory);
router.route('/delete/:id').delete(deleteCategory);


module.exports = router;