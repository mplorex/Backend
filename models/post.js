const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database.js')
class Post extends Model {}

Post.init ({
    description: {
        type: DataTypes.STRING,
        allowNull:true,
        autoincrement: false
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
    //model option
    sequelize, 
    modelName: 'Post' 
});

module.exports = Post