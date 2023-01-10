require('dotenv').config();
const mysql = require('mysql2');
console.log(process.env.DBHOST,"soo");

let connection = mysql.createPool({
    host: process.env.DBHOST,
    user:  process.env.user,
    password:  process.env.password,
    database: process.env.database,
});


connection.getConnection((err, result) => {

    if (!err) {
        console.log('Db connection successful');
    } else {
        throw err;
    }
});

module.exports = connection;
