require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const path = require('path')

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({
    useTempFile: true
}))

//Routes
app.use('/user', require('./routes/userRouter'))


//Connect to the mongodb
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useNewUrlParser: true,
})
.then(() => {
    console.log("Connected to mongodb");
})
.catch((e) => console.log(e));

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log('Server is running on port 8000', PORT)
})