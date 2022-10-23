
const db = require('../../db/connection');
const pagination = require('../../services/pagination');



/**Create contact details when user post their details */
function postContact(req,res){
    const {email,  userName, emailTitle, productName, comments, country, city, zipCode, productId} = req.body;


    let query =`insert into contacts (email, userName, emailTitle, productName, comments, country, city, zipCode,productId) values (?,?,?,?,?,?,?,?,?)`;

    db.query(query, [email, userName, emailTitle, productName, comments, country, city, zipCode,productId], (err, result)=>{
        if(!err){
            if(result.affectedRows === 0){
                res.status(400).json({ msg: "Details didn't save"});
            }
            res.status(200).json({ msg: "Your Contact details Saved Successfully" });
        }else{
            res.status(200).json({ msg: "false", err });
        }
    })

}


function getContacDetails(req, res){
    let query;
    var page = parseInt(req.query.page) || 0;
    var numPerPage = 1;
  let getPage =  pagination(page, numPerPage)

    // query = `select * from contacts order by time and date limit ${getPage.limit}`;
    console.log(getPage.skip,"cheko");
    if(getPage.skip >=0){
        query = `select * from contacts order by -created_at limit ${getPage.limit}`;
       }else{
        query = `select * from contacts order by -created_at`;
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
    let id = req.params.id;
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





function searchContact(req, res){
    let {title} = req.body;
    let query = `SELECT * FROM contacts WHERE CONCAT(userName, '', productName, '', email) LIKE ?`

     db.query(query,[title], (err, result)=>{
        if(!err){
            console.log(result);
            if(result.length === 0){
                res.status(200).json({ msg: "Search result is not found" });
            }else{
                res.status(200).json(result);
            }
        }else{
            res.status(500).json(err);
        }
     })


}


module.exports = {
    postContact,
    getContacDetails,
    deleteContact,
    searchContact   
}