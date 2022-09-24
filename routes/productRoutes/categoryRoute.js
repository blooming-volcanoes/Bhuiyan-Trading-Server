const { createCategory, getCategory, getCategoryByID } = require('../../controller/product/categoryController');


const router = require('express').Router();


router.route('/add').post(createCategory);
router.route('/get').get(getCategory);
router.route('/get/:id').get(getCategoryByID);


module.exports = router;