const { postContact, getContacDetails, deleteContact, searchContact } = require('./contactController');

const router = require('express').Router();



router.route('/').post(postContact).get(getContacDetails);
router.route('/:id').delete(deleteContact);
router.route('/search').post(searchContact);




module.exports = router;