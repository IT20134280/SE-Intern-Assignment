const router = require('express').Router()
const userControl = require('../controllers/userControl')

//user register
router.post('/register', userControl.register)
//email activate 
router.post('/activation', userControl.activateEmail)
//login -- check email & password
router.post('/login', userControl.login)
//cookie access
router.post('/refresh_token', userControl.getAccessToken)

router.post('/forgot', userControl.forgotPassword)

module.exports = router