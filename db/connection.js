require('dotenv').config();
const mysql = require('mysql2');

console.log(process.env.DB_USER);
let connection = mysql.createPool({
    port:7257,
    host:"containers-us-west-43.railway.app",
    user: "root",
    password: "LVmd44OGibG6oYoGr6Ad",
    database: "railway"
})


connection.getConnection((err, result)=>{
    if(!err){
        console.log("Db connection successful");
    }else{
       throw (err);
    }

})

module.exports = connection;