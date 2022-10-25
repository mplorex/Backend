const { Sequelize } = require('sequelize');

//setup databse
const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch (() => {
        console.error('Unable to connect to database', error)
    })

    module.exports = sequelize
