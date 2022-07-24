const router = require('express').Router()
const userControl = require('../controllers/userControl')
const auth = require('../middleware/auth')

//user register
router.post('/register', userControl.register)
//email activate 
router.post('/activation', userControl.activateEmail)
//login -- check email & password
router.post('/login', userControl.login)
//cookie access
router.post('/refresh_token', userControl.getAccessToken)
//check email and re-send passowrd
router.post('/forgot', userControl.forgotPassword)

router.post('/reset',auth, userControl.resetPassword)
module.exports = router