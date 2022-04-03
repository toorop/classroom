import { writable } from 'svelte/store'

export interface ITracking {
  currentCourse: string
  currentChapter: string
  currentLesson: string
}

export const TrackingStore = writable<ITracking>({
  currentCourse: '',
  currentChapter: '',
  currentLesson: ''
})
