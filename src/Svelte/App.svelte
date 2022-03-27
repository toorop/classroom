<!-- main layout -->
<script lang="ts">
  import Router from 'svelte-spa-router'
  import routes from './routes'
  import { onMount } from 'svelte'
  import Navbar from './Components/Navbar.svelte'
</script>

<div id="app">
  <header>
    <Navbar />
  </header>
  <main>
    <Router {routes} />
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
    min-height: 100vh;
  }

  header {
    display: flex;
    flex-direction: row-reverse;
    z-index: 1;
    position: relative;
  }

  main {
    margin-left: 2rem;
    margin-right: 2rem;
  }
</style>
