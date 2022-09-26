const { DynamicHeader, updateHeader, getHeader } = require('./headerController');

const router = require('express').Router();


router.route('/').post(DynamicHeader).get(getHeader);
router.route("/:id").put(updateHeader);




module.exports = router;


