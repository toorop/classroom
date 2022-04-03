<script lang="ts">
  import { onMount } from 'svelte'
  import { TrackingStore } from '../Stores/tracking'
  import VideoPlayer from '../Components/VideoPlayer.svelte'
  import type { ICourse } from '../global'
  import ListChapter from '../Components/ListChapter.svelte'
  import ListFile from '../Components/ListFile.svelte'
  import { Vault } from '../Classes/Vault'

  export let params: {
    name: string
    id: string
  }

  let selectedChapter: string
  let selectedCourse: string

  let course: ICourse = {
    id: params.id,
    name: params.name,
    chapters: []
  }

  // reset tracking
  TrackingStore.update(() => ({
    currentCourse: '',
    currentChapter: '',
    currentLesson: ''
  }))

  onMount(async () => {
    const vault = new Vault()

    // get course
    course = await vault.loadCourse(params.name, params.id)

    // update  tracking store
    TrackingStore.update((state) => ({
      currentCourse: course.id,
      currentChapter: course.chapters[0]?.id || '',
      currentLesson: course.chapters[0]?.files[0].id || course.files[0].id
    }))
  })

  // format time
  function formatTime(time: number): string {
    time = time / 1000
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }
</script>

<h1>{params.name}</h1>
<div id="video-and-summary">
  <div id="video-player">
    <VideoPlayer />
  </div>
  <!--playlist-->
  <div id="playlist">
    <h2>Course content</h2>
    <div class="course-wrapper scrollable">
      <div class="chapters-content">
        {#if course.chapters?.length !== 0}
          {#each course.chapters as chapter (chapter.id)}
            <ListChapter {chapter} />
          {/each}
        {:else if course.files !== undefined}
          {#each course.files as file (file.id)}
            <ListFile {file} />
          {/each}
        {/if}
      </div>
    </div>
  </div>
</div>
<div id="html-content">
</div>

<style lang="scss">
  @import '../styles/colors.scss';

  h1 {
    margin: 0.2rem 0 1.5rem;
    padding-left: 1.5rem;
    color: $color5;
    font-weight: normal;
    font-size: 1.7rem;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: bold;
    padding-left: 1.5rem;
    text-transform: capitalize;
  }

  #video-and-summary {
    @media (min-width: 1200px) {
      display: flex;
      flex-wrap: wrap;
    }
  }

  #video-player {
    flex-shrink: 1;
    flex-grow: 1;
    flex-basis: 70%;
    background-color: rgb(0, 0, 0);
    //min-width: 60ch;
  }

  #playlist {
    flex: 1 1 30%;
    flex-direction: column;
    background-color: $color1;
    display: flex;
  }

  .course-wrapper {
    max-height: 300px;
    overflow: auto;

    @media (min-width: 1200px) {
      max-height: unset;
      flex: 1 0 auto;
      position: relative;
      overflow: auto;
    }
  }

  .chapters-content {
    @media (min-width: 1200px) {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }

  .scrollable {
    overflow-y: auto;
    // max-height: 550px;
  }

  #html-content {
    padding: 1rem;
    min-height: 200px;
  }

  // #html-content {
  //   flex: 1 1 70%;
  //   padding: 1rem;
  //   background-color: $color4;
  //   color: $color1;

  //   img {
  //     max-width: 100%;
  //   }
  // }

  // #files-content {
  //   flex: 1 1 30%;
  //   background-color: $color3;
  //   //min-width: 50ch;
  // }
</style>
