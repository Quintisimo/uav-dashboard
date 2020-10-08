import { getImages } from './util'

export async function getAllImages() {
  const images = await getImages()
  const urls = images.map((name) => encodeURI('/' + name))
  return urls
}
