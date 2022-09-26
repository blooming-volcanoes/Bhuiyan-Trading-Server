/* eslint-disable consistent-return */
/* eslint-disable func-names */
const multer = require('multer');
const path = require('path');

/** Storage Engine */
const storage = multer.diskStorage({
    destination(req, file, cb) {
        console.log(req.params,"checking");
        if(req.params.category == 'category'){
            cb(null, path.join(__dirname, '..', 'storage','category'));
        }else if(req.params.background == 'background'){
            cb(null, path.join(__dirname, '..', 'storage','background'));
        }
        else{
            cb(null, path.join(__dirname, '..', 'storage','uploads'));
        }
    },
    filename(req, file, cb) {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
});

// init
const validateFile = function (file, cb) {
    const allowedFileTypes = /jpeg|jpg|png/;
    const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedFileTypes.test(file.mimetype);
    if (extension && mimeType) {
        return cb(null, true);
    }
    cb('Invalid file type. Only JPEG, PNG file are allowed.');
};

const uploader = multer({
    storage,
    limits: {  fileSize: 9.5 * 1024 * 1024 },
    fileFilter(req, file, callback) {
        validateFile(file, callback);
    },
});

module.exports = uploader;
