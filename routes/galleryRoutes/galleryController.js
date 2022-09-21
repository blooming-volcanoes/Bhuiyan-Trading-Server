const path = require('path');
const db = require('../../db/connection');
const {getArray} = require('../../services/getArr');


function singleUpload(req, res) {
    console.log(req.file, "testing");
    const url = `${process.env.HOST}/uploads/${req.file.filename}`;
    res.send({ url });
}



function bulkUpload(req, res) {

    let files = req.files;
    let url = [];
    for (let file of files) {
        let name = file.filename
        url.push(`${process.env.HOST}/uploads/${name}`);
        console.log(url);
    };

    res.status(200).json({ msg: "success", url });
}


/** Insert image link in sql db */

function createImgGallery(req, res){
    let url = req.body.url;
    let query = "insert into gallery (url) values (?)";

    db.query(query,[url], (err,result)=>{
        if(!err){
            res.status(200).json({ msg: "Success"});
        }else{
            res.status(500).json({ msg: err });
        }
    })
}


/** Get all image link from db */

function getAllImg(req, res){
    let query = "select url from gallery";

    db.query(query, (err,result)=>{
        if(!err){
            if(result.length >0){
            //    console.log( result);
              let img =  getArray(result);
              res.status(500).json(img);
            }else{
                res.status(500).json({ msg: "something went wrong"});
            }
        }else{
            res.status(500).json({ msg: "something went wrong"});
        }
    })
}





module.exports = { singleUpload, bulkUpload, createImgGallery, getAllImg };
