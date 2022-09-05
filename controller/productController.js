const prisma = require('../prisma/prisma-client.js')

const catchAsyncError = require('../middleware/catchAsyncError');
const ErrorHandler = require('../lib/errorHandler');
const { Prisma } = require('@prisma/client');





exports.createProduct = catchAsyncError(async (req, res, next) => {

    const {title, price, currency, unit, shortDesc, ProductDesc, FeatureImg,categoryId } = req.body;

    try{
        
        const product = await prisma.product.create({
            data:{
                title, price, currency, unit, shortDesc, ProductDesc, FeatureImg,categoryId:{
                    connect:[
                     {id:1}
                    ]
                }
            }
        })

        console.log(product);

    }catch(err){

        console.log(err);
    }
})



exports.getProduct =  catchAsyncError(async (req, res, next) => { 
    const product = await prisma.product.findMany({});
    console.log(product);

    res.status(200).json({
        success: true,
        product
    })
})

exports.getById =  catchAsyncError(async (req, res, next) => { 
    const id = req.params.id;

    // const product = 
})


