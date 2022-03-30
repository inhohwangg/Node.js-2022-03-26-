const express = require('express')
const router = express.Router()

// router.post("/user", async(req,res)=> {
//     const {email,password} = req.body //body로 이메일과 패스워드값을 넘겨주겠다.

//     const user = await User.findOne({email, password}).exec()

//     if (!user) {
//         res.status(400).send({
//             errorMessage: "이메일 또는 패스워드가 잘못되었습니다.",
//         })
//         return
//     }

//     const token = jwt.sign({ userId: user.userId }, "my-secret-key")
//     res.send({
//         token,
//     })
// })

router.get('/', (req, res) => {
    res.render('login') // 아!!
})

module.exports = router
