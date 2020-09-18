export interface Readings {
  'target type': string
  temperature: number
  humidity: number
  light: number
  noise: number
  pressure: number
}

export interface Gas {
  'carbon monoxide': number
  'nitrogen dioxide': number
  ethanol: number
  hydrogen: number
  propane: number
  'iso-butane': number
  ammonia: number
  methane: number
}

export interface Data {
  readings: Readings[]
  gas: Gas[]
}

export interface PreloadData {
  average: Data
  latest: Data
}
