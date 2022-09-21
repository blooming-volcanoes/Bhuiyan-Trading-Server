function uploadFile(req, res) {
    const url = `${process.env.HOST}/uploads/${req.file.filename}`;
    res.send({ url });
}

module.exports = { uploadFile };
