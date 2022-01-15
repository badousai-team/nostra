require('dotenv').config({ path: '../../.env' })
const Big = require('big.js')

module.exports.HMY_RPC_URL = process.env.HMY_RPC_URL || 'https://api.s0.t.hmny.io'
module.exports.TOKEN_ADDR = process.env.TOKEN_ADDR || '0x48F2E126A6EdC0C72fbC8e873B2ba05401405575'
module.exports.CONTRACT_ADDR = process.env.CONTRACT_ADDR || '0x25c97110da35A146BB246993D4b8e08B511D9f75'
module.exports.WEI = new Big(10).pow(18)
module.exports.GAS_LIMIT = 345577
module.exports.GAS_PRICE = new Big(10).pow(10).toFixed(0)
module.exports.MAX_APPROVAL_VALUE = '115792089237316200000000000000000000000000000000000000000000'
