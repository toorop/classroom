<script>
  import { createEventDispatcher } from 'svelte'

  // create event dispatcher
  const dispatch = createEventDispatcher()

  // handle click button event
  const handleClick = async () => {
    // base path ?
    const basePath = window.localStorage.getItem('vaultBasePath')
    let openDialogOptions = {
      title: 'Select a Libary',
      defaultPath: basePath || '',
      properties: ['openDirectory']
    }

    const path = await window.API.showOpenDialog(openDialogOptions)
    if (path) {
      dispatch('vault-path-selected', path)
    }
  }
</script>

<div id="vaultpathselector">
  <button on:click={handleClick}>Select Library</button>
</div>

<style lang="scss">
  @import '../styles/colors.scss';

  #vaultpathselector {
    margin-top: 6rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #vaultpathselector button {
    cursor: pointer;
    width: 50%;
    font-size: 0.9rem;
    border: 1px solid $color3;
    padding: 1rem;
    background-color: $color4;
    text-transform: uppercase;
  }

  #vaultpathselector button:hover {
    background-color: $color0;
    color: $color4;
  }

  :global(.dark) #vaultpathselector {
    button {
      background-color: $color0;
      color: $color4;
    }
    button:hover {
      background-color: $color4;
      color: $color0;
    }
  }
</style>
