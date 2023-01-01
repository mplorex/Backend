const jwt = require('jsonwebtoken');
const fs = require('fs');
const Post = require('../models/post');

exports.create = (req, res, next) => { 
    const data = JSON.parse(req.body.sauce)

    

    const file = 'http://localhost:3000/' + req.file.path

    const post = Post.build({ 
        title: req.body.title,
        description: req.body.description,
        imageUrl: file,
        userId: req.body.userId
    })

    post.save()
        .then(() => {
            res.status(201).json({
                message: 'Post saved successfully!'
            });
        }
        ).catch(
            (error) => {
                res.status(400).json(error);
            }
        );
};

exports.getOne = (req, res, next) => { 
    const post = Post.getOne({});
    if (project === null ) {
        console.log('Not found!');
    } else {
        console.log(post instanceof Post);
    }
};
exports.modify = (req, res, next) => { 
};
exports.delete = (req, res, next) => { 
};

exports.getAll = (req, res, next) => { 
    Post.findAll()
    .then((posts) => {
        console.log(posts);
        res.status(200).json(posts);
    })
    .catch((error) => {
        res.status(400).json(error);
    })
};
