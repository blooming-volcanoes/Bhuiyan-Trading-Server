const catchAsyncError = require('../../middleware/catchAsyncError');

const sendToken = require('../../lib/jwt.js');
const db = require('../../db/connection')

const log4js = require('log4js');
const { getImgGallaryArr } = require('../../services/getArr');
const logger = log4js.getLogger();



exports.createProduct = catchAsyncError(async (req, res, next) => {

    const {title, price, currency, unit, shortDesc, productDesc, featureImg, gallaryImg,categoryId } = req.body;

    let query = "insert into products (title, price, currency, unit, shortDesc, productDesc, featureImg, gallaryImg,categoryId) values (?,?,?,?,?,?,?,?,?)";

    db.query(query, [title, price, currency, unit, shortDesc, productDesc, featureImg, gallaryImg,categoryId], (err, result) => {
        if (!err) {
            logger.debug(result,"from create product");
            return res.status(200).json({ msg: "Product Added successfully" })
        } else {
            return res.status(500).json(err)
        }
    })

   
})



exports.getProduct =  catchAsyncError(async (req, res, next) => { 
    let query = "select p.id, p.title, p.shortDesc,p.productDesc, p.featureImg,p.unit, p.gallaryImg, p.currency, p.price, pc.id as categoryId, pc.categoryName as categoryName from products as p INNER JOIN category as pc where p.categoryId = pc.id";

    db.query(query, (err, result) => {

        if (!err) {
            // console.log(result);
         let getAll = getImgGallaryArr(result);
            // let newO = Object.assign(result[0], {gallaryImg:result[0].gallaryImg.split(";")} )
            return res.status(200).json(getAll)
        } else {
            return res.status(500).json(err);
        }
    })
})





exports.getByCategoryId =  catchAsyncError(async (req, res, next) => { 
    const id = req.params.id
    let query = "select id, title, price, shortDesc from products where categoryId=?";

    db.query(query, [id], (err, result)=>{
        if(!err){
            return res.status(200).json(result);
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
