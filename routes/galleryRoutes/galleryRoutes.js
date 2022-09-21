const uploader = require('../../lib/multer');
const { uploadFile } = require('./galleryController');

const galleryRouter = require('express').Router();

galleryRouter.route('/upload').post(uploader.single('img'), uploadFile);

module.exports = galleryRouter;
