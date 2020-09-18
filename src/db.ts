import sqlite from 'better-sqlite3'
import { join } from 'path'
import type { Readings, Gas } from './typings/data'

export const dbFile = join(__dirname, '../../../sql/test.db')

function transformObj(o: object = {}) {
  return Object.entries(o)
    .reduce<[string, number][][]>(
      (acc, _, i, self) => (i % 4 ? acc : [...acc, self.slice(i, i + 4)]),
      []
    )
    .map((e) => e.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}))
}

export function getAllReadings() {
  const db = sqlite(dbFile)
  const averageReadingsA = `SELECT [target type] AS 'TARGET TYPE', 
                            AVG(temperature) as TEMPERATURE,
                            AVG(humidity) as HUMIDITY,
                            AVG(light) as LIGHT,
                            AVG(noise) as NOISE,
                            AVG(pressure) as PRESSURE
                            FROM Readings
                            WHERE [target type] = 'A'`

  const averageReadingsB = `SELECT [target type] AS 'TARGET TYPE', 
                            AVG(temperature) as TEMPERATURE,
                            AVG(humidity) as HUMIDITY,
                            AVG(light) as LIGHT,
                            AVG(noise) as NOISE,
                            AVG(pressure) as PRESSURE
                            FROM Readings
                            WHERE [target type] = 'B'`

  const averageGas = `SELECT AVG([carbon monoxide]) AS 'CARBON MONOXIDE', 
                      AVG([nitrogen dioxide]) AS 'NITROGEN DIOXIDE', 
                      AVG(ethanol) AS ETHANOL, 
                      AVG(hydrogen) AS HYDROGEN, 
                      AVG(propane) AS PROPANE, 
                      AVG([iso-butane]) AS 'ISO-BUTANE', 
                      AVG(ammonia) AS AMMONIA, 
                      AVG(methane) AS METHANE 
                      FROM Gas`

  const data = {
    readings: [
      db.prepare(averageReadingsA).get(),
      db.prepare(averageReadingsB).get(),
    ] as Readings[],
    gas: transformObj(db.prepare(averageGas).get()) as Gas[],
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
