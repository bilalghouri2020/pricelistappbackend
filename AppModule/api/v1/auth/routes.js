const router = require('express').Router()
const middleWare = require('./middleWare')
const controller = require('./controller')

router.post('/signup', middleWare.ValidateSignUp, controller.signup)
router.post('/login', middleWare.ValidateLogin, controller.login)

module.exports = router