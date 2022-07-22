const Users = require('../models/userModel')

const userControl = {
    register: async(req, res) => {
        try {
            console.log(req.body)
            res.json ({msg: "Register Test"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = userControl