import * as fs from 'fs'
import * as path from 'path'
const fsp = require('fs').promises
var mime = require('mime-types')
import { VideoDuration } from 'video-duration'
import type { IFsStatsResult } from '../../types/shared'

// fs.stat(path)
export const fsStat = (path: string) => {
  return new Promise((resolve, reject) => {
    fs.stat(path, { bigint: true }, (err, stats) => {
      if (err) {
        reject(err)
      } else {
        resolve(stats)
      }
    })
  })
}

// get a list of files in a directory (recursivelly)
export const fsWalk = async (
  dir: string,
  depth: number = 0
): Promise<string> => {
  return await walk(dir)
}

// get file content
export const fsRead = (path: string) => {
  return fs.readFileSync(path)
}

// read a direcectory and return a list of files
export const fsReadDir = (...paths: string[]): IFsStatsResult[] => {
  console.log(paths)
  const dirPath = path.join(...paths)
  console.log(`fsReadDir: ${dirPath}`)
  let result: IFsStatsResult[] = []
  const files = fs.readdirSync(dirPath)
  for (const f in files) {
    const stats = fs.statSync(path.join(dirPath, files[f]))
    result.push({
      name: files[f],
      dev: stats.dev,
      isFile: stats.isFile(),
      ino: stats.ino
    })
  }
  return result
}

// get file type
export const fsGetMime = (path: string) => {
  return mime.lookup(path)
}

// get video duration
export const fsGetVideoDuration = (path: string) => {
  const vd = new VideoDuration(path)
  return vd.getDuration()
}

// helpers

// walk a directory
async function walk(dir: string, depth = 1) {
  let files = await fsp.readdir(dir)
  files = await Promise.all(
    files.map(async (file: string) => {
      //console.log(file)
      const currentDepth = file.split('/').length
      //console.log(`depth: ${depth} -  currentDepth: ${currentDepth}`)
      const filePath = path.join(dir, file)
      const stats = await fsp.stat(filePath)
      if (depth !== 0 && currentDepth < depth && stats.isDirectory())
        return walk(filePath)
      else return filePath
    })
  )
  return files.reduce(
    (all: string, folderContents: string) => all.concat(folderContents),
    []
  )
}
