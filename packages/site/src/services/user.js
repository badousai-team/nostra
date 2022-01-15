import { api } from './api'

export const updateUsername = (username) => api.patch('/user/username', { username })
export const updateUserProfile = (username, profileUrl) => api.patch('/user/profile', { username, profileUrl })
