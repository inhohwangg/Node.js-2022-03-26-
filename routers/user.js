const express = require('express')
const User = require('../schemas/user')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../routers/auth-middleware')
const router = express.Router()

router.post('/user', async (req, res) => {
    const { nickname, email, password, confirmPassword } = req.body

    const is_nickname = /^[a-zA-Z0-9]{3,10}$/
    if (!is_nickname.test(nickname)) {
        res.status(400).send({
            errorMessage:
                '닉네임은 최소 3자 이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9)로 구성',
        })
        return
    }

    if (password !== confirmPassword) {
        res.status(400).send({
            errorMessage: '패스워드가 패스워드 확인란과 동일하지 않습니다.',
        })
        return //return 을 하지않으면 만약 패스워드가 다르더라도 실행이되어버린다.
    } else if (nickname === password) {
        res.status(400).send({
            errorMessage: '닉네임과 패스워드를 다르게 해주세요',
        })
        return
    }

    const existUsers = await User.find({
        //닉네임이나 이메일이 데이터베이스에 겹치는게 있는지 확인하는코드
        $or: [{ email }, { nickname }],
    })
    if (existUsers.length) {
        // 닉네임이나 이메일이 데이터베이스에 겹치는 데이터있으면 발생할 이메일
        res.status(400).send({
            errorMessage: '이미 가입된 이메일 또는 닉네임이 있습니다.',
        })
        return
    }

    if (nickname.length < 4) {
        // 닉네임이나 이메일이 데이터베이스에 겹치는 데이터있으면 발생할 이메일
        res.status(400).send({
            errorMessage: '닉네임은 3자 이상 입력해주시길 바랍니다.',
        })
        return
    }

    if (password.length < 5) {
        // 닉네임이나 이메일이 데이터베이스에 겹치는 데이터있으면 발생할 이메일
        res.status(400).send({
            errorMessage: '비밀번호는 4자 이상 입력해주시길 바랍니다.',
        })
        return
    }

    const user = new User({ email, nickname, password })
    await user.save()

    res.status(201).send({})
})

router.post('/auth', async (req, res) => {
    const { email, password } = req.body //body로 이메일과 패스워드값을 넘겨주겠다.

    const user = await User.findOne({ email, password }).exec()

    if (!user) {
        res.status(400).send({
            errorMessage: '이메일 또는 패스워드가 잘못되었습니다.',
        })
        return
    }

    const token = jwt.sign({ nickname: user.nickname }, 'my-secret-key')
    console.log(user.nickname) // 토큰이 잘만들어지는지 확인하는 방법
    res.send({
        token,
    })
})

router.get('/user/me', authMiddleware, async (req, res) => { //토큰으로 정상적으로 로그인이 되었는지 확인하는 코드
    // 토큰으로 로그인이 되어있는 상태에서 재로그인시 hi뜸
    const { user } = res.locals
    console.log('hi')
    console.log(user)
    
    res.send({
        user: {
            user,
        },
    })
})

module.exports = router
