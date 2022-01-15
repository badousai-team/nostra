const paseto = require('paseto')

const { V4 } = paseto

// set default env if not provided
require('dotenv').config({ path: '../../.env' })

const Config = require('./config')
const S3Config = require('./s3_config')

const ENV = process.env.NODE_ENV || 'development'
const HMY_PRIVATE_KEY = process.env.HMY_PRIVATE_KEY || ''

const PASETO_PRIVATE_KEY = process.env.PASETO_PRIVATE_KEY || ''
const PASETO_PUBLIC_KEY = process.env.PASETO_PUBLIC_KEY || ''

const CORS_ORIGIN = process.env.CORS_ORIGIN || '*'

module.exports = {
  S3Config,
  dbConfig: Config[ENV],
  dbPosConfig: Config['pos'],
  HMY_PRIVATE_KEY,
  PASETO_PRIVATE_KEY: V4.bytesToKeyObject(new Buffer(PASETO_PRIVATE_KEY, 'base64')),
  PASETO_PUBLIC_KEY: V4.bytesToKeyObject(new Buffer(PASETO_PUBLIC_KEY, 'base64')),
  CORS_ORIGIN,
  env: {
    PRODUCTION: ENV === 'production',
    DEVELOPMENT: ENV === 'development',
    TEST: ENV === 'test',
  },
}
