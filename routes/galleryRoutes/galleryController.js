const path = require('path');



function singleUpload(req, res) {
    console.log(req.file,"testing");
    const url = `${process.env.HOST}/uploads/${req.file.filename}`;
    res.send({ url });
}



function bulkUpload(req,res){

    let files = req.files;
let url = [];
  for (let file of files){
    let name = file.filename
      url.push( `${process.env.HOST}/uploads/${name}`);
    console.log(url);
    };



    // const url = `${process.env.HOST}/uploads/${req.file.filename}`;
    // console.log(url,"after");
    res.status(200).json({msg: "success", url});
}


module.exports = { singleUpload, bulkUpload };
