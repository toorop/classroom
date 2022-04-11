import { writable } from 'svelte/store'

export interface ITracking {
  currentCourse: string
  currentChapter: string
  currentLesson: string
}

const TrackingStore = writable<ITracking>({
  currentCourse: '',
  currentChapter: '',
  currentLesson: ''
})

export default TrackingStore
