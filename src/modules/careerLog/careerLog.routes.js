'use strict'
const router = require('express').Router()
const protect = require('../../middleware/auth.middleware')
const { getAllEntries, createEntry, updateEntry, deleteEntry } = require('./careerLog.controller')

router.get('/', getAllEntries)
router.post('/admin', protect, createEntry)
router.put('/admin/:id', protect, updateEntry)
router.delete('/admin/:id', protect, deleteEntry)

module.exports = router
