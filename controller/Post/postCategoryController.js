const log4js = require('log4js');
const logger = log4js.getLogger();

const sendToken = require('../../lib/jwt.js');
const db = require('../../db/connection')



exports.createPostCategory =  (async (req, res, next) => {
    let {categoryName, subCategoryName} = req.body;

    if(!categoryName || !subCategoryName){
        const message = `Both category and sub category filled in`;
              return next(new ErrorHandler(message, 400))
    }

    let query = "insert into postCategory(categoryName, subCategoryName) values (?,?)";

    db.query(query, [categoryName, subCategoryName], (err, result)=>{
       if(!err && result.affectedRows >0){
           return res.status(200).json({msg: "Category added"})
       }else{
           return res.status(500).json(err)
       }
    })

})


exports.getPostCategory =  (async (req, res, next) => {

    let query = "select * from category order by categoryName";

    db.query(query, (err, result)=>{
        if(!err){
            return res.status(200).json(result)
        }else{
            return res.status(500).json(err)
        }
    })



})
