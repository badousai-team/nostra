import { api } from './api'

export const currentSession = (address) => api.post('/session', { address })
export const currentUser = () => api.get('/session/current')
export const getSessionNonce = () => api.get('/session/nonce')
export const signSessionNonce = (params) => api.post('/session/sign', params)
export const logout = () => api.delete('/session')
