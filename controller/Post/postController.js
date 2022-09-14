const catchAsyncError = require('../../middleware/catchAsyncError');

const sendToken = require('../../lib/jwt.js');
const db = require('../../db/connection')

exports.createPost =  catchAsyncError(async (req, res, next) => {
    const {title, categoryId, postDesc, featureImg, imgCaption, focusKey, metaDesc } = req.body;
    let slug;
     // convert to lower case
     slug = title.toLowerCase();

     slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
     slug = slug.replace(/ /gi, "-");
    let query = "insert into posts (title, categoryId, postDesc, featureImg, imgCaption, focusKey, metaDesc, slug) values (?,?,?,?,?,?,?,?)"
     // replace spaces with dash symbols

    db.query(query, [title, categoryId, postDesc, featureImg, imgCaption, focusKey, metaDesc, slug], (err, result) => {
        if (!err) {
            console.log(result);
            return res.status(200).json({ msg: "Product Added successfully" })
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



 