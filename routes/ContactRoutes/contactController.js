
const db = require('../../db/connection');
const pagination = require('../../services/pagination');



/**Create contact details when user post their details */
function postContact(req,res){
    const {email,  name, emailTitle, productName, comments, country, city, zipCode} = req.body;


    let query =`insert into contacts (email, name, emailTitle, productName, comments, country, city, zipCode) values (?,?,?,?,?,?,?,?)`;

    db.query(query, [email,  name, emailTitle, productName, comments, country, city, zip], (err, result)=>{
        if(!err){
            if(result.affectedRows === 0){
                res.status(400).json({ msg: "Details didn't save"});
            }
            res.status(200).json({ msg: "Your Contact details Saved Successfully" });
        }else{
            res.status(200).json({ msg: "fasle", err });
        }
    })

}


function getContacDetails(req, res){
    let query;
    var page = parseInt(req.query.page) || 0;
    var numPerPage = 10;
  let getPage =  pagination(page, numPerPage)

    // query = `select * from contacts order by time and date limit ${getPage.limit}`;

    if(getPage.skip >=0){
        query = `select * from contacts order by created_at limit ${getPage.limit}`;
       }else{
        query = `select * from contacts order by time and date`;
       }
    db.query(query, (err, result)=>{
        if(!err){
            res.status(200).json(result);
        }else{
            res.status(500).json(err);
        }
    })

}


/** Delete contact  */
function deleteContact(req,res){
    let query = `delete from contacts where id=?`;

    db.query(query,[id], (err, result)=>{
        if(!err){
            if(result.affectedRows === 0){
            res.status(400).json({ msg: "Id is not valid"});
            }
            res.status(200).json({ msg: "Delete successfully" });
        }else{
            res.status(400).json(err);
        }
    })
}


module.exports = {
    postContact,
    getContacDetails,
    deleteContact   
}