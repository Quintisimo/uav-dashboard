<script>
  import { fade } from 'svelte/transition'
  let menu = false
</script>

<style>
  button {
    cursor: pointer;
    position: fixed;
    bottom: 30px;
    right: 30px;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background: rgb(145, 220, 245);
    box-shadow: 2px 2px 3px #999;
    z-index: 2;
  }

  img {
    display: block;
    margin: auto;
    height: 20px;
    width: 20px;
  }

  div {
    position: fixed;
    bottom: 55px;
    right: 30px;
    width: 50px;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    background: rgb(145, 220, 245);
    box-shadow: 2px 2px 3px #999;
  }

  a > img {
    height: 40px;
    width: 40px;
    padding: 5px 0;
  }

  a:last-child > img {
    padding-bottom: 25px;
  }
</style>

<button on:click={() => (menu = !menu)}>
  <img src="/download.png" alt="download" />
</button>

{#if menu}
  <div transition:fade>
    <a href="/api/db" title="Download DB Data">
      <img src="/db.png" alt="db" />
    </a>
    <a href="/api/images" title="Download All Images">
      <img src="/images.png" alt="images" />
    </a>
  </div>
{/if}
