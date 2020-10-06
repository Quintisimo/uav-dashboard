<script lang="ts">
  export let images: string[] = []
</script>

<style>
  .wrapper {
    background: red;
  }

  .images {
    height: 80px;
  }

  img {
    height: inherit;
    padding-right: 10px;
  }
</style>

<div class="wrapper">
  <div class="images">
    {#each images as image}<img src={'/' + image} alt="target" />{/each}
  </div>
</div>
