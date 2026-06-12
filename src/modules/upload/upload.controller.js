'use strict'
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

exports.getSignedUploadUrl = async (req, res, next) => {
  try {
    const { folder = 'rahyan-os/projects', public_id } = req.body
    const timestamp = Math.round(Date.now() / 1000)

    const paramsToSign = {
      timestamp,
      folder,
      ...(public_id && { public_id }),
    }

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET
    )

    res.json({
      success: true,
      data: {
        signature,
        timestamp,
        folder,
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
      },
    })
  } catch (err) {
    next(err)
  }
}

exports.deleteImage = async (req, res, next) => {
  try {
    const { public_id } = req.body
    if (!public_id) {
      return res.status(400).json({ success: false, error: 'public_id is required.' })
    }
    const result = await cloudinary.uploader.destroy(public_id)
    res.json({ success: true, data: result })
  } catch (err) {
    next(err)
  }
}
