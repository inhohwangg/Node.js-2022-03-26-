const jwt = require('jsonwebtoken')
const User = require('../schemas/user')

module.exports = (req, res, next) => {
    const { authorization } = req.headers
    const [tokenType, tokenValue] = authorization.split(' ')
    console.log(authorization)
    if (tokenType !== 'Bearer') {
        res.status(401).send({
            errorMessage: '로그인 후 사용하세요.',
        })
        return
    }

    try {
        const { nickname } = jwt.verify(tokenValue, 'my-secret-key')
        console.log(nickname)
        User.findOne( {nickname} )
            .exec()
            .then((nickname) => {
                res.locals.user = nickname
                next()
            })
    } catch (error) {
        res.status(401).send({
            errorMessage: '로그인 후 사용하세요',
        })
        return
    }
}