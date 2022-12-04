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
    const token = jwt.sign(
        { userId: User._id },
        process.env.JWT_TOKEN_SECRET,
        { expiresIn: '24h' })
        .then(user => {
        if (user === null) {
            res.send(404)
        } else {
            res.send({ user, token })
        }
    }) 
    .catch((error) => {
        console.log(error)
        res.status(400).json(error);
    })
}