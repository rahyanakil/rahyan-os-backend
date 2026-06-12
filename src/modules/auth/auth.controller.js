'use strict'
const jwt = require('jsonwebtoken')
const User = require('./auth.model')

function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required.' })
    }

    const user = await User.findOne({ email }).select('+password')
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, error: 'Invalid credentials.' })
    }

    user.lastLogin = new Date()
    await user.save({ validateBeforeSave: false })

    const token = signToken(user._id)
    res.json({
      success: true,
      token,
      user: { id: user._id, email: user.email, role: user.role },
    })
  } catch (err) {
    next(err)
  }
}

exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) return res.status(404).json({ success: false, error: 'User not found.' })
    res.json({ success: true, user: { id: user._id, email: user.email, role: user.role } })
  } catch (err) {
    next(err)
  }
}
