const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name!"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter your email"],
    },
    role: {
        type: Number,
        default: 0 //user = 0, admin = 1
    },
    avatar: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZLj-_GvAq3uElBjhHjivCw_QX2hBpiJxfhA&usqp=CAU"
    }
},{
    timestamps: true
})
module.exports = mongoose.model("Users", userSchema)