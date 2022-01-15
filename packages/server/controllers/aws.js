const router = require('express').Router()

const { S3Config } = require('../config')
const { randomString } = require('../utils/helper')
const { s3, assetUrl } = require('../utils/aws')

const signedUrlExpireSeconds = 60 * 60

router.get('/presigned-url', (req, res) => {
  const fileKey = `uploads/${randomString(8) + req.query.path}`

  const params = {
    Bucket: S3Config.s3Bucket,
    Key: fileKey,
    ContentType: req.query.type,
    Expires: signedUrlExpireSeconds,
  }

  s3.getSignedUrl('putObject', params, (err, url) => {
    if (err) {
      console.log('Error getting presigned url from AWS S3')
      throw new Error ('Pre-Signed URL error')
    }
    res.json({ url , mainUrl: `${assetUrl}/${fileKey}` })
  })
})

module.exports = router
