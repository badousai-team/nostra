require('dotenv').config({ path: '../../.env' })

module.exports = {
  key: process.env.AWS_KEY,
  secret: process.env.AWS_SECRET,
  s3Bucket: process.env.AWS_S3BUCKET,
  region: process.env.AWS_REGION,
  assetUrl: process.env.ASSET_URL,
}
