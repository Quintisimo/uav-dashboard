import type { ClientRequest, ServerResponse } from 'http'
import { getAllReadings, getLatestReadings } from '../../server/db'
import { getAllImages } from '../../server/dir'
import type { PreloadData } from '../../typings'

export async function get(_req: ClientRequest, res: ServerResponse) {
  const images = await getAllImages()
  res.end(
    JSON.stringify({
      all: getAllReadings(),
      latest: getLatestReadings(),
      images,
    } as PreloadData)
  )
}
