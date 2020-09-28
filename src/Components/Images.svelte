<script lang="ts">
  import type { Image } from '../typings/data'
  export let images: Image[] = []
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
    {#each images as image}<img src={image.image} alt="target" />{/each}
  </div>
</div>
