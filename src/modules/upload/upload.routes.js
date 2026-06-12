'use strict'
const router = require('express').Router()
const protect = require('../../middleware/auth.middleware')
const { getSignedUploadUrl, deleteImage } = require('./upload.controller')

router.post('/sign', protect, getSignedUploadUrl)
router.delete('/delete', protect, deleteImage)

module.exports = router
