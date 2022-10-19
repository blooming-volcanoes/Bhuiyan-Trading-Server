const catchAsyncError = require('../../middleware/catchAsyncError');
const nodeCron = require("node-cron");
const EventEmitter = require('events');
const event = new EventEmitter();

const sendToken = require('../../lib/jwt.js');
const db = require('../../db/connection');

exports.createPost =  catchAsyncError(async (req, res, next) => {
    const {title, categoryId, postDesc, featureImg, imgCaption, focusKey, metaDesc, alt, status, } = req.body;

    if(status == 'now'){
        await schedulePost(req,res)
    }else {
        
        // "0 1 19 12 October Wednesday"
        /**
         * 0- means seconds
         * 1- means minitues
         * 19 - hour(24h)
         * October - change into month you want publish
         * Wednesday - change into the day you want to publish
         */
       res.json("Post schduled")
        const job = nodeCron.schedule(status, async()=>{
            
            await schedulePost(req,res)
            event.emit('JOB COMPLETED');
        });
        
 // Listen to when a 'JOB COMPLETED' event is emitted and stop the task
        event.on('JOB COMPLETED', () => {
            console.log('Job done!');
            job.stop();
        });
    }
 })





 exports.getPost = catchAsyncError(async (req, res, next) => {
    var page = parseInt(req.query.page, 10) || 0;
    var numPerPage = 10;
    var skip = (page - 1) * numPerPage;
    var limit = skip + ',' + numPerPage;
    let query;
    if(skip >=0){

     query = 'select * from posts LIMIT ' + limit;
    }else{
        query = 'select * from posts'
    }

    db.query(query, (err, result) => {

        if (!err) {
            // console.log(result);
            // let getAll = getProductArr(result);
            // let newO = Object.assign(result[0], {gallaryImg:result[0].gallaryImg.split(";")} )
            return res.status(200).json(result)
        } else {
            return res.status(500).json(err);
        }
    })
})




 exports.updatePost = catchAsyncError(async (req, res, next) => {
    const id = req.params.id;

    query = "update posts set ? where id=?";

    db.query(query, [req.body, id], (err, result) => {
        if (!err) {
            if (!result.affectedRows === 0) {
                return res.status(400).json({ msg: "Your posts id is incorrect" });
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


/** Search post by title */
exports.searchPost = catchAsyncError(async (req, res, next) => {

    let {title} = req.body;


    var page = parseInt(req.query.page, 10) || 0;
    var numPerPage = 10;
    var skip = (page - 1) * numPerPage;
    var limit = skip + ',' + numPerPage;
    let query;
    if(skip >=0){

     query = 'select * from posts where title like ? LIMIT ' + limit;
    }else{
        query ="select * from posts where title like ?"
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





exports.getPostBySlug = catchAsyncError(async (req, res, next) => {
    const slug = req.params.slug;

   let query = 'select * from posts where slug=?';
    db.query(query,[slug], (err, result) => {

        if (!err) {
            return res.status(200).json(result[0])
        } else {
            return res.status(500).json(err);
        }
    })

})


exports.deletePost = catchAsyncError(async (req, res, next) => {
    const slug = req.params.slug;

    let query = 'delete from posts where slug=?';
     db.query(query,[slug], (err, result) => {
 
         if (!err) {
            if (result.affectedRows === 0) {
                return res.status(404).json({ msg: "Post slug doesn't found" });
            }

            return res.status(200).json({ msg: "your post has been successfully deleted" });
         } else {
             return res.status(500).json(err);
         }
     })
 })



//Sechudel post time
 async function schedulePost(req, res){
    console.log("here", req.body);
    const {title, categoryId, postDesc, featureImg, imgCaption, focusKey, metaDesc, alt, status, } = req.body;
    let slug;
     // convert to lower case
     slug = title.toLowerCase();
     // replace spaces with dash symbols
     slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
     slug = slug.replace(/ /gi, "-");

    //Create a unique characters to make slug unique
    function makeId(length){
        let result = "";
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for(let i=0; i<length; i++){
            result += characters.charAt(Math.floor(Math.random()*charactersLength));
        }

        return result;
    }

    slug = slug + "-"+makeId(5)


    let query = "insert into posts (title, categoryId, postDesc, featureImg, imgCaption, focusKey, metaDesc,alt, status, slug) values (?,?,?,?,?,?,?,?,?,?)"


    db.query(query, [title, categoryId, postDesc, featureImg, imgCaption, focusKey, metaDesc, alt, status, slug], (err, result) => {
        if (!err) {
            // return res.status(200).json({ msg: "Post created Successfully" })
            res.json("posted")
        } else {
            return res.status(500).json(err)
        }
    })
 }


 