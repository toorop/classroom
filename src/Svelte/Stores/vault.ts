import { writable } from 'svelte/store'
import type { Vault } from '../Classes/Vault'

export const vaultStore = writable<Vault>({})
