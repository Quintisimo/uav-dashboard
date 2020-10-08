import sqlite from 'better-sqlite3'
import { average, transformObj } from './util'
import type { Readings, Gas } from '../typings'
import { DB_FILE } from './constants'

const allAirQualityQuery = `SELECT [target type] AS 'TARGET TYPE', 
                          temperature AS 'TEMPERATURE', 
                          humidity AS 'HUMIDITY', 
                          light AS 'LIGHT', 
                          noise AS 'NOISE', 
                          pressure AS 'PRESSURE'
                          FROM Readings`

const allGasQuery = `SELECT [carbon monoxide] AS 'CARBON MONOXIDE', 
                    [nitrogen dioxide] AS 'NITROGEN DIOXIDE', 
                    ethanol AS 'ETHANOL', 
                    hydrogen AS 'HYDROGEN', 
                    propane AS 'PROPANE', 
                    [iso-butane] AS 'ISO-BUTANE', 
                    ammonia AS 'AMMONIA', 
                    methane AS 'METHANE' 
                    FROM Gas`

export function getAllReadings() {
  const db = sqlite(DB_FILE)
  const allAirQuality = db.prepare(allAirQualityQuery).all() as Readings[]
  const allGas = db.prepare(allGasQuery).all() as Gas[]

  const getAirQuality = (type: 'A' | 'B') =>
    allAirQuality
      .filter((e) => e['TARGET TYPE'] === type)
      .map((e) =>
        Object.keys(e).reduce((prev, cur) => {
          if (cur !== 'TARGET TYPE') {
            return {
              ...prev,
              [cur]: e[cur],
            }
          }
          return prev
        }, {})
      )

  const averageTypeA = { 'TARGET TYPE': 'A', ...average(getAirQuality('A')) }
  const averageTypeB = { 'TARGET TYPE': 'B', ...average(getAirQuality('B')) }

  const averageGas = average(allGas)

  const data = {
    average: {
      readings: [averageTypeA, averageTypeB] as Readings[],
      // TODO: correct type
      gas: transformObj(averageGas) as Gas[],
    },
    all: {
      readings: allAirQuality,
      gas: allGas,
    },
  }
  db.close()
  return data
}

export function getLatestReadings() {
  const db = sqlite(DB_FILE)
  const latestReadings = `SELECT [target type] AS 'TARGET TYPE', 
                          temperature AS 'TEMPERATURE', 
                          humidity AS 'HUMIDITY', 
                          light AS 'LIGHT', 
                          noise AS 'NOISE', 
                          pressure AS 'PRESSURE'
                          FROM Readings
                          ORDER BY id DESC LIMIT 1`

  const latestGas = `SELECT [carbon monoxide] AS 'CARBON MONOXIDE', 
                    [nitrogen dioxide] AS 'NITROGEN DIOXIDE', 
                    ethanol AS 'ETHANOL', 
                    hydrogen AS 'HYDROGEN', 
                    propane AS 'PROPANE', 
                    [iso-butane] AS 'ISO-BUTANE', 
                    ammonia AS 'AMMONIA', 
                    methane AS 'METHANE' 
                    FROM Gas
                    ORDER BY id DESC LIMIT 1`

  const data = {
    readings: [db.prepare(latestReadings).get()].filter(Boolean) as Readings[],
    // TODO: correct type
    gas: transformObj(db.prepare(latestGas).get()) as Gas[],
  }
  db.close()
  return data
}
