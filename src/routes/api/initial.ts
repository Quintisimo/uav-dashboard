import type { ClientRequest, ServerResponse } from 'http'
import { getAllReadings, getLatestReadings } from '../../server/db'
import { getAllImages } from '../../server/dir'
import type { PreloadData } from '../../typings'

export function get(_req: ClientRequest, res: ServerResponse) {
  res.end(
    JSON.stringify({
      ...getAllReadings(),
      latest: getLatestReadings(),
      images: getAllImages(),
    } as PreloadData)
  )
}
