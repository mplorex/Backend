const jwt = require('jsonwebtoken');
const fs = require('fs');
const Post = require('../models/post');

exports.create = (req, res, next) => { 
    const data = req.body;
    console.log ("title: ", data.title);
    
    const postData = {
        title: data.title,
        description: data.description,
        userId: data.userId
    } 
    
    if ( req.file ){
        console.log("File is : ", req.file);
        postData.imageUrl = 'http://localhost:3000/' + req.file.path;
    }

    const post = Post.build(postData)

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
        where: {
            id: req.params.id,
            title: req.body,
            description: req.body,
            imageUrl: req.body
        }
    })

    .then (() => {
        res.status(201).json({
            message: 'Post updated successfully!'
        })
    }).catch ((error) => {
        res.status(400).json(error)
    })
};
exports.destroy = (req, res, next) => { 
    Post.findOne({ id: req.params.id }, {
        where: {
            id: req.params.id,
            title: req.body,
            description: req.body,
            imageUrl: req.body
        }
    })
    .then((post) => {
        Post.destroy({ _id: req.params.id }).then (() => {
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
