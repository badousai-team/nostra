import Big from 'big.js'
import { makeAutoObservable } from 'mobx'

import ERC20_ABI from '@nostra/contract/abi/erc20ABI.json'
import { TOKEN_ADDR, CONTRACT_ADDR, WEI, GAS_LIMIT, GAS_PRICE, MAX_APPROVAL_VALUE } from '@nostra/contract/helper'

import { transport } from 'site/explorer/ws'

import * as srv from 'site/services'
import { setApiAuth } from 'site/services/api'
import handleError from 'site/services/error-handler'

const initWeb3 = () => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise((resolve, reject) => {
    import('web3').then(async ({ default: Web3 }) => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum)
        window.web3 = web3
        try {
          resolve(web3)
        } catch (error) {
          reject(error)
        }
      } else if (window.web3) {
        const { web3 } = window
        resolve(web3)
      } else {
        resolve('No MetaMask installed.')
      }
    })
  })
}

export default class AccountStore {
  user = null
  account = ''
  provider = null
  loading = false
  loadingNFT = false
  processing = false
  processingMetamask = false
  openLoginDialog = false
  web3App = null
  balance = 0
  allowance = 0
  contractToken = null
  contractApp = null

  constructor(rootStore) {
    makeAutoObservable(this, {}, { autoBind: true })
    this.rootStore = rootStore
  }

  get accountShortDisplay() {
    if (!this.account) return ''
    return `${this.account.substr(0, 4)}...${this.account.substr(38, 4)}`
  }

  get accountProfileShortDisplay() {
    if (!this.account) return ''
    return `${this.account.substr(0, 6)}...${this.account.substr(38, 4)}`
  }

  get authorized() {
    return (!!this.account)
  }

  get flagPrice() {
    if (
      !this.configFlag ||
      !this.configFlag.price
    ) return 1000
    return this.configFlag.price
  }

  setUser = (value) => {
    this.user = value
  }

  * getBalance() {
    const tokenBalance = yield this.contractToken.methods.balanceOf(this.account).call()
    const balance = Big(tokenBalance).div(WEI).toFixed(0, 0) // round down
    this.balance = Number(balance)
  }

  * setAccount(account) {
    this.account = account.toLowerCase()
    if (account) {
      window.localStorage.setItem('connectorId', 'injected')
      if (!this.contractToken) return
      this.getBalance()

      const allowance = yield this.tokenAllowance()
      this.allowance = allowance ? Number(Big(allowance).div(WEI).toFixed(0, 0)) : 0
    } else {
      this.balance = 0
    }
  }

  setLoading(value) {
    this.loading = value
  }

  setLoginDialog = (value) => {
    this.openLoginDialog = value
  }

  setProcessingMetamask = (value) => {
    this.processingMetamask = value
  }

  handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      this.logout()
    } else {
      if (this.account && accounts[0].toLowerCase() !== this.account) {
        this.logout()
      }
      this.setAccount(accounts[0])
    }
  }

  initContract = () => {
    this.contractToken = new this.web3App.eth.Contract(ERC20_ABI, TOKEN_ADDR)
    // this.contractApp = new this.web3App.eth.Contract(APP_ABI, CONTRACT_ADDR)
  }

  * tokenAllowance() {
    if (!this.account) return 0
    const tokenAlowance = yield this.contractToken.methods.allowance(this.account, CONTRACT_ADDR).call()
    return tokenAlowance
  }

  * checkAllowance(amount) {
    const tokenAlowance = yield this.tokenAllowance()
    if ((new Big(tokenAlowance).lt(amount))) {
      yield this.contractToken.methods.approve(CONTRACT_ADDR, MAX_APPROVAL_VALUE).send({
        from: this.account,
        gasPrice: GAS_PRICE,
        gasLimit: GAS_LIMIT,
      })
    }
    const allowance = yield this.tokenAllowance()
    this.allowance = allowance ? Number(Big(allowance).div(WEI).toFixed(0, 0)) : 0
  }

  * approveToken(amount) {
    try {
      this.processingMetamask = true
      const bigAmount = new Big(amount).times(WEI)
      yield this.checkAllowance(bigAmount)
      this.rootStore.notificationStore.setSuccess('Successfully approved to use token')
    } catch (err) {
      this.rootStore.notificationStore.pushError(err)
    } finally {
      this.processingMetamask = false
    }
  }

  * logout() {
    try {
      const res = yield srv.logout()
      if (!res.ok) throw handleError(res, { silentFail: true })
      window.localStorage.removeItem('connectorId')
      this.setAccount('')
      this.setUser(null)
    } catch (err) {
      this.rootStore.notificationStore.pushError(err)
    }
  }

  * connect() {
    try {
      this.processingMetamask = true

      this.web3App = yield initWeb3()
      if (this.web3App === 'No MetaMask installed.') {
        throw new Error({ code: 0, message: 'No MetaMask installed' })
      }

      this.initContract()

      this.web3App.currentProvider.on('accountsChanged', async (e) => {
        console.log('accountsChanged', e)
        const accounts = await this.web3App.eth.requestAccounts()
        this.handleAccountsChanged(accounts)
      })
      this.web3App.currentProvider.on('disconnect', (e) => {
        console.log('disconnect', e)
        this.logout()
      })

      const accounts = yield this.web3App.eth.requestAccounts()

      this.handleAccountsChanged(accounts)
      this.processingMetamask = false
    } catch (err) {
      this.rootStore.notificationStore.pushError(err)
      this.setAccount('')
      this.processingMetamask = false
    }
  }

  * signNonce(nonce) {
    if (!window.localStorage.getItem('connectorId')) return ''
    if (!this.account) return ''
    try {
      this.processingMetamask = true
      const signature = yield this.web3App.eth.personal.sign(nonce, this.account)
      this.processingMetamask = false
      return signature
    } catch (err) {
      this.rootStore.notificationStore.pushError(err)
      this.processingMetamask = false
      return ''
    }
  }

  * generateToken() {
    const params = { address: this.account }

    const resNonce = yield srv.getSessionNonce()
    if (!resNonce.ok) throw new Error('silent')

    params.nonce = resNonce.data
    params.signature = yield this.signNonce(params.nonce)
    if (!params.signature) return false

    const resSignature = yield srv.signSessionNonce(params)
    if (!resSignature.ok) throw new Error('silent')
    setApiAuth(resSignature.data.access)

    return true
  }

  * login() {
    try {
      this.loading = true
      yield this.connect()

      const isTokenGenerated = yield this.generateToken()
      if (!isTokenGenerated) return

      yield this.current()

      // close dialog when done
      this.setLoginDialog(false)
    } catch (err) {
      this.rootStore.notificationStore.pushError(err)
      this.logout()
    } finally {
      this.loading = false
    }
  }

  * current() {
    try {
      const resCurrentUser = yield srv.currentUser()
      if (!resCurrentUser.ok) throw new Error('silent')
      this.setUser(resCurrentUser.data)
    } catch (err) {
      this.rootStore.notificationStore.pushError(err)
      this.setAccount('')
      this.setUser(null)
    }
  }

  * session() {
    try {
      this.loading = true
      yield this.connect()
      if (!this.account) return null
      const resCurrentSession = yield srv.currentSession(this.account)
      if (!resCurrentSession.ok) throw new Error('silent')
      setApiAuth(resCurrentSession.data.access)
      yield this.current()
      return resCurrentSession.data
    } catch (err) {
      this.setAccount('')
      this.setUser(null)
      setApiAuth(null)
      return null
    } finally {
      this.loading = false
    }
  }

  * updateUsername(username) {
    try {
      this.processing = true
      const resUpdateUsername = yield srv.updateUsername(username)
      if (!resUpdateUsername.ok) throw handleError(resUpdateUsername, { silentFail: true })
      this.rootStore.notificationStore.setSuccess('Successfully updated username')
      yield this.current()
      return true
    } catch (err) {
      this.rootStore.notificationStore.pushError(err)
      return false
    } finally {
      this.processing = false
    }
  }

  * updateUserProfile(username, profileUrl) {
    if (this.processing) return true
    try {
      this.processing = true
      const resUpdateUserProfile = yield srv.updateUserProfile(username, profileUrl)
      if (!resUpdateUserProfile.ok) throw handleError(resUpdateUserProfile, { silentFail: true })
      this.rootStore.notificationStore.setSuccess('Successfully updated user profile')
      yield this.current()
      return true
    } catch (err) {
      this.rootStore.notificationStore.pushError(err)
      return false
    } finally {
      this.processing = false
    }
  }

  * getUserNFTs() {
    if (!this.account || !this.user || this.loadingNFT) return null
    try {
      this.loadingNFT = true
      const response721 = yield transport('getUserERC721Assets', [this.account])
      const response1155 = yield transport('getUserERC1155Balances', [this.account])

      const list = []

      response721 // populate hrc721 images
        .filter((item) => (item.meta && item.meta.image))
        .forEach((item) => {
          list.push({
            id: `${item.tokenAddress}::${item.tokenID}`,
            name: item.meta.name,
            url: item.meta.image,
          })
        })

      response1155 // populate hrc1155 vinci images
        .filter((item) => (item.meta && item.meta.image && item.meta.symbol === 'VINCI')) // support VINCI only for now
        .forEach((item) => {
          list.push({
            id: `${item.tokenAddress}::${item.tokenID}`,
            name: item.meta.name,
            url: `https://davinci.gallery/uploads/artwork/${item.meta.image}`,
          })
        })

      return list
    } catch (err) {
      this.rootStore.notificationStore.pushError(err)
      return null
    } finally {
      this.loadingNFT = false
    }
  }
}
