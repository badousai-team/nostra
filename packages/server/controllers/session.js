const Web3 = require('web3')

const { HMY_RPC_URL } = require('@nostra/contract/helper')

const { randomCharacters } = require('../utils/helper')
const { logAction } = require('../utils/logs')
const { randomWord } = require('../utils/names')
const { parseToken, generateAccessToken, generateRefreshToken } = require('../utils/auth')

const {
  User,
} = require('../models')
const { db } = require('../models/db')
const { userAuth } = require('../middlewares/auth')

const router = require('express').Router()

router.post('/', async (req, res) => {
  const { address } = req.body
  if (
    !address
  ) {
    throw new Error('Invalid request')
  }
  if (
    !req.session ||
    !req.session.address ||
    !req.session.access ||
    !req.session.refresh
  ) {
    throw new Error('Missing Session')
  }
  if (address.toLowerCase() !== req.session.address.toLowerCase()) {
    throw new Error('Invalid address')
  }
  res.json({ access: req.session.access })
})

router.get('/current', userAuth, async (req, res) => {
  res.json(req.currentUser)
})

router.get('/nonce', async (req, res) => {
  const nonce = `I am signing my one time nonce: ${randomCharacters(24)}`
  res.end(nonce)
})

router.post('/sign', async (req, res, next) => {
  const { nonce, signature, address, refresh } = req.body
  if (!address) {
    throw new Error('Invalid request')
  }

  let nonceInput = nonce
  let signatureInput = signature

  const web3 = new Web3(new Web3.providers.HttpProvider(HMY_RPC_URL))

  let recoveredAddress
  if (refresh) {
    try {
      const payload = await parseToken(refresh)
      recoveredAddress = await web3.eth.accounts.recover(payload.nonce, payload.signature)
      nonceInput = payload.nonce
      signatureInput = payload.signature
    } catch (err) {
      if (err.message === '001401') { // display better context error
        throw new Error('001403')
      }
    }
  } else if (nonce && signature) {
    recoveredAddress = await web3.eth.accounts.recover(nonce, signature)
  }

  if (address.toLowerCase() !== recoveredAddress.toLowerCase()) {
    throw new Error('Invalid signature')
  }

  let transaction = null

  const lowerCaseAddress = recoveredAddress.toLowerCase()

  // Register or Login user
  try {
    transaction = await db.transaction()

    const [user, created] = await User.findOrCreate({
      where: { address: lowerCaseAddress },
      defaults: { address: lowerCaseAddress, status: 'active', username: randomWord(3, '-') },
      transaction,
    })

    if (created) {
      await logAction(
        req,
        {
          id: '',
          type: 'system',
        },
        {
          id: user.id,
          type: 'user',
        },
        'create',
        transaction,
      )
    }

    req.session.address = lowerCaseAddress
    req.session.access = await generateAccessToken(user.id)
    req.session.refresh = await generateRefreshToken(nonceInput, signatureInput)

    const response = {
      access: req.session.access,
    }

    await transaction.commit()

    res.json(response)
  } catch(e) {
    if (transaction) await transaction.rollback()
    next(e)
  }
})

router.post('/refresh', async (req, res) => {
  const { refresh } = req.session
  if (!refresh) {
    throw new Error('Invalid request')
  }

  const web3 = new Web3(new Web3.providers.HttpProvider(HMY_RPC_URL))
  const payload = await parseToken(refresh)
  const address = await web3.eth.accounts.recover(payload.nonce, payload.signature)

  const lowerCaseAddress = address.toLowerCase()

  const user = await User.findOne({
    where: { address: lowerCaseAddress, status: 'active' },
  })
  if (!user || !user.id) throw new Error('000401')

  req.session.address = lowerCaseAddress
  req.session.access = await generateAccessToken(user.id)
  req.session.refresh = await generateRefreshToken(payload.nonce, payload.signature)

  const response = {
    access: req.session.access,
  }

  res.json(response)
})

router.delete('/', async (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid', { path: '/' })
    res.end()
  })
})

module.exports = router