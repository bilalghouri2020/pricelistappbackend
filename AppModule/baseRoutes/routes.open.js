const express = require('express')
const app = express()
const router = express.Router()

router.use('/api/v1/auth', require('../api/v1/auth/routes'))

module.exports = router