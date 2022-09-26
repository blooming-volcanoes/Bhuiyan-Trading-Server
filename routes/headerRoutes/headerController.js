const db = require('../../db/connection');

function DynamicHeader (){
    let {mainTitle,secondTitle,thirdTitle,backgroundImg}  = req.body;
    let query = "insert into header (mainTitle,secondTitle,thirdTitle,backgroundImg) values (?,?,?,?)";

    db.query(query,[mainTitle,secondTitle,thirdTitle,backgroundImg], (err, result)=>{
        if(!err && result.affectedRows >0){
            return res.status(200).json({msg: "Input has successfully stored into DB"})
        }else{
            return res.status(500).json(err)
        }
    })
}

function updateHeader (){
    const id = req.params.id;

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



module.exports = {
    DynamicHeader, 
    updateHeader
}