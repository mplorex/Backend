const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../database')
class User extends Model {}

User.init ({
    // Model attributes are defined here
    firstName: {
        type: DataTypes.STRING,
        allowNull:false
    },
    lastName: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    //Other model option go here
    sequelize, // We need to pass the connection instance
    modelName: 'User' //We need to choose the model name
});

const Post = sequelize.define("post", {
    name: DataTypes.TEXT,
    favoriteColor: {
        type: DataTypes.TEXT,
        defaultValue: 'green'
    },
    age: DataTypes.INTEGER,
    cash: DataTypes.INTEGER
});