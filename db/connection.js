require('dotenv').config();
const mysql = require('mysql2');


let connection = mysql.createPool({
    port: 3306,
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'buiyandb',
});


connection.getConnection((err, result) => {
    if (!err) {
        console.log('Db connection successful');
    } else {
        throw err;
    }
});

module.exports = connection;
