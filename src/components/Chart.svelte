<script context="module" lang="ts">
  import type { Obj } from '../typings'
  function getColour() {
    return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)})`
  }

  const colours: Obj<string> = {
    TEMPERATURE: getColour(),
    HUMIDITY: getColour(),
    LIGHT: getColour(),
    NOISE: getColour(),
    PRESSURE: getColour(),
    RED: getColour(),
    OX: getColour(),
    NH3: getColour(),
  }
</script>

<script lang="ts">
  import Line from 'svelte-chartjs/src/Line.svelte'
  import { active } from './store'
  import type { Data } from '../typings'
  export let allData: Data

  $: datasets =
    $active !== 'GAS'
      ? [
          {
            data: allData.readings.map((item) => item[$active]),
            label: $active,
            borderColor: colours[$active],
            fill: false,
          },
        ]
      : Object.keys(allData.gas[0])
          .filter((key) => key !== 'time')
          .map((gas) => ({
            label: gas,
            data: allData.gas.map((e) => e[gas]),
            borderColor: colours[gas],
            fill: false,
          }))

  $: labels =
    $active !== 'GAS'
      ? allData.readings.map((item) => new Date(item.time))
      : allData.gas.map((item) => new Date(item.time))
</script>

<style>
  div {
    width: 49vw;
    margin: auto;
  }

  @media (max-width: 1200px) {
    div {
      width: 90vw;
      margin: 20px auto;
    }
  }
</style>

<div>
  <Line
    data={{ datasets, labels }}
    options={{ responsive: true, maintainAspecRatio: false, scales: { xAxes: [{ type: 'time', time: { unit: 'minute' } }] } }} />
</div>
