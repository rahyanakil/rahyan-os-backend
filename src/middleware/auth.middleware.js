'use strict'
const jwt = require('jsonwebtoken')

module.exports = function protect(req, res, next) {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Not authorized. No token.' })
  }

  const token = header.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch {
    return res.status(401).json({ success: false, error: 'Not authorized. Invalid token.' })
  }
}
