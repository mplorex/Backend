const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config()

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
        (hash) => {
            User.create(
                {
                    name: req.body.name,
                    email: req.body.email,
                    password: hash
                }
            ).then(user => {
                const token = jwt.sign(
                    { userId: user._id },
                    process.env.JWT_TOKEN_SECRET,  // 'secert',
                    { expiresIn: '24h' });
                    console.log ("Got signup token: ", token);
                res.status(201).json({ token, user })
                })
                .catch((error) => {
                    console.log(error)
                    res.status(400).json(error);
                }
            );
        }
    );
};

exports.login = (req, res, next) => {
    User.findOne({ where: { email: req.body.email} })
    .then(user => {
        if (!user) {
            return res.sendStatus(404)
        }
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'bad password'})
                }               
            })
            const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_TOKEN_SECRET,  // 'secert',
                { expiresIn: '24h' });
                console.log ("Got signup token: ", token);
            res.status(201).json({ token, user })
    })
}

//Create Delete and Modify option for user

exports.modify = (req, res, next) => { 
    User.update({ where: { 
        name: req.body.name,
        email: req.body.email,
        password: hash
    } })
    .then (() => {
        res.status(201).json({
            message: 'User updated successfully!'
        })
    }).catch ((error) => {
        res.status(400).json(error)
    })
};

exports.destroy = (req, res, next) => { 
    User.findOne({ where: {
            name: req.body.name,
            email: req.body.email,
            password: hash
        }
    })
    .then((user) => {
        User.destroy({ where: {
            name: req.body.name,
            email: req.body.email,
            password: hash
        } 
    })
    .then (() => {
            res.status(200).json({
                message: 'User deleted'
            })
        }).catch ((error) => {
            res.status(400).json(error)
        })
    })
};