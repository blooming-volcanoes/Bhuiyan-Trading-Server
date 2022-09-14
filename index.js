/* eslint-disable prettier/prettier */
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connection = require('./db/connection')


const app = require('express')();

const port = process.env.PORT || 3000;

// middleware
const errorMiddleware = require('./middleware/error');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect with MySql DB
const userRoutes = require('./routes/userRoutes/userRoute');
const categoryRoutes = require('./routes/productRoutes/categoryRoute');
const productRoute = require('./routes/productRoutes/productRoute');
const postCategoryRoute = require('./routes/postRoutes/postCategoryRoute');
const postRoute = require('./routes/postRoutes/postRoute');


app.use('/user', userRoutes)
app.use('/category', categoryRoutes);
app.use('/product', productRoute);
app.use('/post', postCategoryRoute);
app.use('/blog', postRoute)



// Socket
const http = require('http').createServer(app);



app.get('/hi', (req, res) => {
    res.send('hi');
    console.log('Hi');
});

app.get('/', (req, res) => {
    res.send('hello');
});



app.use(errorMiddleware);

http.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});