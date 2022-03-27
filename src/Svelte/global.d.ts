/// <reference types="svelte" />
import type { IVault } from './Classes/Vault'

export interface API {
  // ui methods
  showOpenDialog: (evt: Event, props?: string[]) => Promise<string>

  // fs methods
  fsStat: (path: string) => Promise<object>

  // vault methods
  getVault: () => Promise<IVault>
}

declare global {
  interface Window {
    API: API
  }
}
