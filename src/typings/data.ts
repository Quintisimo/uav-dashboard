export type Readings = {
  'TARGET TYPE': 'A' | 'B'
  TEMPERATURE: number
  HUMIDITY: number
  LIGHT: number
  NOISE: number
  PRESSURE: number
  [key: string]: number | 'A' | 'B'
}

export interface Gas {
  'CARBON MONOXIDE': number
  'NITROGEN DIOXIDE': number
  ETHANOL: number
  HYDROGEN: number
  PROPANE: number
  'ISO-BUTANE': number
  AMMONIA: number
  METHANE: number
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
}
