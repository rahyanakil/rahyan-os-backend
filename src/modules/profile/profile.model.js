'use strict'
const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema(
  {
    headline: { type: String, required: true },
    subheadline: { type: String },
    bio: [{ type: String }],
    identityRows: [
      {
        key: String,
        val: String,
        accent: { type: Boolean, default: false },
        green: { type: Boolean, default: false },
      },
    ],
    systemFacts: [
      {
        k: String,
        v: String,
        accent: { type: Boolean, default: false },
      },
    ],
    stats: [{ num: String, label: String }],
    activeProcesses: [
      {
        pid: String,
        name: String,
        desc: String,
        tag: String,
        link: String,
        tagColor: String,
      },
    ],
    operatingPrinciples: [
      { icon: String, title: String, desc: String },
    ],
    stackLayers: [
      {
        label: String,
        items: [String],
        color: String,
      },
    ],
    currentlyBuilding: {
      name: String,
      desc: String,
      link: String,
    },
    social: [{ label: String, href: String }],
    location: String,
    openToWork: { type: Boolean, default: true },
  },
  { timestamps: true }
)

module.exports = mongoose.models.Profile || mongoose.model('Profile', ProfileSchema)
