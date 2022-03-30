const express = require('express')
const Post = require('../schemas/post')
const User = require('../schemas/user')
const router = express.Router()

router.get('/:_id', async (req, res) => {
    // 흠...._id는 뭐지..=> Mongo ROBO 3T에 있는 _id이다!!
    try {
        const _id = req.params._id

        const isExist = await Post.findOne({ _id }) //DB에서 _id값을 찾아줘~~
        const result = {
            user: isExist['user'],
            title: isExist['title'],
            content: isExist['content'],
            comment: isExist['comment'],
            createdAt: isExist['createdAt'],
        }
        res.render('view', result) //view라는 ejs파일을 렌더링해라
    } catch (error) {
        console.log('데이터가 존재하지 않습니다.')
        res.render('err')
        return
    }
})

module.exports = router
