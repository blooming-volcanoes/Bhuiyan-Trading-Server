const path = require('path');
const db = require('../../db/connection');
const {getArray} = require('../../services/getArr');
const fs = require('fs');

const directoryPath = path.join(__dirname, "..","..", "storage", "uploads");

const HOST = "https://bhuiyantrad.com"

function singleUpload(req, res) {
    console.log(req.file, "testing");
    const url = `${HOST}/uploads/${req.file.filename}`;
    res.send({ url });
}



function bulkUpload(req, res) {

    let files = req.files;
    let url = [];
    for (let file of files) {
        let name = file.filename
        url.push(`${HOST}/uploads/${name}`);
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





/** Get all the file  */

function getFiles (req, res){
    fs.readdir(directoryPath, (err, files)=>{
        if(!err){
            console.log(files,"all")
            if(files.length>0){

                files.forEach(file=>{
                  const url = `${HOST}/uploads/${file}`
                    console.log(url);
                })



            }else{
               return res.status(400).json({ msg: "Folder is empty"});
            }
        }else{
            return res.status(500).json({ msg: 'Unable to scan directory: ' + err}); 
        }
    })
}


module.exports = { singleUpload, bulkUpload, createImgGallery, getAllImg, getFiles };
