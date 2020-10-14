export type Readings = {
  TEMPERATURE: number
  HUMIDITY: number
  LIGHT: number
  NOISE: number
  PRESSURE: number
  [key: string]: number
}

export interface Gas {
  // 'CARBON MONOXIDE': number
  // 'NITROGEN DIOXIDE': number
  // ETHANOL: number
  // HYDROGEN: number
  // PROPANE: number
  // 'ISO-BUTANE': number
  // AMMONIA: number
  // METHANE: number
  red: number
  ox: number
  nh3: number
  [key: string]: number
}

export interface Data {
  readings: Readings[]
  gas: Gas[]
}

export interface PreloadData {
  average: Data
  latest: Data
  all: Data
  images: string[]
}
