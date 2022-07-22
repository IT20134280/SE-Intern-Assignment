require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({
    useTempFile: true
}))

app.use('/', (req, res, next) => {
    res.json({msg: "Hello Everyone!"})
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log('Server is running on port 8000', PORT)
})