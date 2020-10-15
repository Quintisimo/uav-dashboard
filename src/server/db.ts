import sqlite from 'better-sqlite3'
import { average } from './util'
import { DB_FILE } from './constants'
import type { EnvData, Gas, numberObj } from '../typings'

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

  const removeTime = (e: Gas | EnvData) => {
    const temp = { ...e }
    delete temp.time
    return temp as numberObj
  }

  // const getAirQuality = (type: 'A' | 'B') =>
  //   allAirQuality
  //     .filter((e) => e['TARGET TYPE'] === type)
  //     .map((e) =>
  //       Object.keys(e).reduce((prev, cur) => {
  //         if (cur !== 'TARGET TYPE') {
  //           return {
  //             ...prev,
  //             [cur]: e[cur],
  //           }
  //         }
  //         return prev
  //       }, {})
  //     )

  // const averageTypeA = { 'TARGET TYPE': 'A', ...average(getAirQuality('A')) }
  // const averageTypeB = { 'TARGET TYPE': 'B', ...average(getAirQuality('B')) }

  const data = {
    average: {
      readings: [average(allAirQuality.map(removeTime))].filter(
        Boolean
      ) as EnvData[],
      gas: [average(allGas.map(removeTime))].filter(Boolean) as Gas[],
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

  const data = {
    readings: [db.prepare(latestReadings).get()].filter(Boolean) as EnvData[],
    gas: [db.prepare(latestGas).get()].filter(Boolean) as Gas[],
  }
  db.close()
  return data
}
