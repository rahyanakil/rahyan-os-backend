'use strict'
const mongoose = require('mongoose')

let cached = global._mongooseCache
if (!cached) {
  cached = global._mongooseCache = { conn: null, promise: null }
}

async function connectDB() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }
    cached.promise = mongoose.connect(process.env.MONGODB_URI, opts)
      .then((m) => {
        console.log('MongoDB connected')
        return m
      })
      .catch((err) => {
        cached.promise = null
        throw err
      })
  }

  cached.conn = await cached.promise
  return cached.conn
}

module.exports = connectDB
