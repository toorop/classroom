// preload with contextIsolation enabled
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('API', {
  getVault: () => ipcRenderer.invoke('getVault')
})
