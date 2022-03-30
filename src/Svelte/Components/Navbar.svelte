<script>
  import { push } from 'svelte-spa-router'
  import Folder from '../../../public/img/icons/folder.svg'
  import Book from '../../../public/img/icons/book.svg'
  import BookOpen from '../../../public/img/icons/book-open.svg'

  const handleClickNewLibrary = () => {
    window.localStorage.removeItem('vaultPath')
    push('/')
  }
</script>

<nav>
  <span class="icon" on:click={handleClickNewLibrary}>
    <Folder width="18" height="18" />
    <span class="tooltip">Open new library</span>
  </span>
  <span class="icon" on:click={() => push('/courses')}>
    <Book width="18" height="18" viewBox="0 0 24 24" />
    <span class="tooltip">Courses</span>
  </span>
  <span class="icon">
    <BookOpen width="18" height="18" viewBox="0 0 24 24" />
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
