'use strict'
const router = require('express').Router()
const protect = require('../../middleware/auth.middleware')
const {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require('./projects.controller')

router.get('/', getAllProjects)
router.get('/:id', getProject)
router.post('/admin', protect, createProject)
router.put('/admin/:id', protect, updateProject)
router.delete('/admin/:id', protect, deleteProject)

module.exports = router
