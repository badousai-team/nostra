const crypto = require('crypto')
const moment = require('moment')

const possibleDigits = '0123456789'

module.exports.isNumber = string => string.match(/^\d+$/) !== null

module.exports.randomString = (length = 8) => crypto.randomBytes(length).toString('hex')

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
module.exports.validEmail = email => emailRegex.test(String(email).toLowerCase())

module.exports.deletedValue = (value) => {
  return `${value}_deleted_${moment().format('YYYY-MM-DD_HH:mm:ss')}`
}

module.exports.dateOnlyFormat = (string) => {
  const date = new Date(string)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}-${month}-${day}`
}

module.exports.dateFormatWithoutTz = (date) => {
  // 2021-07-20T13:34:22.321
  return moment(date).tz('UTC').format('YYYY-MM-DDTHH:mm:ss.SSS')
}

module.exports.randomNumber = (length = 8) => {
  let result = ''
  for (let i = 0; i < length; i++) {
    result += possibleDigits.charAt(Math.floor(Math.random() * 10))
  }
  return result
}

const POSSIBLE_CHARACTERS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
module.exports.randomCharacters = (length = 8) => {
  let result = ''
  for (let i = 0; i < length; i++) {
    result += POSSIBLE_CHARACTERS.charAt(Math.floor(Math.random() * 32))
  }
  return result
}

const outletCodeRegex = /^[A-Z]*$/
module.exports.validOutletCode = outletCode => outletCodeRegex.test(String(outletCode))

const driverCodeRegex = /^[A-Z]{3}$/
module.exports.validDriverCode = driverCode => driverCodeRegex.test(String(driverCode))

module.exports.dateTruncate = (date, interval = 'day') => {
  //  change 2021-07-01T08:09:00.000Z to 2021-07-01T00:00:00.000Z
  return moment(date).startOf(interval).toDate()
}

module.exports.isDateOutOfRange = (date) => {
  return moment(date).diff(moment().startOf('day'), 'days') > 30
}

// function handle for order query. orderBy value eg is 'channel.name'
// or 'customer.name' or just 'name
module.exports.handleOrderWithInclude = (sortBy, sortDirection, model = null) => {
  const sortBySplit = sortBy.split('.')
  if (sortBySplit.length > 1) {
    if (model) {
      return model === sortBySplit[0] ? [[sortBySplit[1], sortDirection]] : undefined
    }
    return undefined
  }
  return [[sortBy, sortDirection]]
}

// calculate at the integer level make 1 cent as lowest singular value
module.exports.toBase100 = (num) => Number.parseInt(Number(num) * 100, 10)
module.exports.fromBase100 = (num) => Number(num) / 100

// calculate page from limit and offset
module.exports.calculateLimitAndOffset = (currentPage, pageLimit = 10) => {
  const offset = (currentPage ? Number(currentPage) - 1 : 0) * Number(pageLimit)
  const limit = Number(pageLimit)
  return { offset, limit }
}

/**
 * @function paginate
 * @param {number} currentPage page number to get
 * @param {number} count total number of items
 * @param {array} rows items
 * @param {number} pageLimit number of items per page/request
 * @returns {object} return the meta for pagination
 */
module.exports.paginate = (currentPage, count, rows, pageLimit = 10) => {
  const meta = {
    currentPage: Number(currentPage) || 1,
    pageCount: Math.ceil(count / Number(pageLimit)),
    pageSize: rows.length,
    count,
  }
  return meta
}