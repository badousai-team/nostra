import { makeAutoObservable } from 'mobx'

export default class InfoSectionStore {
  selected = null

  constructor() {
    makeAutoObservable(this)
  }

  reset = () => {
    this.selected = null
  }

  select = (selected) => {
    if (this.selected && this.selected.id === selected.id) {
      this.selected = null
      return
    }
    this.selected = selected
  }

  replace = (newValue) => {
    this.selected = { ...newValue }
  }
}
