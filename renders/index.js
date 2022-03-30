const express = require('express')
const viewRouter = require('./view')
const modifyRouter = require('./modify')
const mainRouter = require('./main')
const writeRouter = require('./write')
const loginRouter = require('./login')
const registerRouter = require('./register')

const router = express.Router()

router.use('/', mainRouter)
router.use('/login', loginRouter)
router.use('/register', registerRouter)
router.use('/view', viewRouter)
router.use('/write', writeRouter)
router.use('/modify', modifyRouter)

module.exports = router
