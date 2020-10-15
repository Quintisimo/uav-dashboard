<script context="module">
  export async function preload() {
    const res = await this.fetch('api/initial')
    const preloadData = await res.json()
    return { preloadData }
  }
</script>

<script lang="ts">
  import io from 'socket.io-client'
  import ButtonWrapper from '../components/ButtonWrapper.svelte'
  import Readings from '../components/Readings.svelte'
  import Chart from '../components/Chart.svelte'
  import Images from '../components/Images.svelte'
  import Download from '../components/Download.svelte'
  import type { Data, EnvData, Gas, numberObj, PreloadData } from '../typings'

  export let preloadData: PreloadData

  const units = {
    TEMPERATURE: 'C',
    HUMIDITY: '%',
    LIGHT: 'Lux',
    NOISE: 'Dec',
    PRESSURE: 'HPa',
  }

  function average<G extends Array<numberObj>>(arr: G): G[number] {
    if (arr.length) {
      const keys = Object.keys(arr[0])
      let output: numberObj = {}

      for (const key of keys) {
        output[key] = Math.round(
          arr.map((e) => e[key]).reduce((prev, cur) => prev + cur, 0) /
            arr.length
        )
      }
      return output
    }
    return {}
  }

  const removeTime = (e: Gas | EnvData) => {
    const temp = { ...e }
    delete temp.time
    return temp as numberObj
  }

  let latestData = preloadData.latest
  let allData = preloadData.all
  let averageData = {
    readings: [average(allData.readings.map(removeTime) as numberObj[])],
    gas: [average(allData.gas.map(removeTime) as numberObj[])],
  }
  let images = preloadData.images

  const socket = io()

  socket.on('row', (data: Data) => {
    latestData = data
    allData = {
      readings: [...allData.readings, ...latestData.readings],
      gas: [...allData.gas, ...latestData.gas],
    }
    averageData = {
      readings: [average(allData.readings.map(removeTime) as numberObj[])],
      gas: [average(allData.gas.map(removeTime) as numberObj[])],
    }
  })

  socket.on('image', (data: string) => {
    images = [...images, data]
  })
</script>

<style>
  main {
    display: grid;
    grid-template-rows: 1fr 200px;
    margin: 20px;
    height: calc(100vh - 40px);
  }

  @media (max-width: 1200px) {
    main {
      display: block;
      height: auto;
    }
  }

  .readings {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    justify-items: center;
    align-items: center;
    gap: 20px;
    height: 200px;
  }

  .cols {
    display: grid;
    grid-template-columns: 0 100%;
    grid-template-columns: repeat(2, 50%);
  }

  @media (max-width: 1200px) {
    .cols {
      grid-template-columns: 100%;
    }
  }

  .rows {
    display: grid;
    grid-template-rows: 70px 1fr;
  }

  @media (max-width: 1200px) {
    .rows {
      grid-template-rows: auto;
    }
  }
</style>

<main>
  <div class="cols">
    <Images {images} />
    <div class="rows">
      <ButtonWrapper />
      <Chart {allData} />
    </div>
  </div>
  <div class="readings">
    <Readings
      title="AVERAGE TARGET READINGS"
      readings={averageData.readings}
      {units} />
    <Readings title="GAS LEVELS" readings={latestData.gas} ignore={['time']} />
    <Readings
      title="CURRENT READINGS"
      readings={latestData.readings}
      {units}
      ignore={['time']} />
  </div>
  <Download />
</main>
