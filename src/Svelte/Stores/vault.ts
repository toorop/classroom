import { writable } from 'svelte/store'
import type { Vault } from '../../lib/Vault'

export const vaultStore = writable<Vault>({})
