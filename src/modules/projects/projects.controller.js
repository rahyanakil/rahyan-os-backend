'use strict'
const Project = require('./projects.model')

exports.getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ published: true })
      .sort({ order: 1, createdAt: 1 })
      .lean()
    res.json({ success: true, count: projects.length, data: projects })
  } catch (err) {
    next(err)
  }
}

exports.getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).lean()
    if (!project) return res.status(404).json({ success: false, error: 'Project not found.' })
    res.json({ success: true, data: project })
  } catch (err) {
    next(err)
  }
}

exports.createProject = async (req, res, next) => {
  try {
    const project = await Project.create(req.body)
    res.status(201).json({ success: true, data: project })
  } catch (err) {
    next(err)
  }
}

exports.updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    )
    if (!project) return res.status(404).json({ success: false, error: 'Project not found.' })
    res.json({ success: true, data: project })
  } catch (err) {
    next(err)
  }
}

exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)
    if (!project) return res.status(404).json({ success: false, error: 'Project not found.' })
    res.json({ success: true, data: {} })
  } catch (err) {
    next(err)
  }
}
