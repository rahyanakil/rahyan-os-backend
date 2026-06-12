'use strict'
require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../modules/auth/auth.model')

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI)

  const existing = await User.findOne({ email: 'rahyanakil89@gmail.com' })
  if (existing) {
    console.log('Admin user already exists.')
    process.exit(0)
  }

  await User.create({
    email: 'rahyanakil89@gmail.com',
    password: 'ChangeMe123!',
    role: 'admin',
  })

  console.log('Admin user seeded. CHANGE THE PASSWORD immediately after first login.')
  process.exit(0)
}

seed().catch((err) => { console.error(err); process.exit(1) })
