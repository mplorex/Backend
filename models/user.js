const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database.js')
class User extends Model {}
const Post = require('./post.js')

User.init ({
    // Model attributes are defined here
    name: {
        type: DataTypes.STRING,
        allowNull:false
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
    modelName: 'user' //We need to choose the model name
});

User.hasMany(Post)
Post.belongsTo(User)

module.exports = User
