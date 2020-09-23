<script lang="ts">
  import Button from './Button.svelte'
  import { active } from './store'
</script>

<style>
  div {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px 10px;
  }
</style>

<div>
  <Button title="TEMPERATURE" on:click={() => active.set('TEMPERATURE')} />
  <Button title="PRESSURE" on:click={() => active.set('PRESSURE')} />
  <Button title="HUMIDITY" on:click={() => active.set('HUMIDITY')} />
  <Button title="LIGHT" on:click={() => active.set('LIGHT')} />
  <span />
  <Button title="NOISE" on:click={() => active.set('NOISE')} />
  <Button title="GAS" on:click={() => active.set('GAS')} />
</div>
