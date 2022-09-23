const catchAsyncError = require('../../middleware/catchAsyncError');

const sendToken = require('../../lib/jwt.js');
const db = require('../../db/connection')

const log4js = require('log4js');
const {  getProductArr } = require('../../services/getArr');
const logger = log4js.getLogger();


/** Create Product */
exports.createProduct = catchAsyncError(async (req, res, next) => {

    const {title, price, currency, unit, shortDesc, productDesc, featureImg, gallaryImg,categoryId,categoryName,subCategoryName } = req.body;

    let query = "insert into products (title, price, currency, unit, shortDesc, productDesc, featureImg, gallaryImg,categoryId,categoryName, subCategoryName) values (?,?,?,?,?,?,?,?,?,?,?)";

    db.query(query, [title, price, currency, unit, shortDesc, productDesc, featureImg, gallaryImg,categoryId,categoryName, subCategoryName], (err, result) => {
        if (!err) {
            logger.debug(result,"from create product");
            return res.status(200).json({ msg: "Product Added successfully" })
        } else {
            return res.status(500).json(err)
        }
    })
   
})



/** Get a single Product by passing id */

exports.getSingleProduct =  catchAsyncError(async (req, res, next) => { 
    console.log("id");
    let {id} = req.params;
    let query = "select * from products where id=?";
    db.query(query, [id], (err, result)=>{
        if(!err){
            return res.status(200).json(result);
        }else{
            return res.status(500).json(err);
        }
    })

})




/** Get all the Product */

exports.getProduct =  catchAsyncError(async (req, res, next) => { 
    let query = "select * from products";

    db.query(query, (err, result) => {

        if (!err) {
            // console.log(result);
         let getAll = getProductArr(result);
            // let newO = Object.assign(result[0], {gallaryImg:result[0].gallaryImg.split(";")} )
            return res.status(200).json(getAll)
        } else {
            return res.status(500).json(err);
        }
    })
})




/** Get Product by passing CategoryID */

exports.getByCategoryId =  catchAsyncError(async (req, res, next) => { 
    const id = req.params.id
    let query = "select * from products where categoryId=?";

    db.query(query, [id], (err, result)=>{
        if(!err){
            let getAll = getProductArr(result);
            // let newO = Object.assign(result[0], {gallaryImg:result[0].gallaryImg.split(";")} )
            return res.status(200).json(getAll)
        }else{
            return res.status(500).json(err);
        }
    })
})


/** Get Product by passing sub-Category Name */

exports.getBySubCategory =  catchAsyncError(async (req, res, next) => { 
    const {name} = req.params;
    let get = '%name%';
    let query = `select * from products where subCategoryName like '%${name}%'`;

    db.query(query, (err, result)=>{
        if(!err){
            // console.log(result,"eror", err);
            let getAll = getProductArr(result);
            return res.status(200).json(getAll)
        }else{
            return res.status(500).json(err);
        }
    })
})




exports.deleteProduct =  catchAsyncError(async (req, res, next) => { 
    const id = req.params.id;

    let query = "delete from products where id=?";

    db.query(query, [id], (err, result)=>{

        if(!err){
            if(result.affectedRows === 0){
                return res.status(404).json({msg: "Product id doesn't found"});
            }

            return res.status(200).json({msg:"your product has been successfully deleted"});
        }else{
            return res.status(500).json(err);
        }
    })


})
