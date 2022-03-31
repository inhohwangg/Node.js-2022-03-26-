const mongoose = require('mongoose')
const { Schema } = mongoose // ??? 이건 무슨뜻이지....


const postSchema = new Schema({
    user: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        trquired: true,
    },
    title: {
        type: String,
        trquired: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})


module.exports = mongoose.model('Post', postSchema)
