<script>
  import { location } from 'svelte-spa-router'
  import Icon from '@iconify/svelte'
  import VideoPlayer from '../Components/VideoPlayer.svelte'
  import { onMount } from 'svelte'

  export let params = {}

  onMount(() => {
    console.log('params', params)
    console.log('location', location)
  })
</script>

<h1>{params.name}</h1>
<div id="video-and-summary">
  <div id="video-player">
    <VideoPlayer />
  </div>
  <div id="chapterslessons">
    <h2>Course content</h2>
    <div class="chapters-wrapper scrollable">
      <div class="chapters-content">
        <div class="chapter">
          <h3>01 - Course intro</h3>
          <div class="v-spacer" />
          <Icon icon="charm:chevrons-down" width="24" />
        </div>
        <div class="lesson active">
          <h4>001 Course Structure</h4>
          <div class="lesson-detail">
            <div class="duration">
              <Icon icon="charm:clock" width="16" />
              4:15
            </div>
          </div>
        </div>
        <div class="lesson">
          <h4>002 Video blur fix</h4>
          <div class="lesson-detail">
            <div class="duration">
              <Icon icon="charm:clock" width="16" />
              12:51
            </div>
            <div class="v-spacer" />
            <button>
              <Icon icon="ant-design:folder-filled" width="16" />
              <span> Ressources</span>
              <Icon icon="charm:chevron-down" width="16" />
            </button>
          </div>
        </div>
        <div class="lesson">
          <h4>003 Course Review</h4>
          <div class="lesson-detail">
            <div class="duration">
              <Icon icon="charm:clock" width="16" />
              8:12
            </div>
          </div>
        </div>
        <div class="chapter">
          <h3>02 - HTML tutorial</h3>
          <div class="v-spacer" />
          <Icon icon="charm:chevrons-right" width="24" />
        </div>
        <div class="chapter">
          <h3>03 - HTML Coffee Project</h3>
          <div class="v-spacer" />
          <Icon icon="charm:chevrons-right" width="24" />
        </div>
        <div class="chapter">
          <h3>04 - HTML tutorial</h3>
          <div class="v-spacer" />
          <Icon icon="charm:chevrons-right" width="24" />
        </div>
        <div class="chapter">
          <h3>05 - HTML Coffee Project</h3>
          <div class="v-spacer" />
          <Icon icon="charm:chevrons-right" width="24" />
        </div>
        <div class="chapter">
          <h3>06 - HTML tutorial</h3>
          <div class="v-spacer" />
          <Icon icon="bi:chevron-double-right" width="24" />
        </div>
        <div class="chapter">
          <h3>07 - HTML Coffee Project</h3>
          <div class="v-spacer" />
          <Icon icon="bi:chevron-double-right" width="24" />
        </div>
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

  .chapters-wrapper {
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

  h3 {
    font-size: 1.2rem;
    font-weight: bold;
    text-transform: capitalize;
  }

  h4 {
    margin-top: 0.7rem;
    margin-bottom: 0.4rem;
    text-transform: capitalize;
  }

  .v-spacer {
    flex-grow: 1;
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
    background-color: black;
    //min-width: 60ch;
  }

  #chapterslessons {
    flex: 1 1 30%;
    flex-direction: column;
    background-color: $color6;
    //min-width: 35ch;
    display: flex;
  }

  :global(.dark) #chapterslessons {
    background-color: $color1;
  }

  .scrollable {
    overflow-y: auto;
    // max-height: 550px;
  }

  .chapter {
    display: flex;
    align-items: center;
    padding: 0.8rem;
    border-bottom: 1px solid $color7;
    background-color: $color2;
  }
  .chapter:hover {
    background: linear-gradient(90deg, $color2, $color1);
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
      color: $color3;
      background-color: $color3;
      border: 1px solid $color6;
      color: $color5;
      font-size: 0.9rem;
    }
  }

  .lesson {
    padding: 0.8rem;
    padding-left: 2rem;
    padding-top: 0.1rem;
    border-bottom: 1px solid $color9;
    background-color: $color3;
  }

  .lesson .duration {
    display: flex;
    align-items: center;
    gap: 0.2rem;
    margin-left: 0rem;
    font-size: 0.9rem;
  }

  .lesson.active {
    background: linear-gradient(90deg, $color10, $color8);
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
