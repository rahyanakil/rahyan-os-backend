'use strict'
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const connectDB = require('../src/config/db')
const errorHandler = require('../src/middleware/error.middleware')

const authRoutes = require('../src/modules/auth/auth.routes')
const profileRoutes = require('../src/modules/profile/profile.routes')
const skillsRoutes = require('../src/modules/skills/skills.routes')
const projectsRoutes = require('../src/modules/projects/projects.routes')
const careerRoutes = require('../src/modules/careerLog/careerLog.routes')
const uploadRoutes = require('../src/modules/upload/upload.routes')

const app = express()

connectDB()

app.set('trust proxy', 1)

app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}))

const ALLOWED_ORIGINS = [
  process.env.FRONTEND_URL,
  'http://localhost:3000',
  'http://127.0.0.1:3000',
].filter(Boolean)

const corsOptions = {
  origin(origin, cb) {
    if (!origin) return cb(null, true)
    if (ALLOWED_ORIGINS.includes(origin)) return cb(null, true)
    return cb(new Error(`CORS blocked: ${origin}`))
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204,
}

app.use(cors(corsOptions))
app.options('*', cors(corsOptions))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests. Please try again later.' },
  skip: (req) => req.method === 'OPTIONS',
})
app.use('/api', limiter)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', ts: new Date().toISOString() })
})

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/profile', profileRoutes)
app.use('/api/v1/skills', skillsRoutes)
app.use('/api/v1/projects', projectsRoutes)
app.use('/api/v1/career', careerRoutes)
app.use('/api/v1/admin/upload', uploadRoutes)

app.use((req, res) => {
  res.status(404).json({ success: false, error: `Route ${req.originalUrl} not found` })
})

app.use(errorHandler)

const PORT = process.env.PORT || 4000
if (require.main === module) {
  app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`))
}

module.exports = app
