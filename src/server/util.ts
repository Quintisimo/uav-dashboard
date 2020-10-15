import { readdir } from 'fs-extra'
import { IMAGES_DIR, IS_IMAGE } from './constants'

export function isImage(name: string) {
  const ext = name.substring(name.lastIndexOf('.') + 1)
  return ext.match(IS_IMAGE)
}

export async function getImages() {
  const fileNames = await readdir(IMAGES_DIR)
  return fileNames.filter(isImage)
}
