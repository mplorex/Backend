const UserReadPosts = require('../models/userReadPosts')

exports.markRead = (req, res, next) => {
    const PostId = parseInt(req.params.postId)
    const UserId = req.auth.userId

    UserReadPosts.create({ UserId, PostId })
    .then(read => {
            res.status(201).json({read: true})
    })
    .catch(error => {
        res.status(400).json(error)
    })
}

exports.isRead = (req, res, next ) => {
    const PostId = parseInt(req.params.postId)
    const UserId = req.auth.userId
    UserReadPosts.findOne({ where: { UserId, PostId } })
    .then(read => {
        if(read){
            res.status(200).json({read: true})
        }else{
            res.status(404)
        }
    })
    .catch(error => {
        res.status(400).json(error)
    })
}