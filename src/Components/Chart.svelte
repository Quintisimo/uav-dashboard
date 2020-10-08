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
      return Object.keys(allData.gas[0]).map((gas) => ({
        label: gas,
        data: allData.gas.map((e) => e[gas]),
        borderColor: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
          Math.random() * 255
        )}, ${Math.floor(Math.random() * 255)})`,
        fill: false,
      }))
    }
  })()
</script>

<style>
  div {
    width: 48vw;
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
    data={{ datasets }}
    options={{ responsive: true, maintainAspecRatio: false }} />
</div>
