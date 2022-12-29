const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database.js')
class Post extends Model {}
const Post = require('./post.js')

Post.init ({
    description: {
        type: DataTypes.STRING,
        allowNull:true
    },
    image: {
        type: DataTypes.STRING,
        allowNull:true
    },
    title: {
        type: DataTypes.STRING,
        allowNull:false
    },
    video: {
        type: DataTypes.STRING,
        allowNull:true
    }
}, {
    //Other model option go here
    sequelize, // We need to pass the connection instance
    modelName: 'Post' 
});
