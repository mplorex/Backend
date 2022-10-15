require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const postRoutes = require('./routes/post');
const  { Sequelize } = require('sequelize');
// const userRoutes = require('./routes/user');



// start web server
const app = express();

//Headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

//Routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/post', postRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;