<script lang="ts">
  import VaultStore from '../Stores/vault'
  import type { IVault } from '../global.d'
  import App from '../App.svelte'

  let vault: IVault
  const courses = VaultStore.subscribe((v) => {
    vault = v
    console.log(vault)
  })
</script>

<p>totto</p>
