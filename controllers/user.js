const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config()

exports.signup = (req, res, next) => {
    const token = 123
    // Create a new user
    User.create(req.body)
    .then(user => {
        res.send(201).json({ token, user})
    })
    .catch(error => {
        res.send(401).json(error)
    })
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