import { makeAutoObservable } from 'mobx'

import * as srv from 'site/services'
import { transport } from 'site/explorer/ws'

const THREE_DAYS = 3600 * 24 * 3 * 1000

export default class AppStore {
  lastPrice = null

  constructor() {
    makeAutoObservable(this)
  }
}
