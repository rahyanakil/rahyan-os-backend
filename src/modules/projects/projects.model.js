'use strict'
const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema(
  {
    pid: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    subtitle: String,
    status: {
      type: String,
      enum: ['BUILDING', 'DEPLOYED', 'LIVE', 'ARCHIVED'],
      default: 'DEPLOYED',
    },
    statusColor: String,
    problem: String,
    solution: String,
    decisions: [String],
    challenges: [String],
    outcome: String,
    stack: [String],
    tags: [String],
    images: [String],
    live: String,
    github: String,
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
)

ProjectSchema.index({ order: 1 })
ProjectSchema.index({ published: 1 })

module.exports = mongoose.models.Project || mongoose.model('Project', ProjectSchema)
