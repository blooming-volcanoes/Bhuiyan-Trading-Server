const { DynamicHeader, updateHeader } = require('./headerController');

const router = require('express').Router();


router.route('/').post(DynamicHeader).put(updateHeader);




module.exports = router;


