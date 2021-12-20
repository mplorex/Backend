const express = require('express');
const mongoose = require('mongoose');
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
const path = require('path');

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/stuff', stuffRoutes);
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

mongoose.connect('mongodb+srv://will:<PASSWORD>@cluster0-pme76.mongodb.net/test?retryWrites=true')
.then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
})
.catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
});


module.exports = app;