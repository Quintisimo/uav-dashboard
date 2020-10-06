import http from 'http'
import sirv from 'sirv'
import polka from 'polka'
import compression from 'compression'
import * as sapper from '@sapper/server'
import io, { Socket } from 'socket.io'
import chokidar from 'chokidar'
import { DB_FILE, IMAGES_DIR } from './server/constants'
import { getLatestReadings } from './server/db'

let socket: Socket | null = null

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

chokidar.watch(DB_FILE).on('change', () => {
  if (socket !== null) socket.emit('row', getLatestReadings())
})

const server = http.createServer()
const app = polka({ server })

app.use(
  compression({ threshold: 0 }),
  sirv('static', { dev }),
  sirv(IMAGES_DIR, { dev: true }),
  sapper.middleware()
)

app.listen(PORT, (err: unknown) => {
  if (err) console.log('error', err)
})

io(server).on('connection', (s) => {
  socket = s
})
