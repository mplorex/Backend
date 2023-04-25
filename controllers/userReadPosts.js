const UserReadPosts = require('../models/userReadPosts')

exports.markRead = (req, res, next) => {
    const postId = req.params.postId
    const userId = res.auth.userId
}