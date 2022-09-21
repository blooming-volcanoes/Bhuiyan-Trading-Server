const uploader = require('../../lib/multer');
const { uploadFile, bulkUpload, singleUpload } = require('./galleryController');

const galleryRouter = require('express').Router();

galleryRouter.route('/upload').post(uploader.single('img'), singleUpload )

galleryRouter.route('/bulkUpload').post(uploader.array('img'), bulkUpload);


module.exports = galleryRouter;
