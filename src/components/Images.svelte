<script lang="ts">
  export let images: string[] = []

  let active: string | null = images.length ? images[0] : null

  function scroll(direction: 'left' | 'right') {
    const images = document.querySelector('#images')
    images.scrollBy({
      left: direction === 'left' ? 400 : -400,
      behavior: 'smooth',
    })
  }

  function observer(node: HTMLDivElement) {
    const observer = new IntersectionObserver(
      (entries, self) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            img.src = img.dataset.src
            self.unobserve(entry.target)
          }
        })
      },
      {
        root: node,
      }
    )

    Array.from(node.children).forEach((e) => {
      observer.observe(e)
    })

    const addObserver = (e: Event) => {
      observer.observe(e.target as Element)
    }

    node.addEventListener('DOMNodeInserted', addObserver)

    return {
      destroy() {
        observer.disconnect()
        node.removeEventListener('DOMNodeInserted', addObserver)
      },
    }
  }
</script>

<style>
  #wrapper {
    display: grid;
    grid-template-rows: 1fr 80px;
    gap: 5px;
    margin: 10px 0;
  }

  #active {
    display: block;
    margin: auto;
    width: 55%;
  }

  #images-row {
    height: 80px;
    display: grid;
    grid-template-columns: 50px 1fr 50px;
  }

  #images {
    height: inherit;
    display: grid;
    grid-auto-flow: column;
    gap: 10px;
    overflow: scroll;
    scrollbar-width: none;
  }

  #images > img {
    cursor: pointer;
    height: inherit;
    box-sizing: border-box;
  }

  #images::-webkit-scrollbar {
    display: none;
  }

  .arrow {
    display: block;
    margin: auto;
    background: none;
    border: none;
    outline: none;
    padding: 0;
    cursor: pointer;
  }

  #left {
    border-top: 30px solid transparent;
    border-bottom: 30px solid transparent;
    border-right: 30px solid black;
  }

  #right {
    border-top: 30px solid transparent;
    border-bottom: 30px solid transparent;
    border-left: 30px solid black;
  }

  .highlight {
    border: 1px solid red;
  }
</style>

<div id="wrapper">
  <img src={active} alt="selected" id="active" />
  <div id="images-row">
    <button class="arrow" id="left" on:click={() => scroll('right')} />
    <div id="images" use:observer>
      {#each images as image}
        <img
          class:highlight={active === image}
          data-src={image}
          alt={image.substring(1, image.lastIndexOf('.'))}
          on:click={() => {
            active = image
          }} />
      {/each}
    </div>
    <button id="right" class="arrow" on:click={() => scroll('left')} />
  </div>
</div>
