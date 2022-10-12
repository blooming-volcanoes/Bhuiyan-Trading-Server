const catchAsyncError = require('../../middleware/catchAsyncError');

const log4js = require('log4js');
const logger = log4js.getLogger();

const sendToken = require('../../lib/jwt.js');
const db = require('../../db/connection')

exports.createPost =  catchAsyncError(async (req, res, next) => {
    const {title, categoryId, postDesc, featureImg, imgCaption, focusKey, metaDesc } = req.body;
    let slug;
     // convert to lower case
     slug = title.toLowerCase();
     // replace spaces with dash symbols
     slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
     slug = slug.replace(/ /gi, "-");

    let query = "insert into posts (title, categoryId, postDesc, featureImg, imgCaption, focusKey, metaDesc,alt, status, slug) values (?,?,?,?,?,?,?,?,?,?)"


    db.query(query, [title, categoryId, postDesc, featureImg, imgCaption, focusKey, metaDesco, alt, status, slug], (err, result) => {
        if (!err) {
            logger.debug(result,"from create post");
            return res.status(200).json({ msg: "Post created Successfully" })
        } else {
            return res.status(500).json(err)
        }
    })
  
 })



 exports.getPost =  catchAsyncError(async (req, res, next) => { 
    let query = "select p.title, p.postDesc, p.featureImg, p.imgCaption, p.focusKey, p.metaDesc, p.slug, pc.id as categoryId, pc.categoryName as categoryName from posts as p inner join postCategory as pc where p.categoryId = pc.id";

    db.query(query, (err, result) => {
        if (!err) {
            return res.status(200).json(result)
        } else {
            return res.status(500).json(err);
        }
    })
 })



 