const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user.js');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/signout', userCtrl.destroy)

module.exports = router;