<!-- main layout -->
<script lang="ts">
  import Router from 'svelte-spa-router'
  import routes from './routes'
  import Navbar from './Components/Navbar.svelte'

  console.log('launching app')
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

  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: $color3;
    border-radius: 1px;
  }
  ::-webkit-scrollbar-track {
    background-color: $color1;
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
</style>
