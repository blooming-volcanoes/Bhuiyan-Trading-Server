
require('dotenv').config();
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const catchAsyncError = require('../../middleware/catchAsyncError');

const log4js = require('log4js');
const logger = log4js.getLogger();

const sendToken = require('../../lib/jwt.js');
const db = require('../../db/connection');
const ErrorHandler = require('../../lib/errorHandler');
const { query } = require('../../db/connection');





function findByEmail(email) {
    let query = "select email from user where email=?";


}


/** Register User */
exports.registerUser = (req, res, next) => {

    let { name, password, email, contactNumber } = req.body;

    let query = "select email from user where email=?";
    try {
        db.query(query, [email], (err, result) => {
            logger.debug(err, "oel", result, "from register user");
            if (!err) {
                if (result.length > 0) {
                    return res.status(400).json({ msg: "Email already exist" })
                } else {
                    query = "insert into user (name,email,contactNumber, password,status,role) values (?,?,?,?,'active','admin')";

                    db.query(query, [name, email, contactNumber, password], (err, result) => {
                        if (!err) {
                            query = "select email, id, role from user where email=?";
                            db.query(query, [email], (err, result) => {
                                if (!err) {
                                    sendToken(result[0], res, 200)
                                } else {

                                }
                            })
                        } else {
                            return res.status(500).json(err)
                        }
                    })
                }
            } else {
                res.status(500).json({ msg: err })
            }
        })

    } catch (err) {
        throw err;
    }


}


/** Login user */

exports.loginUser = catchAsyncError(async (req, res, next) => {
    let { email, password } = req.body
    let query = "select email, password, role, status,name, id from user where email=?";

    db.query(query, [email], (err, result) => {
        logger.debug(err, result, "from login user");
        // let compare = 
        if (!err) {
            if (result.length <= 0) {
                return res.status(401).json({ msg: "Incorrect username or password" })
            } else if (result[0].status == "false") {
                return res.status(401).json({ msg: "Wait for the admin approval" })
            } else if (password === result[0].password) {
                sendToken(result[0], res, 200)
            } else {
                return res.status(400).json({ msg: "Password didn't match" })
            }
        } else {
            res.status(500).json({ msg: err })
        }
    })
})

let transporter = nodemailer.createTransport({
    service: 'Yandex',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
})



/** Get the user */


exports.getUserDetails = catchAsyncError(async (req, res, next) => {

    const id = req.user.id;

    let query = "select email, id, role from user where id=?"

    db.query(query, [id], (err, result) => {
        if (!err) {
            let user = (result[0]);
            res.status(200).json({ success: "true", user },)
        } else {
            res.status(401).json({ msg: "Login to get access" })
        }
    })

}
)



exports.forgetPassword = catchAsyncError(async (req, res, next) => {
    let user = req.body;
    let query = "select email, password from user where email=?"

    logger.debug(process.env.EMAIL, process.env.PASS);
    db.query(query, [user.email], (err, result) => {
        if (!err) {
            if (result.length <= 0) {
                res.status(200).json({ msg: "your mail is not enlisted" })
            } else {
                let mailOptions = {
                    from: process.env.EMAIL,
                    to: result[0].email,
                    subject: "Your Lost password by bhuiyantrad",
                    html: `<p>
                      <b>Your login detail are </b> </br>
                      <b> ${result[0].password}</b>
                  </p>`
                }

                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        res.status(500).json({ msg: err })
                    } else {
                        if (info.response) {

                            res.status(200).json({ msg: "YOur password sent successfully" })
                        }
                    }
                })


            }
        } else {
            res.status(500).json({ msg: err })
        }
    })
})


/** Change Password */

exports.changePassword = catchAsyncError(async (req, res, next) => {
    logger.debug(req.user, "ofaload", "change password");
    const email = req.user.email;
    const { oldPass, newPass, confirmPass } = req.body;
    let query = "select * from user where email=?";

    db.query(query, [email], (err, result) => {
        if (!err) {
            const passCompare = oldPass === result[0].password
            logger.debug(result, passCompare, "change pass");
            if (!passCompare) {
                return res.status(400).json({ msg: "Your old Password is incorrect" })
            } else if (passCompare) {
                if (newPass !== confirmPass) {
                    return (new ErrorHandler("new password didn't match"))
                }
                query = "update user set password=? where email=?";
                db.query(query, [newPass, email], (err, result) => {
                    if (!err) {
                        return res.status(200).json({ msg: "YOur password has been sucessfully changed" })
                    } else {
                        return res.status(500).json(err)
                    }
                })

            } else {
                return res.status(500).json(err)
            }
        } else {
            return res.status(500).json({ msg: "Something went wrong, please try again later" })
        }
    })

})


exports.updateUser = catchAsyncError(async (req, res, next) => {

    const data = req.user;

    // query = "update user set ? where id=?";
    let query = "select * from user where id=?"

    db.query(query, [data.id], (err, result) => {
        query = "update user set ? where id=?";
        if (!err) {

            if (req.body.name && !req.body.prevPassword) {
                db.query(query, [req.body,data.id], (err, result) => {
                    if (!err) {
                        return res.status(200).json({ msg: "Your given input has updated sucessfully" });
                    } else {
                        return res.status(500).json(err);
                    }
                })
            }else if (req.body.prevPassword === result[0].password) {
                console.log(req.body)
                if(req.body.name && req.body.currentPassword){
                    req.body = {
                        password: req.body.currentPassword,
                        name: req.body.name
                    }
                }else if(req.body.currentPassword){
                    req.body = {
                        password: req.body.password,
                    }
                }
               
                db.query(query, [req.body, data.id], (err, result) => {
                    if (!err) {
                        if (!result.affectedRows === 0) {
                            return res.status(400).json({ msg: "Your user id is incorrect" });
                        }
                        return res.status(200).json({ msg: "Your given input has updated sucessfully" });
                    } else {
                        if (err.errno === 1064) {
                            return res.status(500).json("err:Your input is empty");
                        }
                        return res.status(500).json(err);
                    }
                })
            } else {
                return res.status(400).json("err:Your password is incorrect");
            }
        } else {
            return res.status(500).json(err);
        }
    })

})





