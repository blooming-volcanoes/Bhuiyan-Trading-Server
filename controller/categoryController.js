const prisma = require('../prisma/prisma-client.js')
const catchAsyncError = require('../middleware/catchAsyncError');

const { Prisma } = require('@prisma/client');
const ErrorHandler = require('../lib/errorHandler.js');


exports.createCategory =  catchAsyncError(async (req, res, next) => {
    console.log("oimaoo");
    let {categoryName, subCategoryName} = req.body;

    if(!categoryName || !subCategoryName){
        const message = `Both category and sub category filled in`;
              return next(new ErrorHandler(message, 400))
    }

    try{
        let category = await prisma.category.create({
            data:{
                categoryName,
                subCategoryName
            }
        })

        console.log(category,"o");

      return res.status(200).json({
            success: true,
           msg: "Category is successfully added"
        });

    }catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
              const message = `Category name already Exist`;
              return next(new ErrorHandler(message, 400))
            }
          }
      
          throw err;
    }

})



exports.getCategory =  catchAsyncError(async (req, res, next) => {

   const category = await prisma.category.findMany();

   return res.status(200).json({
    success: true,
    category
});
})