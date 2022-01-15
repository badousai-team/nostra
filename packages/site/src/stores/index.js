import AccountStore from './account'
import AppStore from './app'
import InfoSectionStore from './info-section'
import NotificationStore from './notification'
import PaginationStore from './pagination'

class RootStore {
  constructor() {
    this.accountStore = new AccountStore(this)
    this.appStore = new AppStore(this)
    this.infoSectionStore = new InfoSectionStore(this)
    this.notificationStore = new NotificationStore(this)
    this.paginationStore = new PaginationStore(this)
  }
}

export const rootStore = new RootStore()
