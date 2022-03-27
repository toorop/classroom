import * as fs from 'fs'
import { readFileSync } from 'original-fs'
import * as path from 'path'
const fsp = require('fs').promises
var mime = require('mime-types')

// fs.stat(path)
export const fsStat = (path: string) => {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) {
        reject(err)
      } else {
        resolve(stats)
      }
    })
  })
}

// get a list of files in a directory (recursivelly)
export const fsWalk = async (dir: string): Promise<string> => {
  return await walk(dir)
}

// get file content
export const fsRead = (path: string) => {
  return readFileSync(path)
}

// get file type
export const fsGetMime = (path: string) => {
  return mime.lookup(path)
}

// helpers

// walk a directory
async function walk(dir: string) {
  let files = await fsp.readdir(dir)
  files = await Promise.all(
    files.map(async (file: string) => {
      const filePath = path.join(dir, file)
      const stats = await fsp.stat(filePath)
      if (stats.isDirectory()) return walk(filePath)
      else if (stats.isFile()) return filePath
    })
  )

  return files.reduce(
    (all: string, folderContents: string) => all.concat(folderContents),
    []
  )
}
