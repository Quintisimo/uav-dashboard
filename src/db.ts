import sqlite from 'better-sqlite3'
import { join } from 'path'
import { average, transformObj } from './util'
import type { Readings, Gas } from './typings/data'

export const dbFile = join(__dirname, '../../../sql/test.db')

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
  const db = sqlite(dbFile)
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
      gas: transformObj(averageGas),
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
  const db = sqlite(dbFile)
  const latestReadingsA = `SELECT [target type] AS 'TARGET TYPE', 
                          temperature AS 'TEMPERATURE', 
                          humidity AS 'HUMIDITY', 
                          light AS 'LIGHT', 
                          noise AS 'NOISE', 
                          pressure AS 'PRESSURE'
                          FROM Readings
                          WHERE [target type] = 'A'
                          ORDER BY id DESC LIMIT 1`

  const latestReadingsB = `SELECT [target type] AS 'TARGET TYPE', 
                          temperature AS 'TEMPERATURE', 
                          humidity AS 'HUMIDITY', 
                          light AS 'LIGHT', 
                          noise AS 'NOISE', 
                          pressure AS 'PRESSURE' 
                          FROM Readings
                          WHERE [target type] = 'B'
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
    readings: [
      db.prepare(latestReadingsA).get(),
      db.prepare(latestReadingsB).get(),
    ].filter(Boolean) as Readings[],
    gas: transformObj(db.prepare(latestGas).get()) as Gas[],
  }
  db.close()
  return data
}
