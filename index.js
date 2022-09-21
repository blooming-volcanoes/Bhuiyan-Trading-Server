/* eslint-disable prettier/prettier */
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connection = require('./db/connection')


const app = require('express')();

const port = process.env.PORT || 3000;

// middleware
const errorMiddleware = require('./middleware/error');

app.use(cors({
  
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect with MySql DB
const userRoutes = require('./routes/userRoutes/userRoute');
const categoryRoutes = require('./routes/productRoutes/categoryRoute');
const productRoute = require('./routes/productRoutes/productRoute');
const postCategoryRoute = require('./routes/postRoutes/postCategoryRoute');
const postRoute = require('./routes/postRoutes/postRoute');

const log4js = require('log4js');
const path = require('path');
const upload = require('./lib/multer');
const logger = log4js.getLogger();

log4js.configure({
  appenders: { everything: { type: 'file', filename: 'logs.log' } },
  categories: { default: { appenders: ['everything'], level: 'ALL' } }
});


app.use('/user', userRoutes)
app.use('/category', categoryRoutes);
app.use('/product', productRoute);
app.use('/post', postCategoryRoute);
app.use('/blog', postRoute)



// Socket
const http = require('http').createServer(app);



app.get('/', (req, res) => {
    res.send('hi');
    logger.debug("odo");
});

app.get('/log', (req, res) => {
  console.log(__dirname+"/logs.log");
  res.sendFile(path.join(__dirname + '/logs.log'));
});





app.post('/postImg',upload.single("uploadFile"), (req, res, next)=>{

  res.send("suucess");
});



app.use(errorMiddleware);

http.listen(port, () => {
    logger.debug(`Example app listening at http://localhost:${port}`);
});


module.exports = logger