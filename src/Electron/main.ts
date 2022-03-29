// Modules to control application life and create native browser window
import { app, BrowserWindow, dialog, ipcMain } from 'electron'
import * as path from 'path'
import * as serve from 'electron-serve'
import { getVault } from './ipc/vault'
import { fsGetMime, fsStat, fsRead, fsWalk } from './ipc/fs'
import { showOpenDialog } from './ipc/ui'

const loadURL = serve({ directory: 'public' })

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: BrowserWindow

function isDev() {
  return !app.isPackaged
}

if (isDev()) {
  // enable hot reloading
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, '..', 'node_modules', '.bin', 'electron')
  })
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'ClassRoom',
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
      // enableRemoteModule: true,
      contextIsolation: true
    },
    icon: path.join(__dirname, 'public/favicon.png'),
    show: false
  })

  // This block of code is intended for development purpose only.
  // Delete this entire block of code when you are ready to package the application.
  if (isDev()) {
    mainWindow.loadURL('http://localhost:8080/')
  } else {
    loadURL(mainWindow)
  }

  // Uncomment the following line of code when app is ready to be packaged.
  // loadURL(mainWindow);

  // Open the DevTools and also disable Electron Security Warning.
  // process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  // Emitted when the window is ready to be shown
  // This helps in showing the window gracefully.
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  // define IPC events & handlers
  defineIpc()
  // create main window
  createWindow()
  // Show devtools if not packaged
  if (isDev()) {
    mainWindow.webContents.openDevTools()
    // full screen
    mainWindow.maximize()
  }
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// IPC
const defineIpc = () => {
  // ui methods
  // show open file dialog
  ipcMain.handle('showOpenDialog', (evt, options: string[]) =>
    showOpenDialog(evt, options)
  )

  // fs methods
  // fs.stat
  ipcMain.handle('fs-stat', (_evt, path: string) => fsStat(path))
  // read file
  ipcMain.handle('fs-read', (_evt, path: string) => fsRead(path))
  // fs walk
  ipcMain.handle('fs-walk', (_evt, dir: string) => fsWalk(dir))
  // get mimetype
  ipcMain.handle('fs-mime', (_evt, path: string) => fsGetMime(path))

  // vault methods
  ipcMain.handle('getVault', getVault)
}