<script lang="ts">
  export let title: string
  export let readings: { [key: string]: string | number }[] = []
  export let ignore: string[] = []
  export let active: { [key: string]: string | number } | null = null

  function highlight(reading: { [key: string]: string | number }) {
    return (
      active !== null &&
      Object.entries(active).every(([key, value]) => value === reading[key])
    )
  }
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

  .active {
    color: lightgreen;
  }
</style>

<div class="wrapper">
  <span>{title}</span>
  <div class="content">
    {#each readings as reading}
      <div class:active={highlight(reading)}>
        {#each Object.entries(reading) as [title, value]}
          {#if !ignore.includes(title)}
            <p>{title} - {value}</p>
          {/if}
        {/each}
      </div>
    {/each}
  </div>
</div>
