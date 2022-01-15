import { makeAutoObservable } from 'mobx'

export default class NotificationStore {
  success = null
  errors = []

  constructor() {
    makeAutoObservable(this)
  }

  pushError = (message) => {
    this.errors.push(message)
  }

  shiftError = () => {
    this.errors.shift()
  }

  clearError = () => {
    this.errors = []
  }

  setSuccess = (message) => {
    this.success = message
  }

  clearSuccess = () => {
    this.success = ''
  }
}
