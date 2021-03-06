// preload with contextIsolation enabled
import { contextBridge, ipcMain, ipcRenderer } from 'electron'

// exposed to renderer process via contextBridge
contextBridge.exposeInMainWorld('API', {
  // ui methods
  showOpenDialog: (evt: Event, props: object = {}) =>
    ipcRenderer.invoke('showOpenDialog', evt, props),

  // fs methods
  fsStat: (path: string) => ipcRenderer.invoke('fs-stat', path),
  fsRead: (path: string) => ipcRenderer.invoke('fs-read', path),
  fsReadDir: (...paths: string[]) => ipcRenderer.invoke('fs-readDir', ...paths),
  fsWalk: (dir: string, depth?: number) =>
    ipcRenderer.invoke('fs-walk', dir, depth),
  fsMime: (path: string) => ipcRenderer.invoke('fs-mime', path),
  fsVideoDuration: (path: string) =>
    ipcRenderer.invoke('fs-videoDuration', path),

  // vault methods
  getVault: () => ipcRenderer.invoke('getVault')
})
