'use strict'
const router = require('express').Router()
const protect = require('../../middleware/auth.middleware')
const { getProfile, upsertProfile } = require('./profile.controller')

router.get('/', getProfile)
router.put('/admin', protect, upsertProfile)

module.exports = router
