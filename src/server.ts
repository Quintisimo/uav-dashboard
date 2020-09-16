import http from 'http'
import path from 'path'
import sirv from 'sirv'
import polka from 'polka'
import compression from 'compression'
import * as sapper from '@sapper/server'
import io, { Socket } from 'socket.io'
import chokidar from 'chokidar'
import sqlite from 'better-sqlite3'

const dbFile = path.join(__dirname, '../../../sql/test.db')
const db = sqlite(dbFile)
// const readings =
//   "SELECT 'target type', temperature, humidity, light, noise, pressure FROM Readings"
// const gas =
//   "SELECT 'carbon monoxide', 'nitrogen dioxide', ethanol, hydrogen, propane, iso-butane, ammonia, methane FROM Gas"

let socket: Socket | null = null

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

const server = http.createServer()

chokidar.watch(dbFile).on('change', () => {
  const testData = db
    .prepare('SELECT text FROM TEST ORDER BY id DESC LIMIT 1')
    .get()
  if (socket !== null) socket.emit('row', testData)
})

const app = polka({ server })

app.use(
  compression({ threshold: 0 }),
  sirv('static', { dev }),
  sapper.middleware()
)

app.listen(PORT, (err: unknown) => {
  if (err) console.log('error', err)
})

io(server).on('connection', (s) => {
  socket = s
})
