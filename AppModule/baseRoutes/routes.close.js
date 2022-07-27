const express = require('express')
const router = express.Router();
router.use('/api/v1/users', require('../api/v1/users/routes'))

module.exports = router