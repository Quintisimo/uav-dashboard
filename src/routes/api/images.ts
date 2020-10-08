import { readdir, readFile } from 'fs/promises'
import { join } from 'path'
import JSZip from 'jszip'
import { IMAGES_DIR, IS_IMAGE } from '../../server/constants'
import type { ClientRequest, ServerResponse } from 'http'

export async function get(_req: ClientRequest, res: ServerResponse) {
  const zip = new JSZip()
  const fileNames = await readdir(IMAGES_DIR)
  const images = fileNames.filter((name) => {
    const ext = name.substring(name.lastIndexOf('.') + 1)
    return ext.match(IS_IMAGE)
  })

  for (const name of images) {
    const filePath = join(IMAGES_DIR, name)
    const data = await readFile(filePath)
    zip.file(name, data)
  }

  const stream = zip.generateNodeStream()
  stream.pipe(res)
}
