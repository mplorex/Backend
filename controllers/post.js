const jwt = require('jsonwebtoken');
const fs = require('fs');
const Post = require('../models/post');

exports.create = (req, res, next) => { 
    const data = req.body;
    console.log("File is : ", req.file);
    console.log ("title: ", data.title);
    const file = 'http://localhost:3000/' + req.file.path;

    const post = Post.build({ 
        title: data.title,
        description: data.description,
        imageUrl: file,
        userId: data.userId
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

exports.getOne = async (req, res, next) => { 
    const post = Post.findOne({where: {title:"any"}});
    if (project === null ) {
        console.log('Not found!');
    } else {
        console.log(post instanceof Post);
    }
};
exports.modify = (req, res, next) => { 
    Post.update({ id: req.params.id}, {
    })
    .then (() => {
        res.status(201).json({
            message: 'Post updated successfully!'
        })
    }).catch ((error) => {
        res.status(400).json(error)
    })
};
exports.delete = (req, res, next) => { 
    Post.findOne({ _id: req.params.id })
    .then((post) => {
        Post.delete({ _id: req.params.id }).then (() => {
            res.status(200).json({
                message: 'Post deleted'
            })
        }).catch ((error) => {
            res.status(400).json(error)
        })
    })
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
