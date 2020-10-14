import { join } from 'path'

// export const DB_FILE = '/home/pi/enviroplus-python/examples/sensors.db'
export const DB_FILE = join(__dirname, '../../../sql/sensors.db')
export const IMAGES_DIR = join(__dirname, '../../../images')
export const IS_IMAGE = /png|jpeg|jpg/g
