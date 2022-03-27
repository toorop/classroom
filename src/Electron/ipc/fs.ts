import * as fs from 'fs'

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
