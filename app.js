const express = require('express')
const renders = require('./renders')
const router = require('./routers')
const authMiddleware = require('./routers/auth-middleware')

const app = express()

app.use(express.urlencoded({ extended: false }), router)
app.use(express.static('public'))
app.use(express.json())

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

const connect = require('./schemas')
connect()

app.use('/api', router) //api를 자동적으로 추가한다.
app.use('/', renders)

app.listen(3000, () => {
    console.log('서버가 정상적으로 켜졌습니다.')
})
