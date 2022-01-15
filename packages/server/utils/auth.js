const crypto = require('crypto')
const { promisify } = require('util')
const paseto = require('paseto')

const config = require('../config')

const { V4 } = paseto

const generateKeyPair = promisify(crypto.generateKeyPair)
const issuer = config.env.CORS_ORIGIN

module.exports.generate = async () => {
  const { privateKey, publicKey } = await generateKeyPair('ed25519')
  console.log('INIT KEY')
  console.log('private', V4.keyObjectToBytes(privateKey).toString('base64'))
  console.log('public', V4.keyObjectToBytes(publicKey).toString('base64'))
  return
}

module.exports.parseToken = async (token) => {
  try {
    const payload = await V4.verify(token, config.PASETO_PUBLIC_KEY, {
      issuer,
      clockTolerance: '2 minutes',
    })
    return payload
  } catch (err) {
    if (err.message === 'token is expired') {
      throw new Error('001401')
    } else {
      throw err
    }
  }
}

module.exports.generateAccessToken = async (sub) => {
  const accessToken = await V4.sign({ sub }, config.PASETO_PRIVATE_KEY, {
    issuer,
    expiresIn: '30 minutes',
  })
  return accessToken
}

module.exports.generateRefreshToken = async (nonce, signature) => {
  try {
    const token = await V4.sign({ nonce, signature, timestamp: new Date().getTime() }, config.PASETO_PRIVATE_KEY, {
      issuer,
      expiresIn: '30 days',
    })
    return token
  } catch (e) {
    throw new Error('Generate refresh token error')
  }
}
