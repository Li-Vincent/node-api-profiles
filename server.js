const express = require('express')
const mongoose = require('mongoose')

const app = express()

// DB Config
const db = require("./config/keys").mongoURI

// Connect to mongodb
mongoose.connect(db)
    .then(() => {
        console.log("MongoDB connected...")
    }).catch((err) => {
        console.log(err)
    })

const port = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send("Hello")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
