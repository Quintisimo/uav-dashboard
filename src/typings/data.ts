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

export interface Location {
  x: number
  y: number
  z: number
  target: 'A' | 'B'
  [key: string]: number | 'A' | 'B'
}

export interface Image {
  id: number
  image: string
}

export interface Data {
  readings: Readings[]
  gas: Gas[]
}

export interface DataAndLoc extends Data {
  location: Location[]
}

export interface PreloadData {
  average: Data
  latest: DataAndLoc
  all: Data
  images: Image[]
}
