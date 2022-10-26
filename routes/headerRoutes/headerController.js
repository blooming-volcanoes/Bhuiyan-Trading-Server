const { query } = require('../../db/connection');
const db = require('../../db/connection');

function DynamicHeader (req,res){
    let {mainTitle,secondTitle,thirdTitle,backgroundImg, logo}  = req.body;
    let query = "insert into header (mainTitle,secondTitle,thirdTitle,backgroundImg,logo) values (?,?,?,?,?)";

    db.query(query,[mainTitle,secondTitle,thirdTitle,backgroundImg,logo], (err, result)=>{
        if(!err && result.affectedRows >0){
            return res.status(200).json({msg: "Input has successfully stored into DB"})
        }else{
            return res.status(500).json(err)
        }
    })
}


function getHeader(req, res){
    let query = "select * from header";
    db.query(query, (err, result)=>{
        if(!err){
            return res.status(200).json(result[0]);
        }else{
            return res.status(500).json(err)
        }
    })
}


function updateHeader (req, res){
    const id = req.params.id;
    if(!id){
        return res.status(400).json({ msg: "provide id to update" });
    }
    query = "update header set ? where id=?";

    db.query(query, [req.body, id], (err, result) => {
        if (!err) {
            if (!result.affectedRows === 0) {
                return res.status(400).json({ msg: "Your given id is incorrect" });
            }
            return res.status(200).json({ msg: "Your input updated sucessfully" });
        } else {
            if (err.errno === 1064) {
                return res.status(500).json("err:Your input is empty");
            }
            return res.status(500).json(err);
        }
    })
}


// Show brand name that are using the product

function sponsorBrand(req, res){
        const {name, logo} = req.body;

       let query  = "insert into brands (name,logo) values (?,?)";
       
       db.query(query, [name, logo], (err, result)=>{
            if(!err){
                return res.status(200).json({msg: "Input has successfully stored"})
            }else{
                return res.status(500).json(err);
            }
       })
}


function showBrand(req,res){
    let query = "select * from brands where id=?";
    const id = req.query.id;
    db.query(query, [id], (err, result)=>{
        if(!err){
            if(result.length === 0){
                return res.status(200).json({msg: "Data is not availabe"});
            }
            return res.status(200).json(result);
        }else{
            return res.status(500).json(err)
        }
    })
}

function deleteBrand (req,res){
    let query = "delete from brands where id=?";
    const id = req.query.id;
    db.query(query, [id], (err, result)=>{
        if(!err){
            if (!result.affectedRows === 0) {
                return res.status(400).json({ msg: "Your id is incorrect" });
            }

            return res.status(200).json("Deletetion is successfull");
        }else{
            return res.status(500).json(err)
        }
    })
}


module.exports = {
    deleteBrand,
    showBrand,
    sponsorBrand,
    DynamicHeader, 
    updateHeader,
    getHeader
}