import { getPathSeparator } from '../Libs/utils'

import type { IVault, IChapter, ICourse, IFile } from '../global.d'
import type { IFsStatsResult } from '../../types/shared'

export class Vault {
  content?: IVault

  // constructor
  constructor() {
    this.content = {
      path: '',
      courses: []
    }
  }

  // load courses but (only name)
  public async loadCourses(): Promise<ICourse[]> {
    let courses: ICourse[] = []
    // get courses folders
    const coursesFiles = await window.API.fsReadDir(this.content.path)
    for (const courseFile of coursesFiles) {
      const course: ICourse = {
        id: `${courseFile.dev}-${courseFile.ino}`,
        name: courseFile.name
      }
      courses.push(course)
    }
    this.content.courses = courses
    return courses
  }

  // return course
  public async getCourse(courseName: string, id: string): Promise<ICourse> {
    let course: ICourse = {
      id,
      name: courseName,
      chapters: [],
      files: []
    }
    //console.log(courseName)
    const pathSeparator = getPathSeparator()
    // get chapters or (video and files) if no chapters
    const firstFloor = await window.API.fsReadDir(this.content.path, courseName)
    // as chapter ?
    for (const entity of firstFloor) {
      if (entity.isFile) {
        // get mime type
        const file = await this.getIfileWithMimeAndInfo(
          entity,
          [this.content.path, courseName, entity.name].join(getPathSeparator())
        )
        course.files.push(file)
      } else {
        // directory => chapter
        const chapter: IChapter = {
          id: `${entity.dev}-${entity.ino}`,
          name: entity.name,
          path: [this.content.path, courseName, entity.name].join(
            pathSeparator
          ),
          files: []
        }

        // get all files for this chapter
        const files = await window.API.fsReadDir(
          this.content.path,
          courseName,
          entity.name
        )
        // populate chapter files
        for (const entity2 of files) {
          if (entity2.isFile) {
            const file = await this.getIfileWithMimeAndInfo(
              entity2,
              [this.content.path, courseName, entity.name, entity2.name].join(
                pathSeparator
              )
            )
            chapter.files.push(file)
          }
        }
        course.chapters.push(chapter)
      }
    }
    return course
  }

  // return  files
  public async getIfileWithMimeAndInfo(
    fsStat: IFsStatsResult,
    path: string
  ): Promise<IFile> {
    const mimeType = await window.API.fsMime(path)
    const file: IFile = {
      id: `${fsStat.dev}-${fsStat.ino}`,
      name: fsStat.name,
      path,
      type: mimeType
    }
    // if video get duration
    if (mimeType === 'video/mp4') {
      file.duration = await window.API.fsVideoDuration(path)
    }
    return file
  }
}

// load all data  in vault
// public async load(): Promise<IVault> {
//   // get file in path
//   const files = await window.API.fsWalk(this.content.path)
//   //console.log(files)
//   // get courses
//   const startPos = this.content.path.split('/').length
//   for (const file of files) {
//     const fileType = await window.API.fsMime(file)
//     const pathLength = file.split('/').length - startPos
//     const courseName = file.split('/')[startPos]
//     if (pathLength >= 1) {
//       //console.log('pathLength > 1', pathLength)
//       // course
//       if (!this.courseExists(courseName)) {
//         const course = {
//           name: courseName,
//           chapters: [],
//           files: []
//         }
//         this.content.courses.push(course)
//       }
//     }
//     // root file
//     if (pathLength === 2) {
//       //const chapters = this.getChapters(courseName)
//       const f = {
//         name: file.split('/')[startPos + 1],
//         path: file,
//         type: fileType
//       }
//       const course = this.getCourse(courseName)
//       course.files.push(f)
//     }
//     // chapter
//     if (pathLength > 2) {
//       const chapterName = file.split('/')[startPos + 1]
//       const course = this.getCourse(courseName)
//       if (!this.chapterExists(courseName, chapterName)) {
//         const chapter = {
//           name: chapterName,
//           files: []
//         }
//         course.chapters.push(chapter)
//       }
//       // add file to chapter
//       if (pathLength === 3) {
//         const f = {
//           name: file.split('/')[startPos + 2],
//           path: file,
//           type: fileType
//         }
//         const chapter = this.getChapters(courseName).find(
//           (chapter) => chapter.name === chapterName
//         )
//         chapter.files.push(f)
//       }
//     }
//   }
//   console.log(this.content)
//   return this.content
//   //
// }

// // return course by name
// public getCourse(courseName: string): ICourse {
//   return this.content.courses.find((course) => course.name === courseName)
// }

// // return chapter by course Name
// public getChapters(courseName: string): IChapter[] {
//   const course = this.getCourse(courseName)
//   return course.chapters
// }

// //check if course exists
// private courseExists(courseName: string): boolean {
//   for (const course of this.content.courses) {
//     if (course.name === courseName) {
//       return true
//     }
//   }
//   return false
// }

// // check if chapter exists
// private chapterExists(courseName: string, chapterName: string): boolean {
//   const chapters = this.getChapters(courseName)
//   for (const chapter of chapters) {
//     if (chapter.name === chapterName) {
//       return true
//     }
//   }
//   return false
// }
