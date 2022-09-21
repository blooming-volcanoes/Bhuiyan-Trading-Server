const uploader = require('../../lib/multer');
const { uploadFile, bulkUpload, singleUpload, createImgGallery, getAllImg } = require('./galleryController');

const galleryRouter = require('express').Router();

galleryRouter.route('/upload').post(uploader.single('img'), singleUpload );

galleryRouter.route('/bulkUpload').post(uploader.array('img'), bulkUpload);

galleryRouter.route('/img').post(createImgGallery).get(getAllImg);


module.exports = galleryRouter;
