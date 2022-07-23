const Users = require('../models/userModel')
const bcrybt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail = require('./sendMail')

const {CLIENT_URL} = process.env

const userControl = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body
            //Return Error Messages 
            if (!name || !email || !password)
                return res.status(400).json({ msg: "Please fill in all fields" })
            if (!validateEmail(email))
                return res.status(400).json({ msg: "Invail email" })

            const user = await Users.findOne({ email })
            if (user) return res.status(400).json({ msg: "This email already exists" })

            if (password.length < 6)
                return res.status(400).json({ msg: "Passwors must be at least 6 characters" })

            //Password field -- invisible password
            const passwordHash = await bcrybt.hash(password, 12)

            const newUser = {
                name, email, password: passwordHash
            }

            const activation_token = createActivationToken(newUser)

            const url = `${CLIENT_URL}/user/activate/${activation_token}`
            sendMail(email, url, "Verify your email address")



            res.json({ msg: "Register Success! Please activate your email to start." })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}
//Generate Secret password
const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, { expiresIn: '5m' })
}
const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '14m' })
}
const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

module.exports = userControl