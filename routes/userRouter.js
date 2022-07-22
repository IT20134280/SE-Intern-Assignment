const router = require('express').Router()
const userControl = require('../controllers/userControl')

router.post('/register', userControl.register)


module.exports = router