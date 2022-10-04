const path = require('path');
const db = require('../../db/connection');
const { getArray } = require('../../services/getArr');
const fs = require('fs');

const directoryPath = path.join(__dirname, "..", "..", "storage", "uploads");
const directoryPathCategory = path.join(__dirname, "..", "..", "storage", "category");

const HOST = "http://localhost:5000.com"


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
    fs.readdir(directoryPath, (err, files) => {
        if (!err) {
            console.log(files, "all")
            if (files.length > 0) {
                let arr = []

                files.forEach(file => {
                    const url = `${HOST}/uploads/${file}`
                    arr.push(url);
                })

                return res.status(200).json(arr);
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
    fs.readdir(directoryPathCategory, (err, files) => {
        if (!err) {
            console.log(files, "all")
            if (files.length > 0) {
                let arr = []

                files.forEach(file => {
                    const url = `${HOST}/category/${file}`
                    arr.push(url);
                })

                return res.status(200).json(arr);
            } else {
                return res.status(400).json({ msg: "Folder is empty" });
            }
        } else {
            return res.status(500).json({ msg: 'Unable to scan directory: ' + err });
        }
    })
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
