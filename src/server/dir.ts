import { readdirSync } from 'fs'
import { IMAGES_DIR, IS_IMAGE } from './constants'

export function getAllImages() {
  const fileNames = readdirSync(IMAGES_DIR)
  const images = fileNames
    .filter((name) => {
      const ext = name.substring(name.lastIndexOf('.') + 1)
      return ext.match(IS_IMAGE)
    })
    .map((name) => '/' + name)
  return images
}
