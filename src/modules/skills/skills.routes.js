'use strict'
const router = require('express').Router()
const protect = require('../../middleware/auth.middleware')
const { getSkills, upsertSkills } = require('./skills.controller')

router.get('/', getSkills)
router.put('/admin', protect, upsertSkills)

module.exports = router
