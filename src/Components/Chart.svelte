<script lang="ts">
  import Line from 'svelte-chartjs/src/Line.svelte'
  import { active } from './store'
  import type { Data } from '../typings'
  export let allData: Data

  $: datasets = (() => {
    if ($active !== 'GAS') {
      return [
        {
          data: allData.readings.map((item) => item[$active]),
          label: $active,
          borderColor: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
            Math.random() * 255
          )}, ${Math.floor(Math.random() * 255)})`,
          fill: false,
        },
      ]
    } else {
      if (allData.gas.length) {
        return Object.keys(allData.gas[0]).map((gas) => ({
          label: gas,
          data: allData.gas.map((e) => e[gas]),
          borderColor: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
            Math.random() * 255
          )}, ${Math.floor(Math.random() * 255)})`,
          fill: false,
        }))
      }
      return []
    }
  })()

  $: labels = (() => {
    if ($active !== 'GAS') {
      return allData.readings.map((item) => new Date(item.time))
    } else {
      return allData.gas.map((item) => new Date(item.time))
    }
  })()
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
