const sql = require('better-sqlite3')
const db = sql('sql/sensors.db')

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

// Generate fake env and gas data for db
;(function () {
  const ROWS = 100
  const baseTemp = 29
  const baseHum = 28
  const basePres = 1009
  const baseNoi = 30

  const fakeEnvData = Array.from({ length: ROWS }, () => ({
    light: +(Math.random() * (300 - 100) + 100).toFixed(2),
    temperature: baseTemp + +Math.random().toFixed(2),
    humidity: baseHum + +Math.random().toFixed(2),
    pressure: basePres + +Math.random().toFixed(2),
    noise: baseNoi + +Math.random().toFixed(2),
  }))

  const fakeGas = Array.from({ length: ROWS }, () => ({
    red: +(Math.random() * (0.5 - 0.1) + 0.1).toFixed(2),
    ox: +(Math.random() * (0.05 - 0.01) + 0.01).toFixed(2),
    nh3: +(Math.random() * (0.05 - 0.01) + 0.01).toFixed(2),
  }))

  const insertMany = db.transaction(async ({ fakeEnvData, fakeGas, ROWS }) => {
    db.exec(`DELETE FROM envdata; DELETE FROM gas;`)
    for (let i = 0; i < ROWS; i++) {
      db.prepare(
        `INSERT INTO envdata (temperature, humidity, light, pressure, noise, time) 
        VALUES (@temperature, @humidity, @light, @pressure, @noise, @time)`
      ).run({ ...fakeEnvData[i], time: new Date().toISOString() })

      db.prepare(
        `INSERT INTO gas (red, ox, nh3, time) VALUES (@red, @ox, @nh3, @time)`
      ).run({ ...fakeGas[i], time: new Date().toISOString() })
      await sleep(1000)
    }
  })
  insertMany({ fakeEnvData, fakeGas, ROWS })
})()
