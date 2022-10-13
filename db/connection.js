require('dotenv').config();
const mysql = require('mysql2');

const log4js = require('log4js');
const logger = log4js.getLogger();

// let connection = mysql.createPool({
//     port:7257,
//     host:"containers-us-west-43.railway.app",
//     user: "root",
//     password: "LVmd44OGibG6oYoGr6Ad",
//     database: "railway"
// })
// let connection = mysql.createPool({
//     port: 3306,
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'buiyandb',
// });


let connection = mysql.createPool({
    port:3306,
    host:"localhost",
    user: "bhuiyantrad_user",
    password: "@xWgFOUfX4r9",
    database: "bhuiyantrad_test"
})


connection.getConnection((err, result) => {
    logger.debug(err, 'err');
    if (!err) {
        logger.debug('Db connection successful');
        console.log('Db connection successful');
    } else {
        throw err;
    }
});

module.exports = connection;
