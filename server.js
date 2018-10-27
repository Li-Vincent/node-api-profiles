const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')

// 引入users.js, profiles.js, posts.js
const users = require('./routes/api/users')
const profiles = require('./routes/api/profiles')
const posts = require('./routes/api/posts')

const app = express()

// 解析 application/json
app.use(bodyParser.json());
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// DB Config
const db = require("./config/keys").mongoURI

// Connect to mongodb
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => {
        console.log("MongoDB connected...")
    }).catch((err) => {
        console.log(err)
    })

// 使用中间件实现允许跨域
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Content-Type")
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
    next()
})

// passport 初始化
app.use(passport.initialize())
require('./config/passport')(passport)

app.use('/api/users', users)
app.use('/api/profile', profiles)
app.use('/api/posts', posts)

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
