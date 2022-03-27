<!-- main layout -->
<script lang="ts">
  import { onMount } from 'svelte'
  import { Vault } from '../Classes/Vault'
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

  const setVaulPath = (evt: CustomEvent) => {
    showVaultPathSelector = false
    const vaultPath = evt.detail
    window.localStorage.setItem('vaultPath', vaultPath)
    initVault(vaultPath)
  }

  // init vault
  const initVault = async (vaultPath: string) => {
    const vault = new Vault(vaultPath)
    const content = await vault.load()

    // check vault path
    // must be empty or have a good structure

    // load vault

    // store vault path in local storage

    //window.localStorage.setItem('vaultPath', vaultPath)
    //showVaultPathSelector = false
  }
</script>

{#if showVaultPathSelector}
  <VaultPathSelector on:vault-path-selected={setVaulPath} />
{/if}
