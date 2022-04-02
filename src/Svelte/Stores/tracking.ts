import { writable } from 'svelte/store'

export interface ITracking {
  currentCourse: string
  currentChapter: string
  currentLesson: string
  currentPlayerTime: number
}

export const TrackingStore = writable<ITracking>({
  currentCourse: '',
  currentChapter: '',
  currentLesson: '',
  currentPlayerTime: 0
})
