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
  red: number
  ox: number
  nh3: number
  time: string
  [key: string]: number | string
}

export interface Data {
  readings: EnvData[]
  gas: Gas[]
}

export interface PreloadData {
  latest: Data
  all: Data
  images: string[]
}

export type numberObj = { [k: string]: number }
