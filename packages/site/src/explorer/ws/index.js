import { io } from 'socket.io-client'

const socket = io(process.env.EXPLORER_WS, {
  transports: ['websocket'],
})

socket.connect()

export const transport = (method, params) => {
  return new Promise((resolve, reject) => {
    socket.emit(method, params, (res) => {
      try {
        const payload = JSON.parse(res.payload)

        if (res.event === 'Response') {
          resolve(payload)
        } else {
          reject(payload)
        }
      } catch (err) {
        reject(err)
      }
    })
  })
}
