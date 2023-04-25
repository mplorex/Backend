const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize('groupomania', 'root', 'pizza1234', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,

    pools: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

sequelize.sync()
.then(() => {
console.log("All models were synchronized successfully.");
}).catch ((error) => {
    console.log(error)
})

module.exports = sequelize

