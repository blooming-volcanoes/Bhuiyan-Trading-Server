const { DynamicHeader, updateHeader, getHeader, sponsorBrand, showBrand, deleteBrand } = require('./headerController');

const router = require('express').Router();


router.route('/').post(DynamicHeader).get(getHeader);
router.route("/:id").put(updateHeader);
router.route("/sponsor/brand").post(sponsorBrand).get(showBrand).delete(deleteBrand);



module.exports = router;


