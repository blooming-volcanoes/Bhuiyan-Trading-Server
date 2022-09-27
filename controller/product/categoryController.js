const catchAsyncError = require('../../middleware/catchAsyncError');

const log4js = require('log4js');
const logger = log4js.getLogger();

const sendToken = require('../../lib/jwt.js');
const db = require('../../db/connection');
const { getCategoryArr } = require('../../services/getArr');

exports.createCategory =  catchAsyncError(async (req, res, next) => {
    let {categoryName, subCategoryName, featureImg, galleryImg} = req.body;

    if(!categoryName || !subCategoryName || !featureImg || !galleryImg){
        const message = `Both category and sub category filled in`;
              return next(new ErrorHandler(message, 400))
    }

    let query = "insert into productcategory(categoryName, subCategoryName, featureImg,galleryImg) values (?,?,?,?)";

    db.query(query, [categoryName, subCategoryName, featureImg, galleryImg], (err, result)=>{
       if(!err && result.affectedRows >0){
           return res.status(200).json({msg: "Category added"})
       }else{
        if(err.errno == 1062){
            return res.status(400).json({msg: "Category-name already exist"})
        }
           return res.status(500).json(err)
       }
    })

})



exports.getCategory =  catchAsyncError(async (req, res, next) => {

    var page = parseInt(req.query.page) || 0;
    var numPerPage = 10;
    var skip = (page - 1) * numPerPage;
    var limit = skip + ',' + numPerPage;

    let query;

    console.log(skip, limit,"cloj");
    if(skip >=0){
        query =  `select * from productcategory order by categoryName LIMIT ${limit}`;
       }else{
        query = `select * from productcategory order by categoryName`;
       }

    db.query(query, (err, result)=>{
        if(!err){
        const all = getCategoryArr(result)
            return res.status(200).json(all);
        }else{
            return res.status(500).json(err)
        }
    })

})


exports.updateCategory = catchAsyncError(async (req, res, next) => {
    const id = req.params.id;

    query = "update productcategory set ? where id=?";

    db.query(query, [req.body, id], (err, result) => {
        if (!err) {
            if (!result.affectedRows === 0) {
                return res.status(400).json({ msg: "Your Category id is incorrect" });
            }

            return res.status(200).json({ msg: "Your given input has updated sucessfully" });
        } else {
            if (err.errno === 1064) {

                return res.status(500).json("err: Your input is empty");
            }
            return res.status(500).json(err);
        }
    })


})
exports.deleteCategory = catchAsyncError(async (req, res, next) => {
    const id = req.params.id;

    query = "delete from productcategory where id=?";

    db.query(query, [id], (err, result) => {
        if (!err) {
            if (!result.affectedRows === 0) {
                return res.status(400).json({ msg: "Your Category id is incorrect" });
            }

            return res.status(200).json({ msg: "Your category has been deleted" });
        } else {

            return res.status(500).json(err);
        }
    })


})



/** Get Category by Product ID */

exports.getCategoryByID = (req, res, next) => {

    let {id} = req.params;
    // let getId = ID;
    let query = "select * from productcategory where id=?";

    db.query(query,[id], (err, result)=>{
        if(!err){
        const all = getCategoryArr(result)
            return res.status(200).json(all);
        }else{
            return res.status(500).json(err)
        }
    })

}