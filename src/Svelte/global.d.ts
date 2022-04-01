/// <reference types="svelte" />

// represents a file in the vault
export interface IFile {
  id: string
  name: string
  path: string
  type: string
  duration?: number
}

// represents a chapter of a course
export interface IChapter {
  id: string
  name: string
  path: string
  files?: IFile[]
}

// represents a course
export interface ICourse {
  id?: string
  name: string
  chapters?: IChapter[]
  files?: IFile[]
}

// represents the vault (a library of courses)
export interface IVault {
  path?: string
  courses: ICourse[]
}

export interface IOpenDialogOptions {
  title?: string
  defaultPath?: string
  properties?: string[]
}

// IPC API
export interface API {
  // ui methods
  showOpenDialog: (evt: Event, props?: IOpenDialogOptions) => Promise<string>

  // fs methods
  fsStat: (path: string) => Promise<object>
  fsRead: (path: string) => Promise<Buffer>
  fsReadDir: (...path: string[]) => Promise<IFsStatsResult[]>
  fsWalk: (dir: string, depth?: number) => Promise<string>
  fsMime: (path: string) => Promise<string>
  fsVideoDuration: (path: string) => Promise<number>

  // vault methods
  getVault: () => Promise<IVault>
}

declare global {
  interface Window {
    API: API
  }
}
