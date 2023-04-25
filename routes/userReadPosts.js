const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const UserReadPosts = require('../controllers/userReadPosts')

router.get('/:postId', auth, UserReadPosts.isRead)
router.post('/:postId', auth, UserReadPosts.markRead)

module.exports = router