const multer = require('multer');
const uploader = require('../../lib/multer');
const path = require('path');

const { uploadFile, bulkUpload, singleUpload, createImgGallery, getAllImg, getFiles, deleteFile, singleUploadCategory, bulkUploadCategory, getAllCategoryImg, deleteCategoryFile, headerBackground, singleUploadBlog, bulkUploadBlog } = require('./galleryController');

const galleryRouter = require('express').Router();

galleryRouter.route('/upload').post(uploader.single('img'), singleUpload );
galleryRouter.route('/upload/:category').post(uploader.single('img'), singleUploadCategory );
galleryRouter.route('/blog/:blogImg').post(uploader.single('img'), singleUploadBlog)


galleryRouter.route('/upload/img/:background').post(uploader.single('img'), headerBackground );

galleryRouter.route('/bulkUpload').post(uploader.array('img'), bulkUpload);
galleryRouter.route('/bulkUpload/:category').post(uploader.array('img'), bulkUploadCategory);
galleryRouter.route('/bulkUpload/blog/:blogImg').post(uploader.array('img'), bulkUploadBlog);


galleryRouter.route('/files').get(getFiles)
galleryRouter.route('/files/:category').get(getAllCategoryImg)

galleryRouter.route('/file/:name').delete(deleteFile)
galleryRouter.route('/file/:category/:name').delete(deleteCategoryFile)



module.exports = galleryRouter;
