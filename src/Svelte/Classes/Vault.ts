import * as fs from 'fs'

// represents a file in the vault
export interface IFile {
  name: string
  path: string
  type: string
}

export interface IChapter {
  name: string
  path: string
  files?: IFile[]
}

export interface ICourse {
  name: string
  path: string
  chapters?: IChapter[]
  rootFiles?: IFile[]
}

export interface IVault {
  path?: string
  courses?: ICourse[]
}

export class Vault implements IVault {
  path?: string
  courses?: ICourse[]

  // constructor
  constructor(path: string) {
    // path exists ?
    if (!fs.existsSync(path)) {
      throw new Error('Vault path does not exist')
    }
    this.path = path
  }
}
