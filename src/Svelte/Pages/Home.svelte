<!-- main layout -->
<script lang="ts">
  import { onMount } from 'svelte'
  import { push } from 'svelte-spa-router'
  import { Vault } from '../Classes/Vault'
  import VaultStore from '../Stores/vault'
  import VaultPathSelector from '../Components/VaultPathSelector.svelte'

  let showVaultPathSelector = false

  // on mount
  onMount(async () => {
    // is vault path in object store?
    const vaultPath = window.localStorage.getItem('vaultPath')
    if (vaultPath) {
      await initVault(vaultPath)
    } else {
      // ask user to select a vault
      showVaultPathSelector = true
    }
  })

  // set vault path
  const setVaultPath = (evt: CustomEvent) => {
    const vaultPath = evt.detail
    window.localStorage.setItem('vaultPath', vaultPath)
    // set base path in local storageS
    const basePath = vaultPath.split('/').slice(0, -1).join('/')
    window.localStorage.setItem('vaultBasePath', basePath)
    initVault(vaultPath)
  }

  // init vault
  const initVault = async (vaultPath: string) => {
    const vault = new Vault()
    vault.setPath(vaultPath)
    // load courses
    await vault.loadCourses()
    // update state
    await push('/courses')
  }
</script>

{#if showVaultPathSelector}
  <VaultPathSelector on:vault-path-selected={setVaultPath} />
{/if}
