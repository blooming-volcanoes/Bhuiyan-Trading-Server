const db = require('../../db/connection');
const catchAsyncError = require('../../middleware/catchAsyncError');


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