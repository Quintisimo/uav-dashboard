import { readdirSync } from 'fs'
import { IMAGES_DIR } from './constants'

export function getAllImages() {
  return readdirSync(IMAGES_DIR)
}
