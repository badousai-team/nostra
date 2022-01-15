/* eslint-disable no-const-assign */
import Big from 'big.js'
import {
  startOfDay, endOfDay, addDays, subDays, format,
} from 'date-fns'

export const appRoot = document.getElementById('app-root')

const numberFormat = new Intl.NumberFormat('en-US', { style: 'decimal', maximumFractionDigits: 2 })
export const formatNumber = (num) => {
  const number = Number(num)
  return numberFormat.format(number)
}

export const createDateFromTextValue = (value) => new Date(1970, 1, 1, value, '00')

const TODAY = new Date()
export const aWeekAgo = startOfDay(subDays(TODAY, 7))
export const aWeekAhead = endOfDay(addDays(TODAY, 7))
export const dateFormat = (date) => {
  return format(new Date(date), 'MMMM dd, yyyy')
}

export const groupByArrToObj = (objectArray, property) => {
  return objectArray.reduce((acc, obj) => {
    const key = obj[property]
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(obj)
    return acc
  }, {})
}

export const dateOnlyFormat = (string) => {
  const date = new Date(string)
  const year = date.getFullYear()
  const month = `0${date.getMonth() + 1}`.slice(-2)
  const day = date.getDate()
  return `${year}-${month}-${day}`
}

export const dateString = (string) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  const date = new Date(string)
  return date.toLocaleDateString('en-US', options)
}

export const splitArray = (inputArray = [], perChunk = 2) => {
  return inputArray.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / perChunk)

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [] // start a new chunk
    }

    resultArray[chunkIndex].push(item)

    return resultArray
  }, [])
}

export const WEI = new Big(10).pow(18)
export const GAS_LIMIT = 345577
export const GAS_PRICE = new Big(10).pow(10).toFixed(0)
