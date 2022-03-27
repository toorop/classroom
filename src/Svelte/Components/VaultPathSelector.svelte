<script>
  const handleClick = async () => {
    const path = await window.API.showOpenDialog(['openDirectory'])
    if (path) {
      window.localStorage.setItem('vaultPath', path)
      // TODO route push
      window.location.reload()
    }
  }
</script>

<div id="vaultpathselector">
  <button on:click={handleClick}>Select vault</button>
</div>

<style lang="scss">
  @import '../styles/colors.scss';

  #vaultpathselector {
    margin-top: -6rem;
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  #vaultpathselector button {
    cursor: pointer;
    width: 50%;
    font-size: 1.1rem;
    border: 0.5px solid $color3;
    padding: 1rem;
    background-color: $color7;
  }
</style>
