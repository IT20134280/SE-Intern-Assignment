const router = require('express').Router()
const userControl = require('../controllers/userControl')

router.post('/register', userControl.register)
router.post('/activation', userControl.activateEmail)


module.exports = router