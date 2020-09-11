<script lang="ts">
  import ButtonWrapper from './Components/ButtonWrapper.svelte'
  import Readings from './Components/Readings.svelte'

  let fakeTarget = [
    {
      TYPE: 'A',
      TEMPERATURE: '20 C',
      HUMIDITY: '20%',
      LIGHT: '1000 Lux',
      NOISE: '100 Dec',
      PRESSURE: '900 hPa',
    },
    {
      TYPE: 'B',
      TEMPERATURE: '20 C',
      HUMIDITY: '20 %',
      LIGHT: '1000 Lux',
      NOISE: '100 Dec',
      PRESSURE: '900 hPa',
    },
  ]

  let fakeGas = [
    {
      'CARBON MONOXIDE': '100 PPM',
      'NITROGEN DIOXIDE': '5 PPM',
      ETHINOL: '200 PPM',
      HYDROGEN: '500 PPM',
    },
    {
      PROPANE: '100 PPM',
      'ISO,-BUTANE': '50 PPM',
      AMMONIA: '200 PPM',
      METHANE: '300 PPM',
    },
  ]

  let fakeCurrent = [
    {
      TEMPERATURE: '20 C',
      HUMIDITY: '20 %',
      LIGHT: '100 Lux',
      NOISE: '100 Dec',
      PRESSURE: '900 hPa',
    },
  ]

  let fakeLocation = [
    {
      X: 1.3,
      Y: 4.5,
      Z: 3.2,
    },
  ]
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

  .temp {
    border: 2px red dotted;
    background-color: aqua;
  }
</style>

<main>
  <div class="cols">
    <div class="temp">Image</div>
    <div class="rows">
      <ButtonWrapper />
      <div class="temp">Graphs</div>
    </div>
  </div>
  <div class="readings">
    <Readings title="GAS LEVELS" readings={fakeGas} />
    <Readings title="AVERAGE TARGET READINGS" readings={fakeTarget} />
    <Readings title="CURRENT READINGS" readings={fakeCurrent} />
    <Readings title="UAV LOCATION (M)" readings={fakeLocation} />
  </div>
</main>
