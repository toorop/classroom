import { writable } from 'svelte/store'
import type { IVault } from '../Classes/Vault'

export const vaultStore = writable<IVault>({
  courses: []
})
