// preload with contextIsolation enabled
import { contextBridge, ipcMain, ipcRenderer } from 'electron'

// exposed to renderer process via contextBridge
contextBridge.exposeInMainWorld('API', {
  // ui methods
  showOpenDialog: (evt: Event, props: string[] = []) =>
    ipcRenderer.invoke('showOpenDialog', evt, props),

  // fs methods
  fsStat: (path: string) => ipcRenderer.invoke('fs-stat', path),

  // vault methods
  getVault: () => ipcRenderer.invoke('getVault')
})
