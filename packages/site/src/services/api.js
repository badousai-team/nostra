import axios from 'axios'
import { create } from 'apisauce'
import qs from 'qs'

import handleError from 'site/services/error-handler'

const scheme = process.env.API_SERVER_SCHEME || 'http'
const host = process.env.API_SERVER_HOST || 'localhost'
const port = process.env.API_SERVER_PORT || '9000'

const baseURL = `${scheme}://${host}:${port}`

const axiosInstance = axios.create({ baseURL, withCredentials: true })

const apiSauce = create({
  axiosInstance,
  headers: {
    Accept: 'application/json;charset=UTF-8',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
  paramsSerializer: qs.stringify,
  timeout: 30000,
})

axiosInstance.interceptors.response.use(
  (res) => {
    return res
  },
  async (err) => {
    const originalConfig = err.config
    if (
      originalConfig.url !== '/session/sign' &&
      originalConfig.url !== '/session/refresh' &&
      err.response &&
      err.response.status === 401 &&
      !originalConfig._retry
    ) {
      // Access Token was expired
      originalConfig._retry = true

      try {
        const resRefresh = await axiosInstance.post('/session/refresh')
        if (!resRefresh.data) throw handleError(resRefresh, { silentFail: true })
        const { access } = resRefresh.data
        apiSauce.setHeader('x-access-token', access)
        originalConfig.headers['x-access-token'] = access
        return axiosInstance(originalConfig)
      } catch (_error) {
        await axiosInstance.delete('/session') // logout
        return Promise.reject(_error)
      }
    } else if (
      (
        originalConfig.url === '/session/sign' ||
        originalConfig.url === '/session/refresh'
      ) &&
      err.response &&
      (
        err.response.status === 401 ||
        err.response.status === 403
      )
    ) {
      await axiosInstance.delete('/session') // logout
      return Promise.resolve()
    }

    return Promise.reject(err)
  },
)

export const api = apiSauce
export const setApiAuth = (token) => apiSauce.setHeader('x-access-token', token)

export const awsApi = (url) => create({
  baseURL: url,
  headers: {
    Accept: 'application/json;charset=UTF-8',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
  paramsSerializer: qs.stringify,
  timeout: 30000,
})
