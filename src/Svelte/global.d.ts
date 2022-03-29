/// <reference types="svelte" />
import type { IVault } from './Classes/Vault'

interface IOpenDialogOptions {
  title?: string
  defaultPath?: string
  properties?: string[]
}

export interface API {
  // ui methods
  showOpenDialog: (evt: Event, props?: IOpenDialogOptions) => Promise<string>

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
