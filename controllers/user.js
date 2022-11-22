const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config()

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
        (hash) => {
            User.create(
                {
                    firstName: req.body.firstName,
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
    .then(user => {
        if (user === null) {
            res.send(404)
        } else {
            res.send({ user, token })
        }
    })
}