'use strict'

module.exports = function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || res.statusCode === 200 ? 500 : res.statusCode

  if (process.env.NODE_ENV !== 'production') {
    console.error('[ERROR]', err.message, err.stack)
  }

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message)
    return res.status(422).json({ success: false, error: 'Validation failed', details: messages })
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0]
    return res.status(409).json({ success: false, error: `${field} already exists.` })
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ success: false, error: 'Invalid ID format.' })
  }

  res.status(statusCode).json({
    success: false,
    error: err.message || 'Internal Server Error',
  })
}
