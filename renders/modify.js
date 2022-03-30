const express = require('express')
const Post = require('../schemas/post')
const router = express.Router()

router.get('/:_id', async (req, res) => {
    try {
        const _id = req.params._id

        const isExist = await Post.findOne({ _id })
        const result = {
            user: isExist['user'],
            title: isExist['title'],
            content: isExist['content'],
            comment: isExist['comment'],
        }
        res.render('modify', result)
    } catch (error) {
        console.log(
            `${req.method} ${req.originalUrl} : 데이터가 존재하지 않습니다.`
        )
        res.render('err')
        return
    }
})

module.exports = router
