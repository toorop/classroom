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
  <p><strong>Finished Code</strong></p>
  <p>
    Finished code is attached to each applicable lecture throughout the course.
    If you get stuck at any point you can download the code and compare it
    against yours with a diff tool like <a
      href="https://www.diffchecker.com/"
      rel="noopener noreferrer"
      target="_blank">Diffchecker</a
    > or VSCode's built-in comparison tool.
  </p>
  <p><strong>Diagrams</strong></p>
  <p>
    The diagrams shown in the course are attached to this lecture note as a zip
    file.
  </p>
  <ul>
    <li><p>Download the file and extract it somewhere on your computer.</p></li>
    <li>
      <p>
        Visit <a
          href="https://www.diagrams.net/"
          rel="noopener noreferrer"
          target="_blank">diagrams.net (formerly draw.io)</a
        >.
      </p>
    </li>
    <li>
      <p>
        Select <strong>Open Existing Diagram </strong>and use the file explorer
        to select the diagram file from your computer.
      </p>
      <p>or</p>
    </li>
    <li><p>Click on <strong>File</strong> from the diagrams.net menu.</p></li>
    <li>
      <p>
        Select <strong>Open From Device</strong> and use the file explorer to select
        the diagram file from your computer.
      </p>
    </li>
  </ul>
  <p>
    <em
      >Note - Please understand, if a diagram or group of diagrams is missing,
      this means that we no longer have them to share. You'll need to use a good
      screenshot browser extension to make a copy from the video lecture.</em
    >
  </p>
</div>

<style lang="scss">
  @import '../styles/colors.scss';

  h1 {
    margin: 0;
    margin-top: 0.2rem;
    margin-bottom: 1.5rem;
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
