const express = require('express')
const router = express.Router()

// 메인페이지
router.get('/', (req, res) => {
    res.render('index') // 아!!
})

//에러페이지
router.get('/err', (req, res) => {
    res.render('err')
})

module.exports = router
