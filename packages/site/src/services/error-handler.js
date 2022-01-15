import { ENV } from 'site/config'
import eventEmitter from 'site/utils/event'

const parseError = (response) => {
  switch (response.problem) {
  case 'CLIENT_ERROR':
  case 'SERVER_ERROR':
    if (
      response.data.meta &&
      response.data.meta.message
    ) {
      return {
        code: response.data.meta.code || 400,
        type: response.data.meta.type || 'externalError',
        message: response.data.meta.message,
      }
    }
    return {
      code: 400,
      type: 'externalError',
      message: 'External Error, please try again later',
    }
  case 'TIMEOUT_ERROR':
    return {
      code: 0,
      type: 'connectionTimeout',
      message: 'Connection timeout, please check your network connection',
    }
  case 'CONNECTION_ERROR':
    return {
      code: 0,
      type: 'dnsError',
      message: 'Cannot connect to server, please try again later',
    }
  case 'NETWORK_ERROR':
    return {
      code: 0,
      type: 'networkUnavailable',
      message: 'Network unavailable, please check your network connection',
    }
  default:
    return {
      code: 0,
      type: 'uncategorized',
      message: 'Unknown Error, please try again later',
    }
  }
}

export default (response, options = {}) => {
  const err = parseError(response)
  // eslint-disable-next-line no-console
  if (ENV !== 'PRODUCTION') console.log(err)
  if (!options.silentFail) {
    eventEmitter.emit('NOTIF_ERROR', err)
  }
  return err
}
