'use strict'
const mongoose = require('mongoose')

const SkillsSchema = new mongoose.Schema(
  {
    layers: [
      {
        id: { type: String, required: true },
        label: String,
        desc: String,
        color: String,
        expert: [String],
        familiar: [String],
      },
    ],
    domains: [
      {
        num: String,
        title: String,
        icon: String,
        color: String,
        desc: String,
        delivers: [String],
        tags: [String],
      },
    ],
  },
  { timestamps: true }
)

module.exports = mongoose.models.Skills || mongoose.model('Skills', SkillsSchema)
