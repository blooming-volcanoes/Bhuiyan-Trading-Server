const multer = require('multer');
const uploader = require('../../lib/multer');
const path = require('path');

const { uploadFile, bulkUpload, singleUpload, createImgGallery, getAllImg, getFiles, deleteFile, singleUploadCategory, bulkUploadCategory, getAllCategoryImg, deleteCategoryFile } = require('./galleryController');

const galleryRouter = require('express').Router();

galleryRouter.route('/upload').post(uploader.single('img'), singleUpload );
galleryRouter.route('/upload/:category').post(uploader.single('img'), singleUploadCategory );

galleryRouter.route('/bulkUpload').post(uploader.array('img'), bulkUpload);
galleryRouter.route('/bulkUpload/:category').post(uploader.array('img'), bulkUploadCategory);


galleryRouter.route('/files').get(getFiles)
galleryRouter.route('/files/:category').get(getAllCategoryImg)

galleryRouter.route('/file/:name').delete(deleteFile)
galleryRouter.route('/file/:category/:name').delete(deleteCategoryFile)


module.exports = galleryRouter;
