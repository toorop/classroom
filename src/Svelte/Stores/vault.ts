import { writable } from 'svelte/store'
import type { IVault } from '../global'

const VaultStore = writable<IVault>({
  courses: []
})

export default VaultStore
