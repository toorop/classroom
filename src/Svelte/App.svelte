<!-- main layout -->
<script lang="ts">
  import { onMount } from 'svelte'
  import Navbar from './Components/Navbar.svelte'
  import VaultPathSelector from './Components/VaultPathSelector.svelte'

  // debug
  const vaultPath = '/home/toorop/Téléchargements/classroom'

  onMount(async () => {
    // is vault path in object store?
    const vaultPath = window.localStorage.getItem('vaultPath')
    if (vaultPath) {
      // populate vault
      console.log('init vault')
      const stat = await window.API.fsStat(vaultPath)
      console.log('fsstats', stat)
    } else {
      // ask user to select a vault
      console.log('ask user to select a vault')
    }
  })
</script>

<div id="app">
  <header>
    <Navbar />
  </header>
  <main>
    <VaultPathSelector />
  </main>
</div>

<!-- Global CSS -->
<style lang="scss" global>
  @import './styles/colors.scss';

  // body
  body {
    color: $color0;
    background-color: $color4;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    &.dark {
      color: $color4;
      background-color: $color0;
    }
  }

  a {
    color: $color8;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  a:visited {
    color: $color8;
  }

  // main layout
  #app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  header {
    display: flex;
    flex-direction: row-reverse;
    z-index: 1;
    position: relative;
  }

  main {
    display: flex;
    flex: 1;
    margin-left: 2rem;
    margin-right: 2rem;
  }
</style>
