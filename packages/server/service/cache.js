const redisClient = require('./redis')

const CacheService = {
  set: (key, value, expirationInSecond = 3600) => {
    return new Promise((resolve, reject) => {
      redisClient.set(key, value, 'EX', expirationInSecond, (error, ok) => {
        if (error) {
          return reject(error)
        }
        return resolve(ok)
      })
    })
  },

  get: (key) => {
    return new Promise((resolve, reject) => {
      redisClient.get(key, (error, reply) => {
        if (error) {
          return reject(error)
        }

        return resolve(reply === null ? null : reply.toString())
      })
    })
  },

  delete(key) {
    return new Promise((resolve, reject) => {
      redisClient.del(key, (error, count) => {
        if (error) {
          return reject(error)
        }
        return resolve(count)
      })
    })
  },
}

module.exports = CacheService
