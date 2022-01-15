const redis = require('redis')

const redisHost = process.env.REDIS_SERVER || 'localhost'
const redisPassword = process.env.REDIS_PASSWORD || null
const redisDB = process.env.REDIS_DB || null
const redisTLS = process.env.REDIS_TLS || false

const redisParams = {
  host: redisHost,
}

if (redisPassword) redisParams.password = redisPassword
if (redisDB) redisParams.db = redisDB
if (redisTLS) redisParams.tls = { checkServerIdentity: () => undefined }

const redisClient = redis.createClient(redisParams)

redisClient.on('error', (error) => {
  console.error(error)
})

module.exports = redisClient
