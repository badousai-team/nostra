const fs = require('fs') // from node.js
const path = require('path') // from node.js
const AWS = require('aws-sdk')
const s3 = require('s3-node-client')

const deployConfig = require('./deploy-config')

const build = require('./build')
const task = require('./task')

const target = process.env.TARGET || 'staging'
console.log('process.env.TARGET', process.env.TARGET, target)

AWS.config.update({ region: deployConfig.s3Region })

const cloudfront = new AWS.CloudFront({
  accessKeyId: deployConfig.awsKey,
  secretAccessKey: deployConfig.awsSecret,
})

const s3AWS = new AWS.S3({
  signatureVersion: 'v4',
  accessKeyId: deployConfig.awsKey,
  secretAccessKey: deployConfig.awsSecret,
})

const s3Client = s3.createClient({
  maxAsyncS3: 20, // this is the default
  s3Client: s3AWS,
  s3RetryCount: 3, // this is the default
  s3RetryDelay: 1000, // this is the default
  multipartUploadThreshold: 20971520, // this is the default (20 MB)
  multipartUploadSize: 15728640, // this is the default (15 MB)
  s3Options: {
    accessKeyId: deployConfig.awsKey,
    secretAccessKey: deployConfig.awsSecret,
    region: deployConfig.s3Region,
    // endpoint: 's3.yourdomain.com',
    // sslEnabled: false
    // any other options are passed to new AWS.S3()
    // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
  },
})

const distFolderPath = path.join(__dirname, '../dist')

const uploadS3 = task('uploadS3', () => new Promise((resolve) => {
  const bucket = deployConfig.s3Bucket[target]
  const params = {
    localDir: './dist',
    // deleteRemoved: true, // default false, whether to remove s3 objects
    // that have no corresponding local file.
    s3Params: {
      Bucket: bucket,
      CacheControl: 'public, max-age=31536000',
      // other options supported by putObject, except Body and ContentLength.
      // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
    },
  }
  const uploader = s3Client.uploadDir(params)
  uploader.on('error', (err) => {
    console.error('Unable to sync:', err.stack)
  })
  uploader.on('progress', () => {
    console.log('Progress', uploader.progressAmount, uploader.progressTotal)
  })
  uploader.on('end', () => {
    console.log('Done uploading dir')

    const filePath = path.join(distFolderPath, 'index.html')
    const fileStream = fs.createReadStream(filePath)
    fileStream.on('error', (err) => {
      console.log('File Error', err)
    })

    const uploadParams = {
      Bucket: bucket,
      Key: 'index.html',
      Body: fileStream,
      CacheControl: 'no-cache',
      ContentType: 'text/html',
    }

    s3AWS.upload(uploadParams, (err, data) => {
      if (err) {
        console.log('Upload Error', err)
      } if (data) {
        console.log('Upload Success', data.Location)
        resolve()
      }
    })
  })
}))

const invalidateCache = task('invalidateCache', () => {
  const cloudFrontDistIds = deployConfig.cloudFrontDistIds[target]
  const now = new Date()
  const key = `${now.getFullYear()}-${now.getMonth()}-${now.getDay()} ${now.getHours()}:${now.getMinutes()}`
  // eslint-disable-next-line max-len
  return Promise.all(cloudFrontDistIds.map((cloudfrontId) => new Promise((resolve) => cloudfront.createInvalidation({
    DistributionId: cloudfrontId, /* required */
    InvalidationBatch: { /* required */
      CallerReference: key, /* required */
      Paths: { /* required */
        Quantity: 1, /* required */
        Items: ['/*'],
      },
    },
  }, (err, data) => {
    if (err) console.log(err, err.stack) // an error occurred
    else console.log(data) // successful response
    resolve()
  }))))
})

// Build and deploy the app to Firebase
module.exports = task('deploy', () => Promise.resolve()
  .then(() => build())
  .then(() => uploadS3())
  .then(() => invalidateCache())
  .then(() => { setTimeout(() => process.exit(), 3000) }))
