import type { IVault } from '../Classes/Vault'

export interface API {
  getVault: () => Promise<IVault>
}

declare global {
  interface Window {
    API: API
  }
}
