import type { ClientRequest, ServerResponse } from 'http'
import { basename } from 'path'
import { createReadStream } from 'fs'
import { DB_FILE } from '../../server/constants'

export function get(_req: ClientRequest, res: ServerResponse) {
  res.writeHead(200, {
    'Content-Type': 'application/octet-stream',
    'Content-Disposition': 'attachment; filename=' + basename(DB_FILE),
  })
  const stream = createReadStream(DB_FILE)
  stream.pipe(res)
}
