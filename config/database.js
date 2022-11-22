const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

//setup databse
const sequelize = new Sequelize('Servers', 'postgres', 'pizza1234', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,

    pools: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

module.exports = sequelize