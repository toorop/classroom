/// <reference types="svelte" />
import type { IVault } from './Classes/Vault'

export interface API {
  // ui methods
  showOpenDialog: (evt: Event, props?: string[]) => Promise<string>

  // fs methods
  fsStat: (path: string) => Promise<object>
  fsRead: (path: string) => Promise<Buffer>
  fsWalk: (dir: string) => Promise<string>
  fsMime: (path: string) => Promise<string>

  // vault methods
  getVault: () => Promise<IVault>
}

declare global {
  interface Window {
    API: API
  }
}
