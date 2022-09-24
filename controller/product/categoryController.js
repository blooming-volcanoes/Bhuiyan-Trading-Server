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

    let query = "select * from productcategory order by categoryName";

    db.query(query, (err, result)=>{
        if(!err){
        const all = getCategoryArr(result)
            return res.status(200).json(all);
        }else{
            return res.status(500).json(err)
        }
    })



})



/** Get Category by Product ID */

exports.getCategoryByID = (req, res, next) => {

    let {id} = req.params;
    console.log(id,"chingko");
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