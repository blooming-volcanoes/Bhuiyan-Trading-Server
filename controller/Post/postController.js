const catchAsyncError = require('../../middleware/catchAsyncError');
const nodeCron = require("node-cron");
const EventEmitter = require('events');
const event = new EventEmitter();

const sendToken = require('../../lib/jwt.js');
const db = require('../../db/connection')

exports.createPost =  catchAsyncError(async (req, res, next) => {
    const {title, categoryId, postDesc, featureImg, imgCaption, focusKey, metaDesc, alt, status, } = req.body;
    const date = new Date(0, 47,18, 12, 10, 3);

    console.log(date,"ch");
    if(status == 'now'){
        console.log("posting now");
    }else {
        const job = nodeCron.schedule("0 1 19 12 October Wednesday", async()=>{
            
            await schedulePost(req,res)
            event.emit('JOB COMPLETED');
        });
        

        event.on('JOB COMPLETED', () => {
            console.log('Job done!');
            job.stop();
        });
    }

  
 })


 // Listen to when a 'JOB COMPLETED' event is emitted and stop the task




 exports.getPost =  catchAsyncError(async (req, res, next) => { 
    let query = "select p.title, p.postDesc, p.featureImg, p.imgCaption, p.focusKey, p.metaDesc, p.slug, pc.id as categoryId, pc.categoryName as categoryName from posts as p inner join postCategory as pc where p.categoryId = pc.id";

    db.query(query, (err, result) => {
        if (!err) {
            return res.status(200).json(result)
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

    let query = "insert into posts (title, categoryId, postDesc, featureImg, imgCaption, focusKey, metaDesc,alt, status, slug) values (?,?,?,?,?,?,?,?,?,?)"


    db.query(query, [title, categoryId, postDesc, featureImg, imgCaption, focusKey, metaDesc, alt, status, slug], (err, result) => {
        if (!err) {
            return res.status(200).json({ msg: "Post created Successfully" })
        } else {
            return res.status(500).json(err)
        }
    })
 }


 