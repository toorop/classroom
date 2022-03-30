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

  const setVaulPath = (evt: CustomEvent) => {
    const vaultPath = evt.detail
    window.localStorage.setItem('vaultPath', vaultPath)
    // set base path for next time
    const basePath = vaultPath.split('/').slice(0, -1).join('/')
    window.localStorage.setItem('vaultBasePath', basePath)
    initVault(vaultPath)
  }

  // init vault
  const initVault = async (vaultPath: string) => {
    const vault = new Vault(vaultPath)
    // get courses info
    const courses = await vault.loadCourses()
    console.log(courses)
    // update state
    VaultStore.set(vault.content)
    push('/courses')

    // get vault infos
    //const content = await vault.load()
    //push('/room')

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
