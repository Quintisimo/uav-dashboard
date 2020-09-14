import http from 'http'
import sirv from 'sirv'
import polka from 'polka'
import compression from 'compression'
import * as sapper from '@sapper/server'
import io from 'socket.io'

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'
const server = http.createServer()

polka({ server })
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware()
  )
  .listen(PORT, (err: unknown) => {
    if (err) console.log('error', err)
  })

io(server).on('connection', (socket) => {
  socket.emit('server-msg', 'Hello from server')

  socket.on('client-msg', (msg: string) => console.log(msg))
})
