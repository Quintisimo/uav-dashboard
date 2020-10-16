export interface EnvData {
  TEMPERATURE: number
  HUMIDITY: number
  LIGHT: number
  NOISE: number
  PRESSURE: number
  time: string
  [key: string]: number | string
}

export interface Gas {
  RED: number
  OX: number
  NH3: number
  time: string
  [key: string]: number | string
}

interface Image {
  'MARKER ID': number
  [key: string]: number
}

interface Data {
  readings: EnvData[]
  gas: Gas[]
}

export interface LatestData extends Data {
  image: Image[]
}

export interface PreloadData {
  latest: LatestData
  all: Data
  images: string[]
}

export type Obj<V> = { [k: string]: V }
