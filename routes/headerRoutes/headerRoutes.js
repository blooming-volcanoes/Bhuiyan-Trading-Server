const { DynamicHeader, updateHeader, getHeader, sponsorBrand } = require('./headerController');

const router = require('express').Router();


router.route('/').post(DynamicHeader).get(getHeader);
router.route("/:id").put(updateHeader);
router.route("/sponsor/brand").post(sponsorBrand);



module.exports = router;


