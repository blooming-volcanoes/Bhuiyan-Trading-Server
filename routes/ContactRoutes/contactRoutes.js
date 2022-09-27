const { postContact, getContacDetails, deleteContact } = require('./contactController');

const router = require('express').Router();



router.route('/').post(postContact).get(getContacDetails)
router.route('/:id').delete(deleteContact);




module.exports = router;