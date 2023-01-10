const path = require('path');
const db = require('../../db/connection');
const { getArray } = require('../../services/getArr');
const fs = require('fs');

const directoryPath = path.join(__dirname, "..", "..", "storage", "uploads");
const directoryPathCategory = path.join(__dirname, "..", "..", "storage", "category");

const HOST = "https://api.bhuiyantrad.com"


// single upload image for product
function singleUpload(req, res) {
    const url = `${HOST}/uploads/${req.file.filename}`;
    res.send({ url });
}


// Single uplad image for category
function singleUploadCategory(req, res) {
    const url = `${HOST}/category/${req.file.filename}`;
    res.send({ url });
}


// single upload image for blog
function singleUploadBlog(req, res) {
    const url = `${HOST}/blog/${req.file.filename}`;
    res.send({ url });
}

// Upload home page background image
function headerBackground(req, res) {
    const url = `${HOST}/background/${req.file.filename}`;
    res.send({ url });
}


//Bulk image upload for product
function bulkUpload(req, res) {
    let files = req.files;
    let url = [];
    for (let file of files) {
        let name = file.filename;
        url.push(`${HOST}/uploads/${name}`);
        console.log(url);
    };

    res.status(200).json({ msg: "success", url });
}


//Bulk image upload image for sub-category
function bulkUploadCategory(req, res) {

    let files = req.files;
    let url = [];
    for (let file of files) {
        let name = file.filename
        url.push(`${HOST}/category/${name}`);
        console.log(url);
    };

    res.status(200).json({ msg: "success", url });
}



//Bulk image upload image for sub-category
function bulkUploadBlog(req, res) {

    let files = req.files;
    let url = [];
    for (let file of files) {
        let name = file.filename
        url.push(`${HOST}/blog/${name}`);
    };

    res.status(200).json({ msg: "success", url });
}



/** Get all Product image file  */
function getFiles(req, res) {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
      
    console.log(page,"page", limit,);
    // calculating the starting and ending index


    fs.readdir(directoryPath, (err, files) => {
        if (!err) {
            if (files.length > 0) {
                let arr = []

              

     files.sort(function(a, b) {
               return fs.statSync(directoryPath+"/" + b).mtime.getTime() - 
                      fs.statSync(directoryPath+"/" + a).mtime.getTime();
           });
 
           files.forEach(file => {
                    const url = `${HOST}/uploads/${file}`
                    arr.push(url);
                })

             let results =  paginatedResults(page, limit,arr)

                return res.status(200).json(results)
            } else {
                return res.status(400).json({ msg: "Folder is empty" });
            }
        } else {
            return res.status(500).json({ msg: 'Unable to scan directory: ' + err });
        }
    })
}





/** Get all the Categroy & sub-category Image file  */
function getAllCategoryImg(req, res) {
    console.log(req.params);
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
      
    fs.readdir(directoryPathCategory, (err, files) => {
        if (!err) {
            if (files.length > 0) {
                let arr = []

                files.forEach(file => {
                    const url = `${HOST}/category/${file}`
                    arr.push(url);
                })
                  arr.sort((a,b)=> a-b);
                const results = paginatedResults(page, limit, arr);
                return res.status(200).json(results)
            } else {
                return res.status(400).json({ msg: "Folder is empty" });
            }
        } else {
            return res.status(500).json({ msg: 'Unable to scan directory: ' + err });
        }
    })
}



// Get Paginated result
function paginatedResults(page, limit, arr) {
  
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
     
        const results = {};
      
     
        if (startIndex > 0) {
          results.previous = {
            page: page - 1,
            limit: limit
          };
        }

        if (endIndex < arr.length) {
            results.next = {
              page: page + 1,
              limit: limit
            };
          }

        results.results = arr.slice(startIndex, endIndex);

      return results;

  }









/** delete file from folder */

function deleteFile(req, res) {
    const { name } = req.params;
    fs.unlink(directoryPath + "/" + name, (err) => {
        if (!err) {
            return res.status(200).json({ msg: "file deleted sucessfullly" });
        } else {
            return res.status(500).json({ msg: 'Unable to scan directory: ' + err });
        }
    })
}


function deleteCategoryFile(req, res) {
    const { name } = req.params;
    fs.unlink(directoryPathCategory + "/" + name, (err) => {
        if (!err) {
            return res.status(200).json({ msg: "file deleted sucessfullly" });
        } else {
            return res.status(500).json({ msg: 'Unable to scan directory: ' + err });
        }
    })
}



module.exports = { singleUpload, singleUploadCategory, bulkUploadCategory, bulkUpload, getFiles, getAllCategoryImg, deleteFile, deleteCategoryFile, headerBackground, singleUploadBlog,bulkUploadBlog };
