<script lang="ts">
  export let title: string
  export let readings: { [key: string]: number | string }[] = []
  export let ignore: string[] = []
  export let units: { [key: string]: string } = {}
</script>

<style>
  .wrapper {
    position: relative;
    border: 1px solid black;
    padding: 5px 10px;
    min-width: 100px;
    width: min-content;
    height: min-content;
  }

  span {
    position: absolute;
    top: -1ch;
    left: 1ch;
    font-size: 10px;
    white-space: nowrap;
    background: white;
  }

  .content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }

  p {
    font-size: 13px;
    white-space: nowrap;
  }
</style>

<div class="wrapper">
  <span>{title}</span>
  <div class="content">
    {#each readings as reading}
      <div>
        {#each Object.entries(reading) as [title, value]}
          {#if !ignore.includes(title)}
            <p>{title} - {value} {units[title] ?? ''}</p>
          {/if}
        {/each}
      </div>
    {/each}
  </div>
</div>
