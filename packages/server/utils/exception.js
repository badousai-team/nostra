const errorMessages = require('../config/message')

const template = (error, status) => {
  // error is an object
  if (typeof error.message !== 'undefined') {
    // can find matched message
    if (typeof errorMessages[error.message] !== 'undefined') {
      // translate the error
      const errMsg = errorMessages[error.message]
      return [{
        code: parseInt(errMsg.code, 10),
        type: error.message,
        message: errMsg.message,
      }, parseInt(errMsg.code, 10)]
    }

    // return error itself
    return [{
      code: status,
      type: error.type,
      message: error.message,
    }, status]
  }

  // error is a string and matched in message
  if (typeof errorMessages[error] !== 'undefined') {
    // translate the error
    const errMsg = errorMessages[error]
    return [{
      code: parseInt(errMsg.code, 10),
      type: error.message,
      message: errMsg.message,
    }, parseInt(errMsg.code, 10)]
  }

  // undefined error
  return [{
    code: 500,
    message: error,
  }, 500]
}

// if error more than one, take first only
const response = (error) => {
  // pre-defined error object
  if (
    typeof error.type !== 'undefined' &&
    error.type !== null &&
    typeof error.message !== 'undefined' &&
    error.message !== null
  ) {
    return [{ code: 400, ...error }, (error.code || 400)]
  }

  if (error === 'timeout') {
    return [{
      code: 500,
      message: error,
    }, 500]
  }

  return template((error.details || error.message), 400)
}

module.exports = response
