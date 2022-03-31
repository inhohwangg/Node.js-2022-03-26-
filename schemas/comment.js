const mongoose = require('mongoose')
const { Schema } = mongoose // ??? 이건 무슨뜻이지....

const commentSchema = new Schema({
    comment: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    number: {
        type: String,
    }
})

module.exports = mongoose.model('Comment', commentSchema)