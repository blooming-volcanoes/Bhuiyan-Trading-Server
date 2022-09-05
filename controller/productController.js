const prisma = require('../prisma/prisma-client.js')

const catchAsyncError = require('../middleware/catchAsyncError');
const ErrorHandler = require('../lib/errorHandler');
const { Prisma } = require('@prisma/client');
const db = require('../db/connection')




exports.createProduct = catchAsyncError(async (req, res, next) => {

    const {title, price, currency, unit, shortDesc, productDesc, featureImg,categoryId } = req.body;

    let query = "insert into products (title, price, currency, unit, shortDesc, productDesc, featureImg,categoryId) values (?,?,?,?,?,?,?,?)";

    db.query(query, [title, price, currency, unit, shortDesc, productDesc, featureImg,categoryId], (err, result) => {
        if (!err) {
            console.log(result);
            return res.status(200).json({ msg: "Product Added successfully" })
        } else {
            return res.status(500).json(err)
        }
    })

   
})



exports.getProduct =  catchAsyncError(async (req, res, next) => { 
    let query = "select p.id, p.title, p.shortDesc,p.productDesc, p.featureImg,p.unit, p.currency, p.price, c.id as categoryId, c.categoryName as categoryName from products as p INNER JOIN category as c where p.categoryId = c.id";

    db.query(query, (err, result) => {
        if (!err) {
            return res.status(200).json(result)
        } else {
            return res.status(500).json(err);
        }
    })
})

exports.getById =  catchAsyncError(async (req, res, next) => { 
    const id = req.params.id;

    // const product = 
})


