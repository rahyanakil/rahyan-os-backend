'use strict'
const mongoose = require('mongoose')

const CareerLogSchema = new mongoose.Schema(
  {
    hash: { type: String, required: true, unique: true },
    type: { type: String, enum: ['work', 'education', 'cert'], required: true },
    org: { type: String, required: true },
    role: String,
    period: String,
    startDate: Date,
    endDate: Date,
    location: String,
    context: String,
    color: String,
    icon: String,
    commits: [String],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

CareerLogSchema.index({ order: 1 })

module.exports = mongoose.models.CareerLog || mongoose.model('CareerLog', CareerLogSchema)
