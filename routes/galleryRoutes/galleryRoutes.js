const uploader = require('../../lib/multer');
const { uploadFile, bulkUpload, singleUpload, createImgGallery, getAllImg, getFiles, deleteFile } = require('./galleryController');

const galleryRouter = require('express').Router();

galleryRouter.route('/upload').post(uploader.single('img'), singleUpload );

galleryRouter.route('/bulkUpload').post(uploader.array('img'), bulkUpload);

galleryRouter.route('/img').post(createImgGallery).get(getAllImg);

galleryRouter.route('/files').get(getFiles)

galleryRouter.route('/file/:name').delete(deleteFile)


module.exports = galleryRouter;
