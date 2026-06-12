'use strict'
const CareerLog = require('./careerLog.model')

exports.getAllEntries = async (req, res, next) => {
  try {
    const entries = await CareerLog.find().sort({ order: 1, startDate: -1 }).lean()
    res.json({ success: true, count: entries.length, data: entries })
  } catch (err) {
    next(err)
  }
}

exports.createEntry = async (req, res, next) => {
  try {
    const entry = await CareerLog.create(req.body)
    res.status(201).json({ success: true, data: entry })
  } catch (err) {
    next(err)
  }
}

exports.updateEntry = async (req, res, next) => {
  try {
    const entry = await CareerLog.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    )
    if (!entry) return res.status(404).json({ success: false, error: 'Entry not found.' })
    res.json({ success: true, data: entry })
  } catch (err) {
    next(err)
  }
}

exports.deleteEntry = async (req, res, next) => {
  try {
    const entry = await CareerLog.findByIdAndDelete(req.params.id)
    if (!entry) return res.status(404).json({ success: false, error: 'Entry not found.' })
    res.json({ success: true, data: {} })
  } catch (err) {
    next(err)
  }
}
