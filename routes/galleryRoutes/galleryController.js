const path = require('path');
const db = require('../../db/connection');
const { getArray } = require('../../services/getArr');
const fs = require('fs');

const directoryPath = path.join(__dirname, "..", "..", "storage", "uploads");
const directoryPathCategory = path.join(__dirname, "..", "..", "storage", "category");

const HOST = "https://api.bhuiyantrad.com"

function singleUpload(req, res) {
    console.log(req.file, "testing");
    const url = `${HOST}/uploads/${req.file.filename}`;
    res.send({ url });
}


function singleUploadCategory(req, res) {
    console.log(req.file, "testing");
    const url = `${HOST}/category/${req.file.filename}`;
    res.send({ url });
}


function headerBackground(req, res) {
    const url = `${HOST}/background/${req.file.filename}`;
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



/** Get all the file  */

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





/** Get all the file  */
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



module.exports = { singleUpload, singleUploadCategory, bulkUploadCategory, bulkUpload, getFiles, getAllCategoryImg, deleteFile, deleteCategoryFile, headerBackground };
