'use strict'
const router = require('express').Router()
const protect = require('../../middleware/auth.middleware')
const { login, getMe } = require('./auth.controller')

router.post('/login', login)
router.get('/me', protect, getMe)

module.exports = router
