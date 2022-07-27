const router = require('express').Router()

// const middleWare = require('./middleWare')
// const controller = require('./controller')

router.post('/checkToken', (req, res, next) => next(), (req, res) => {
    console.log('user authorized...');
    res.json({
        message: 'user authorized...',
        loginState: true

    })
    return
})
// router.post('/login', middleWare.ValidateLogin, controller.login)

module.exports = router