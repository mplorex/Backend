const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const sequelize = require('./config/database.js');
const markRead = require('./routes/userReadPosts')

/*sequelize.sync({ force: true });*/
sequelize.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})	
	.catch(error => {
		console.error('Unable to connect to the database:', error);
	})

// start web server
const app = express();

// Bodyparser
app.use(express.urlencoded({ extended: false}));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Index route
app.get('/', (req, res) => res.render('index', { layout: 'landing' }));

//Headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

//Routes
// app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/images', express.static('images'));
app.use('/api/posts', postRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/read', markRead);

module.exports = app;