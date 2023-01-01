const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database.js')
class Post extends Model {}

Post.init ({
    description: {
        type: DataTypes.STRING,
        allowNull:true
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull:true
    },
    title: {
        type: DataTypes.STRING,
        allowNull:false
    }
}, {
    //Other model option go here
    sequelize, // We need to pass the connection instance
    modelName: 'Post' 
});

module.exports = Post