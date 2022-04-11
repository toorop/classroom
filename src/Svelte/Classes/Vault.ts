import { get } from 'svelte/store'
import VaultStore from '../Stores/vault'
import TrackingStore from '../Stores/tracking'
import { getPathSeparator } from '../Libs/utils'
import type { IChapter, ICourse, IFile, IVault } from '../global'
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
    // already loaded ? => in store
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
    return this.content.courses.find((course) => course.id === courseId)
  }

  // get chapter by id from memory
  public getChapterById(courseId: string, chapterId: string): IChapter {
    const course = this.getCourseById(courseId)
    if (!course) return undefined
    return course.chapters.find((chapter) => chapter.id === chapterId)
  }

  // get file by id from memory
  public getFileById(
    courseId: string,
    chapterId: string,
    fileId: string
  ): IFile {
    if (courseId.length === 0 || fileId.length === 0) {
      return undefined
    }
    if (chapterId.length === 0) {
      const course = this.getCourseById(courseId)
      if (!course) return undefined
      return course.files.find((file) => file.id === fileId)
    } else {
      const chapter = this.getChapterById(courseId, chapterId)
      if (!chapter) return undefined
      return chapter.files.find((file) => file.id === fileId)
    }
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
    if (courseId.length === 0 || fileId.length === 0) {
      return ''
    }
    const file = this.getFileById(courseId, chapterId, fileId)
    return file.path
  }

  // update vault (and store) to next lesson
  public async nextLesson(): Promise<void> {
    const { currentCourse, currentChapter, currentLesson } = get(TrackingStore)

    // for chapters.filter
    const chapterIndexFinder = (chapter: IChapter) =>
      chapter.id === currentChapter
    // for lessons.filter
    const fileIndexFinder = (file: IFile) => file.id === currentLesson

    // get course
    const course = this.getCourseById(currentCourse)
    let nextFileId = currentLesson
    let nextChapterId = currentChapter

    // get current chapter index
    let currentChapterIndex = -1 // no chapters by default
    if (currentChapter !== '') {
      currentChapterIndex = course.chapters.findIndex(chapterIndexFinder)
    }

    // files of current chapter
    let files: IFile[] = []
    if (currentChapterIndex === -1) {
      files = course.files
    } else {
      files = course.chapters[currentChapterIndex].files
    }
    const currentLessonIndex = files.findIndex(fileIndexFinder)

    // next file exist and is a video ?
    let lessonIndex = currentLessonIndex
    while (true) {
      lessonIndex++
      if (lessonIndex < files.length) {
        const nextFile = files[lessonIndex]
        if (nextFile.type === 'video/mp4') {
          nextFileId = nextFile.id
          break
        }
      } else {
        // no more files, next chapter
        // no chapter or no more chapters ?
        if (
          currentChapterIndex === -1 ||
          currentChapterIndex >= course.chapters.length - 1
        ) {
          break
        }
        // next chapter
        currentChapterIndex++

        files = course.chapters[currentChapterIndex].files
        lessonIndex = -1
      }
    }
    // if new lesson is found update store
    if (nextFileId !== currentLesson) {
      nextChapterId =
        currentChapterIndex === -1
          ? ''
          : course.chapters[currentChapterIndex].id

      TrackingStore.update((state) => ({
        ...state,
        currentChapter: nextChapterId,
        currentLesson: nextFileId
      }))
    }
  }

  // keep tracker synced with local storage
  public syncTracker2LocalStorage(): void {
    const { currentCourse, currentChapter, currentLesson } = get(TrackingStore)
    if (currentCourse !== '') {
      window.localStorage.setItem('currentCourse', currentCourse)
    }
    if (currentChapter !== '') {
      window.localStorage.setItem('currentChapter', currentChapter)
    }
    if (currentLesson !== '') {
      window.localStorage.setItem('currentLesson', currentLesson)
    }
  }

  // load tracker from local storage
  public loadTrackerFromLocalStorage(): void {
    const currentCourse = window.localStorage.getItem('currentCourse')
    const currentChapter = window.localStorage.getItem('currentChapter')
    const currentLesson = window.localStorage.getItem('currentLesson')
    if (currentCourse !== null) {
      TrackingStore.update((state) => ({
        ...state,
        currentCourse
      }))
    }
    if (currentChapter !== null) {
      TrackingStore.update((state) => ({
        ...state,
        currentChapter
      }))
    }
    if (currentLesson !== null) {
      TrackingStore.update((state) => ({
        ...state,
        currentLesson
      }))
    }
  }
}
