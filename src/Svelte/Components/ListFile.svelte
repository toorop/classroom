<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import Icon from '@iconify/svelte'
  import TrackingStore from '../Stores/tracking'
  import type { IFile } from '../global'
  import type { ITracking } from '../Stores/tracking'

  let tracking: ITracking
  const unsubscribe = TrackingStore.subscribe((t) => {
    tracking = t
  })

  export let file: IFile

  onMount(() => {
    if (tracking.currentLesson === file.id) {
      const lesson = document.getElementById(`lesson-${tracking.currentLesson}`)

      const offset = lesson?.offsetTop || 0
      const wrapper = document.getElementsByClassName('course-wrapper')[0]
      wrapper.scrollTop = offset - 78
    }
  })

  // format time
  function formatTime(time: number): string {
    time = time / 1000
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  // update lesson
  const updateCurrentLesson = (id: string) => {
    TrackingStore.update((state) => ({
      ...state,
      currentLesson: id
    }))
  }

  // format lesson name
  function formatLessonName(name: string): string {
    // remove extension
    name = name
      .split('.')
      .slice(0, -1)
      .join('.')
      .replace(/_/g, ' ')
      .replace(/-/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
    return name
  }

  // unsub
  onDestroy(() => {
    unsubscribe()
  })
</script>

{#if file.type === 'video/mp4'}
  <div
    id={`lesson-${file.id}`}
    class="lesson {$TrackingStore.currentLesson === file.id ? 'active' : ''}"
    on:click={() => updateCurrentLesson(file.id)}
  >
    <h4>{formatLessonName(file.name)}</h4>
    <div class="lesson-detail">
      <div class="duration">
        <Icon icon="charm:clock" width="16" />
        {formatTime(file.duration)}
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  @import '../styles/colors.scss';

  h4 {
    margin-top: 0.7rem;
    margin-bottom: 0.4rem;
    text-transform: capitalize;
  }

  .lesson {
    padding: 0.1rem 0.8rem 0.8rem 2rem;
    border-bottom: 1px solid $color9;
    background-color: $color3;
    cursor: pointer;
  }

  .lesson-detail {
    display: flex;
    align-items: center;
    height: 1.5rem;

    button {
      cursor: pointer;
      display: flex;
      gap: 0.5rem;
      align-items: center;
      padding: 0.3rem;
      background-color: $color3;
      border: 1px solid $color6;
      color: $color5;
      font-size: 0.9rem;
    }
  }

  .lesson .duration {
    display: flex;
    align-items: center;
    gap: 0.2rem;
    margin-left: 0;
    font-size: 0.9rem;
  }

  .lesson.active {
    background: linear-gradient(90deg, $color10, $color8);
  }
</style>
