import VaultStore from '../Stores/vault'
import { getPathSeparator } from '../Libs/utils'
import type { IVault, IChapter, ICourse, IFile } from '../global.d'
import type { IFsStatsResult } from '../../types/shared'

export class Vault {
  content?: IVault

  // constructor
  constructor() {
    //  subscribe from store for properties
    VaultStore.subscribe((vault) => {
      this.content = vault
    })
  }

  // set path
  public setPath(path: string) {
    VaultStore.update((state) => ({ ...state, path: path }))
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
    VaultStore.update((state) => ({ ...state, courses: courses }))
    return courses
  }

  // return course
  public async loadCourse(courseName: string, id: string): Promise<ICourse> {
    // already loaded ? => in strore
    let course = this.getCourseById(id)
    if (course && course.chapters) {
      return course
    }
    course = {
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
    // set in store
    // get old courses list
    const oldCourses = this.content.courses
    // filter to remove this course
    const newCourses = oldCourses.filter((course) => course.id !== id)
    // add new course
    newCourses.push(course)
    // order by name
    newCourses.sort((a, b) => {
      if (a.name < b.name) {
        return -1
      }
      if (a.name > b.name) {
        return 1
      }
      return 0
    })
    // update store
    VaultStore.update((state) => ({ ...state, courses: newCourses }))
    return course
  }

  // get course by id from memory
  public getCourseById(courseId: string): ICourse {
    console.log(this.content.courses)
    console.log('searching course:' + courseId)
    const course = this.content.courses.find((course) => course.id === courseId)
    console.log('found course:' + course.id)
    return course
  }

  // get chapter by id from memory
  public getChapterById(courseId: string, chapterId: string): IChapter {
    console.log('searching chapter:' + chapterId)
    const course = this.getCourseById(courseId)
    console.log(course)
    if (!course) return undefined
    return course.chapters.find((chapter) => chapter.id === chapterId)
  }

  // get file by id from memory
  public getFileById(
    courseId: string,
    chapterId: string,
    fileId: string
  ): IFile {
    console.log('searching file:' + fileId)
    const chapter = this.getChapterById(courseId, chapterId)
    if (!chapter) return undefined
    return chapter.files.find((file) => file.id === fileId)
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

  // return path of a video file
  // todo handle file not found
  public getVideoPath(
    courseId: string,
    chapterId: string,
    fileId: string
  ): string {
    console.log(
      'searching course:',
      courseId,
      'chapter:',
      chapterId,
      'file:',
      fileId
    )
    if (
      courseId.length === 0 ||
      chapterId.length === 0 ||
      fileId.length === 0
    ) {
      return ''
    }

    const file = this.getFileById(courseId, chapterId, fileId)
    return file.path
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
