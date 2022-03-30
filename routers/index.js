const express = require('express')
const Posts = require('./router_Posts')
const User = require('./user')

const router = express.Router()

router.use('/posts/', Posts)
router.use('/', User)

module.exports = router
