import sqlite from 'better-sqlite3'
import { DB_FILE } from './constants'
import type { EnvData, Gas, LatestData } from '../typings'

const allAirQualityQuery = `SELECT temperature AS 'TEMPERATURE', 
                          humidity AS 'HUMIDITY', 
                          light AS 'LIGHT', 
                          noise AS 'NOISE', 
                          pressure AS 'PRESSURE',
                          time
                          FROM envdata`

const allGasQuery = `SELECT red as 'RED', 
                    ox as 'OX',
                    nh3 as 'NH3',
                    time
                    FROM Gas`

export function getAllReadings() {
  const db = sqlite(DB_FILE)
  const allAirQuality = db.prepare(allAirQualityQuery).all() as EnvData[]
  const allGas = db.prepare(allGasQuery).all() as Gas[]

  const data = {
    readings: allAirQuality,
    gas: allGas,
  }
  db.close()
  return data
}

export function getLatestReadings() {
  const db = sqlite(DB_FILE)
  const latestReadings = `SELECT temperature AS 'TEMPERATURE', 
                          humidity AS 'HUMIDITY', 
                          light AS 'LIGHT', 
                          noise AS 'NOISE', 
                          pressure AS 'PRESSURE',
                          time
                          FROM envdata
                          ORDER BY id DESC LIMIT 1`

  const latestGas = `SELECT red AS 'RED', 
                    ox AS 'OX', 
                    nh3 as 'NH3',
                    time
                    FROM Gas
                    ORDER BY id DESC LIMIT 1`

  const latestMarker = `SELECT markerid as 'MARKER ID'
                        FROM ARUCO
                        ORDER BY id DESC LIMIT 1`

  const latestTarget = `SELECT targettype as 'TARGET TYPE'
                        FROM TARGETS
                        ORDER BY id DESC LIMIT 1`

  const data = {
    readings: [db.prepare(latestReadings).get()].filter(Boolean),
    gas: [db.prepare(latestGas).get()].filter(Boolean),
    image: [
      { ...db.prepare(latestMarker).get(), ...db.prepare(latestTarget).get() },
    ].filter(Boolean),
  } as LatestData
  db.close()
  return data
}
