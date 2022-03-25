<script>
  import Sun from '../../public/img/icons/sun.svg'
  import Moon from '../../public/img/icons/moon.svg'

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

<style>
  nav {
    display: flex;
    flex-direction: row-reverse;
    margin: 0;
    padding: 1rem;
    z-index: 1;
  }

  #theme-switcher {
    cursor: pointer;
  }

  :global(body.dark #theme-switcher) {
    color: var(nord-4);
  }
</style>
