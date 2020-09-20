import type { ClientRequest, ServerResponse } from 'http'
import { getAllReadings, getLatestReadings } from '../../db'
import type { PreloadData } from '../../typings/data'

export async function get(_req: ClientRequest, res: ServerResponse) {
  res.end(
    JSON.stringify({
      ...getAllReadings(),
      latest: getLatestReadings(),
    } as PreloadData)
  )
}
