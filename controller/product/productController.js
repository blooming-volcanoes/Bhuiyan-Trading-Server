const catchAsyncError = require('../../middleware/catchAsyncError');

const sendToken = require('../../lib/jwt.js');
const db = require('../../db/connection')

const log4js = require('log4js');
const { getProductArr } = require('../../services/getArr');
const { getCategoryByID } = require('./categoryController');
const { default: axios } = require('axios');
const { promise } = require('../../db/connection');
const logger = log4js.getLogger();


/** Create Product */
exports.createProduct = catchAsyncError(async (req, res, next) => {

    const { title, price, currency, unit, shortDesc, productDesc, featureImg, gallaryImg, categoryId, categoryName, subCategoryName } = req.body;

    let query = "insert into products (title, price, currency, unit, shortDesc, productDesc, featureImg, gallaryImg,categoryId,categoryName, subCategoryName) values (?,?,?,?,?,?,?,?,?,?,?)";

    db.query(query, [title, price, currency, unit, shortDesc, productDesc, featureImg, gallaryImg, categoryId, categoryName, subCategoryName], (err, result) => {
        if (!err) {
            logger.debug(result, "from create product");
            return res.status(200).json({ msg: "Product Added successfully" })
        } else {
            return res.status(500).json(err)
        }
    })

})



/** Get a single Product by passing id */

exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
    console.log("id");
    let { id } = req.params;
    let query = "select * from products where id=?";
    db.query(query, [id], (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    })

})




/** Get all the Product */

exports.getProduct = catchAsyncError(async (req, res, next) => {
    var page = parseInt(req.query.page, 10) || 0;
    var numPerPage = 1;
    var skip = (page - 1) * numPerPage;
    var limit = skip + ',' + numPerPage;
    let query;
    if(skip >=0){

     query = 'select * from products LIMIT ' + limit;
    }else{
        query = 'select * from products'
    }

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


/** Search Product by title */
exports.searchProduct = catchAsyncError(async (req, res, next) => {

    let {title} = req.body;


    var page = parseInt(req.query.page, 10) || 0;
    var numPerPage = 1;
    var skip = (page - 1) * numPerPage;
    var limit = skip + ',' + numPerPage;
    let query;
    if(skip >=0){

     query = "select * from products where title like ?" + limit;
    }else{
        query ="select * from products where title like ?"
    }

    db.query(query,[title], (err, result)=>{
        if(!err){
            if(result.length>0){
                return res.status(200).json(result)
            }else{
                return res.status(200).json({msg: "Sorry no result found"})
            }
        }else{
            return res.status(500).json(err)
        }
    })

})




/** Get Product by passing CategoryID */

exports.getByCategoryId = catchAsyncError((req, res, next) => {
    const id = req.params.id
    var page = parseInt(req.query.page, 10) || 0;
    var numPerPage = 1;
    var skip = (page - 1) * numPerPage;
    var limit = skip + ',' + numPerPage;

    let query;
    if(skip >=0){
        query = `select * from products where categoryId=? LIMIT  ${limit}`;
       }else{
        query = `select * from products where categoryId=? `;
       }

    db.query(query, [id], async (err, results) => {
        if (!err) {
            let getAll = getProductArr(results);

            let newO=[];
            for(const result of getAll){
                const id = (result.categoryId);
                let getID = await axios.get(`http://localhost:5000/category/get/${id}`);
                

                 newO.push(Object.assign(result, { categoryFeatureImg: getID.data[0].featureImg, categoryGallay: getID.data[0].galleryImg }))
            } 
            return res.status(200).json(newO)
        } else {
            return res.status(500).json(err);
        }
    })
})


/** Get Product by passing sub-Category Name */

exports.getBySubCategory = catchAsyncError(async (req, res, next) => {
    const { name } = req.params;

    var page = parseInt(req.query.page) || 0;
    var numPerPage = 1;
    var skip = (page - 1) * numPerPage;
    var limit = skip + ',' + numPerPage;

    let query;
    if(skip >=0){
        query = `select * from products where subCategoryName like '%${name}%' LIMIT  ${limit}`;
       }else{
        query = `select * from products where subCategoryName like '%${name}%'`;
       }

    db.query(query, (err, result) => {
        if (!err) {
            // console.log(result,"eror", err);
            let getAll = getProductArr(result);
            return res.status(200).json(getAll)
        } else {
            return res.status(500).json(err);
        }
    })
})




exports.updateProduct = catchAsyncError(async (req, res, next) => {
    const id = req.params.id;

    query = "update products set ? where id=?";

    db.query(query, [req.body, id], (err, result) => {
        if (!err) {
            if (!result.affectedRows === 0) {
                return res.status(400).json({ msg: "Your product id is incorrect" });
            }

            return res.status(200).json({ msg: "Your given input has updated sucessfully" });
        } else {
            if (err.errno === 1064) {

                return res.status(500).json("err:Your input is empty");
            }
            return res.status(500).json(err);
        }
    })


})



exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    const id = req.params.id;

    let query = "delete from products where id=?";

    db.query(query, [id], (err, result) => {

        if (!err) {
            if (result.affectedRows === 0) {
                return res.status(404).json({ msg: "Product id doesn't found" });
            }

            return res.status(200).json({ msg: "your product has been successfully deleted" });
        } else {
            return res.status(500).json(err);
        }
    })


})
