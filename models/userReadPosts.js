const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/database')
const Post = require('./post')
const User = require('./user')
const UserReadPosts = sequelize.define('UserReadPosts', {
    UserId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    PostId: {
        type: DataTypes.INTEGER,
        references: {
            model: Post,
            key: 'id'
        }
    }
});

Post.belongsToMany(User, { through: UserReadPosts });
User.belongsToMany(Post, { through: UserReadPosts });

module.exports = UserReadPosts