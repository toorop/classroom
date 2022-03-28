<script>
  import Sun from '../../../public/img/icons/sun.svg'
  import Moon from '../../../public/img/icons/moon.svg'

  let darkMode = true

  function toggle() {
    console.log('toggle')
    darkMode = !darkMode
    window.document.body.classList.toggle('dark')
  }
</script>

<nav>
  <span id="theme-switcher" on:click={toggle}>
    {#if darkMode}
      <Sun />
    {:else}
      <Moon />
    {/if}
  </span>
</nav>

<style lang="scss">
  @import '../styles/colors.scss';

  :global(.dark) {
    #theme-switcher {
      color: $color4;
    }
  }

  nav {
    display: flex;
    flex-direction: row-reverse;
    flex-grow: 1;
    margin: 0;
    padding: 1rem;
    z-index: 1;
  }

  #theme-switcher {
    cursor: pointer;
  }
</style>
