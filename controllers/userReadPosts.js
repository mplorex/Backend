const UserReadPosts = require('../models/userReadPosts')

exports.markRead = (req, res, next) => {
    const postId = req.params.postId
    const userId = res.auth.userId

    UserReadPosts.create({ userId, postId })
    .then(read => {
        res.send(201)
    })
    .catch()
}

exports.isRead = (req, res, next ) => {
    const postId = req.params.postId
    const userId = res.auth.userId
}