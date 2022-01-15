const AWS = require('aws-sdk')
const { URL }  = require('url')

const { S3Config } = require('../config')

AWS.config.update({
  secretAccessKey: S3Config.secret,
  accessKeyId: S3Config.key,
  region: S3Config.region,
})

const _s3 = new AWS.S3({ params: { Bucket: S3Config.s3Bucket } })

// delete function
module.exports.deleteS3 = (key) => {
  return new Promise((resolve, reject) => {
    if (!key) resolve()
    // key is url of image
    const getPath = new URL(key)
    const [, , ...urlPaths] = getPath.pathname.split('/')
    const urlKey = decodeURIComponent(urlPaths.join('/'))

    _s3.deleteObject({ Key: urlKey }, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

const s3BaseUrl = `https://s3.${S3Config.region}.amazonaws.com/${S3Config.s3Bucket}`

module.exports.s3 = _s3
module.exports.baseUrl = s3BaseUrl
module.exports.assetUrl = S3Config.assetUrl

