/* eslint-disable no-console */
const moment = require('moment')

const { Action } = require('../models')

// avoid typo
const checkObject = (object) => {
  const objects = ['user', 'review', 'reviewAction', 'reviewReward', 'reviewFlag', 'project']
  if (!objects.includes(object)) throw new Error('Object name is not valid')
  return object
}

// avoid typo
const checkAction = (action) => {
  const actions = ['create', 'update', 'delete']
  if (!actions.includes(action)) throw new Error('Action is not valid')
  return action
}

module.exports.logAction = (req, subject, object, action, transaction) => {
  const { body } = req
  const options = (transaction) ? { transaction } : null

  // dont store password update sent in request body
  if (body.password) delete body.password

  return Action.create({
    subjectId: subject.id,
    subject: subject.type,
    objectId: object.id,
    object: checkObject(object.type),
    action: checkAction(action),
    value: body,
  }, options).catch((error) => {
    if (error && error.code !== 'ECONNABORTED') console.error(error)
  })
}

const mask = (params) => {
  if (params && params.password) {
    params.password = params.password.replace(/./g, '*')
  }
  return JSON.stringify(params)
}

module.exports.logWithMask = (req, message) => {
  console.error(moment().format('YYYY-MM-DD_HH:mm:ss'), 'CAUGHT ERROR:', message, req.method, req.originalUrl, mask(req.body))
}
