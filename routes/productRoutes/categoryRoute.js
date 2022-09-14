

const router = require('express').Router();


router.route('/add').post();
router.route('/get').get(getCategory);


module.exports = router;