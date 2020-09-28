import type { ClientRequest, ServerResponse } from 'http'
import {
  getAllReadings,
  getLatestReadings,
  getAllImages,
} from '../../server/db'
import type { PreloadData } from '../../typings/data'

export async function get(_req: ClientRequest, res: ServerResponse) {
  const images = await getAllImages()
  res.end(
    JSON.stringify({
      ...getAllReadings(),
      latest: getLatestReadings(),
      images,
    } as PreloadData)
  )
}
