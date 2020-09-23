<script lang="ts">
  export let title: string
</script>

<style>
  button {
    background: #00fa9a;
    height: 30px;
    cursor: pointer;
    transition: ease-in-out background 0.5s;
  }

  button:hover {
    background: #03d383;
  }
</style>

<button on:click>{title}</button>
