'use strict'
const Profile = require('./profile.model')

exports.getProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne().lean()
    if (!profile) return res.status(404).json({ success: false, error: 'Profile not found.' })
    res.json({ success: true, data: profile })
  } catch (err) {
    next(err)
  }
}

exports.upsertProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      {},
      { $set: req.body },
      { new: true, upsert: true, runValidators: true }
    )
    res.json({ success: true, data: profile })
  } catch (err) {
    next(err)
  }
}
