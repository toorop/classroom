<script>
  import { push } from 'svelte-spa-router'
  import Icon from '@iconify/svelte'

  const handleClickNewLibrary = () => {
    window.localStorage.removeItem('vaultPath')
    push('/')
  }
</script>

<nav>
  <span class="icon" on:click={handleClickNewLibrary}>
    <Icon icon="ant-design:folder-filled" width="16" />
    <span class="tooltip">Open new library</span>
  </span>
  <span class="icon" on:click={() => push('/courses')}>
    <Icon icon="fluent:library-28-filled" width="16" />
    <span class="tooltip">Courses</span>
  </span>
  <span class="icon">
    <Icon icon="ic:baseline-play-lesson" width="16" />
    <span class="tooltip">Continue Last Lesson</span>
  </span>
</nav>

<style lang="scss">
  @import '../styles/colors.scss';

  nav {
    display: flex;
    flex-grow: 1;
    align-content: flex-end;
    gap: 1rem;
    padding: 0.3rem;
    padding-top: 0.6rem;
    padding-left: 1rem;
    margin-bottom: 1.2rem;
    background-color: $color1;
    border-bottom: 1px solid $color2;
    border-top: 1px solid $color2;
  }

  nav > * {
    cursor: pointer;
  }

  .icon {
    color: $color5;
  }

  .icon:hover .tooltip {
    display: block;
  }

  .tooltip {
    position: absolute;
    z-index: 1000;
    display: none;
    padding: 0.5rem;
    font-size: 0.9rem;
    border-radius: 4px;
    background-color: $color1;
  }
</style>
