const express = require('express')
const Post = require('../schemas/post')
const Comment = require('../schemas/comment')
const authMiddleware = require('../routers/auth-middleware')
const router = express.Router()

//모든 게시글 데이터를 반환하는 함수
router.get('/', async (req, res) => {
    try {
        let jsonData = await Post.find().sort({ createdAt: -1 })
        for (let x in jsonData) {
            const createdAt = new Date(jsonData[x]['createdAt'])
            const create_date = `${createdAt.getFullYear()}-${
                createdAt.getMonth() + 1
            }-${createdAt.getDate()} ${createdAt.getHours()}:${createdAt.getMinutes()}: ${createdAt.getSeconds()}`
            jsonData[x]['createdAt'] = create_date
        }
        res.send({ result: jsonData })
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${req.message}`)
        res.status(400).send()
    }
})

// 게시글 생성
router.post('/', async (req, res) => {
    try {
        const { title, user, password, content, comment } = req.body
        await Post.create({ user, password, title, content, comment })
        res.send({ result: '게시글을 생성하였습니다.' })
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`)
        res.status(400).send({
            errorMessage:"내용확인필요"
        })
    }
})

// 댓글 생성
router.post('/:_id',authMiddleware, async (req, res) => {
    console.log('응답')
    try {
        const {postId} = req.params
        // const {nicknameId} = res.locals.nickname._id
        const { comment,number } = req.body
        const { user } = res.locals
        const email = user['email']
        // console.log(user)
        // console.log(email)
        console.log(comment,email,number)
        await Comment.create({
            comment : comment,
            email : email,
            number:number,
        })
        res.send({ result: '게시글을 생성하였습니다.' })
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`)
        res.status(400).send({
            errorMessage:"내용확인필요"
        })
    }
})

// 댓글 가져오기
router.get('/:postId', async (req, res) => {
    try {
        const {postId} = req.params
        // console.log(postId)
        const comment = await Comment.find({number : postId})
        // console.log(number)
        res.json({comment})
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`)
        res.status(400).send({
            errorMessage:"내용확인필요"
        })
    }
})

// 댓글 수정
router.patch('/:_id',authMiddleware, async (req, res) => {
    try {
        const _id = req.params._id
        // const user = req.body['user']
        // const password = req.body['password']
        const { user } = res.locals
        const email = user['email']
        console.log(email)
        const {comment} = req.body
        const isExist = await Comment.findOne({ _id })
        const emailto = isExist['email'] //isExist의 email을 가지고온다.
        if (!email || !emailto) {
            console.log(
                `${req.method} ${req.originalUrl} : 일치하지 않는 비밀번호 입니다.`
            )
            res.status(400).send()
            return
        }
        await Comment.updateOne({ _id }, { $set: { comment} })
        res.send({ msg: '게시글을 수정하였습니다.' })
    } catch (error) {
        console.log('발견')
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`)
        res.status(400).send()
    }
})

//게시글 삭제
router.delete('/:id',authMiddleware, async (req, res) => {
    try {
        const _id = req.params._id
        const { user } = res.locals
        const {commentId} = req.body
        const email = user['email']
        const isExist = await Comment.findOne({ _id:commentId})
        const emailto = isExist['email']//isExist의 email을 가지고온다.
        console.log(emailto)
        if (!email || !emailto) {
            console.log(
                `${req.method} ${req.originalUrl} : 일치하지 않는 비밀번호 입니다.`
            )
            res.status(400).send()
            return
        }
        await Comment.deleteOne({ _id })
        res.send({ msg: '게시글을 삭제하였습니다.' })
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`)
        res.status(400).send()
    }
})

module.exports = router
