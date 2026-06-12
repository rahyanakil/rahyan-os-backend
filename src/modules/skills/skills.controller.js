'use strict'
const Skills = require('./skills.model')

exports.getSkills = async (req, res, next) => {
  try {
    const skills = await Skills.findOne().lean()
    if (!skills) return res.status(404).json({ success: false, error: 'Skills not found.' })
    res.json({ success: true, data: skills })
  } catch (err) {
    next(err)
  }
}

exports.upsertSkills = async (req, res, next) => {
  try {
    const skills = await Skills.findOneAndUpdate(
      {},
      { $set: req.body },
      { new: true, upsert: true, runValidators: true }
    )
    res.json({ success: true, data: skills })
  } catch (err) {
    next(err)
  }
}
