import { makeAutoObservable } from 'mobx'

const DEFAULT_PER_PAGE = 20

export default class PaginationStore {
  currentPage = 0
  perPage = DEFAULT_PER_PAGE

  constructor() {
    makeAutoObservable(this)
  }

  updatePage = (page) => {
    this.currentPage = page
  }

  updatePerPage = (perPage) => {
    this.perPage = perPage
  }
}
