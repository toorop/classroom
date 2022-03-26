export interface API {
  getVault: () => Promise<void>
}

declare global {
  interface Window {
    API: API
  }
}
