const mongoose = require('mongoose')

const connect = () => {
    mongoose
        .connect('mongodb://localhost:27017/post_list', {
            ignoreUndefined: true,
        })
        .catch((err) => console.log(err))
}
mongoose.connection.on('error', (err) => {
    console.error('몽고디비 연결 에러', err)
})

module.exports = connect
// const connect = () => {
//     mongoose
//        .connect(
//         `mongodb://${id}:${password}@localhost:27017/${dbName}`,
//         {
//             useNewUrlParser: true,
//             ignoreUndefined: true,
//         },
//         (error) => {
//             if (error) console.log("Mongo DB connect Error");
//             else console.log("Mongo DB Connect Success");
//         }
//     );
// };

// 몽구스 Connection에 이벤트 리스너를 삽입한다.
// 에러 발생 시 에러 내용을 기록한다.
// mongoose.connection.on("error", (err) => {
//     console.error("Mongo DB Connect Error", err)
// })

// 연결 종료 시 재연결을 시도한다.
//  mongoose.connection.on('disconnected', () => {
//  console.error("Mongo DB DisConnect reconnect.")
//  connect()
// })

// module.exports = connect;
