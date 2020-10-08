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
  import type { Data, PreloadData } from '../typings'

  export let preloadData: PreloadData
  let averageData = preloadData.average
  let latestData = preloadData.latest
  let allData = preloadData.all
  let latestTarget = ''
  let images = preloadData.images

  const socket = io()

  socket.on('row', (data: Data) => {
    latestData = data
    allData = {
      readings: [...allData.readings, ...latestData.readings],
      gas: [...allData.gas, ...latestData.gas],
    }
    latestTarget = data.readings[0]['TARGET TYPE']
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

  .readings {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 200px;
  }

  .cols {
    display: grid;
    grid-template-columns: repeat(2, 50%);
  }

  .rows {
    display: grid;
    grid-template-rows: 70px 1fr;
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
    <Readings title="GAS LEVELS" readings={latestData.gas} />
    <Readings title="AVERAGE TARGET READINGS" readings={averageData.readings} />
    <Readings
      title="CURRENT READINGS"
      readings={latestData.readings}
      active={{ 'TARGET TYPE': latestTarget }} />
    <Download />
  </div>
</main>
