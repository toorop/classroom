<!-- main layout -->
<script lang="ts">
  import { onMount } from 'svelte'
  import Navbar from './Components/Navbar.svelte'
  import type { IVault } from '../Classes/Vault'

  onMount(async () => {
    // populate vault
    console.log('populate vault')
    const vault: IVault = await window.API.getVault()
    console.log('vault', vault.path)
  })
</script>

<Navbar />

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

  // dark mode
  // .dark {
  // }
</style>
