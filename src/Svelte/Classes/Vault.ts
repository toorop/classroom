import type { IVault, IChapter, ICourse } from '../global.d'

export class Vault {
  content?: IVault

  // constructor
  constructor(path: string) {
    this.content = {
      path,
      courses: []
    }
  }

  // load courses but (only name)
  public async loadCourses(): Promise<ICourse[]> {
    // get courses folders
    const courses = await window.API.fsReadDir(this.content.path)
    this.content.courses = courses
    return courses
  }

  // load all data  in vault
  public async load(): Promise<IVault> {
    // get file in path
    const files = await window.API.fsWalk(this.content.path)
    //console.log(files)
    // get courses
    const startPos = this.content.path.split('/').length
    for (const file of files) {
      const fileType = await window.API.fsMime(file)
      const pathLength = file.split('/').length - startPos
      const courseName = file.split('/')[startPos]
      if (pathLength >= 1) {
        //console.log('pathLength > 1', pathLength)
        // course
        if (!this.courseExists(courseName)) {
          const course = {
            name: courseName,
            chapters: [],
            files: []
          }
          this.content.courses.push(course)
        }
      }
      // root file
      if (pathLength === 2) {
        //const chapters = this.getChapters(courseName)
        const f = {
          name: file.split('/')[startPos + 1],
          path: file,
          type: fileType
        }
        const course = this.getCourse(courseName)
        course.files.push(f)
      }
      // chapter
      if (pathLength > 2) {
        const chapterName = file.split('/')[startPos + 1]
        const course = this.getCourse(courseName)
        if (!this.chapterExists(courseName, chapterName)) {
          const chapter = {
            name: chapterName,
            files: []
          }
          course.chapters.push(chapter)
        }
        // add file to chapter
        if (pathLength === 3) {
          const f = {
            name: file.split('/')[startPos + 2],
            path: file,
            type: fileType
          }
          const chapter = this.getChapters(courseName).find(
            (chapter) => chapter.name === chapterName
          )
          chapter.files.push(f)
        }
      }
    }
    console.log(this.content)
    return this.content
    //
  }

  // return course by name
  public getCourse(courseName: string): ICourse {
    return this.content.courses.find((course) => course.name === courseName)
  }

  // return chapter by course Name
  public getChapters(courseName: string): IChapter[] {
    const course = this.getCourse(courseName)
    return course.chapters
  }

  //check if course exists
  private courseExists(courseName: string): boolean {
    for (const course of this.content.courses) {
      if (course.name === courseName) {
        return true
      }
    }
    return false
  }

  // check if chapter exists
  private chapterExists(courseName: string, chapterName: string): boolean {
    const chapters = this.getChapters(courseName)
    for (const chapter of chapters) {
      if (chapter.name === chapterName) {
        return true
      }
    }
    return false
  }
}
