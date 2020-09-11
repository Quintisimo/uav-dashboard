<script lang="ts">
  import Button from './Button.svelte'
</script>

<style>
  div {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px 10px;
  }
</style>

<div>
  <Button title="TEMPERATURE" />
  <Button title="PRESSURE" />
  <Button title="HUMIDITY" />
  <Button title="LIGHT" />
  <span />
  <Button title="NOISE" />
  <Button title="GAS" />
</div>
