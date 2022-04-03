<script lang="ts">
  import { onMount } from 'svelte'
  import { Vault } from '../Classes/Vault'
  import type { IVault } from '../global.d'
  import { TrackingStore } from '../Stores/tracking'

  let videoPath: string
  let videoSource: string = ''

  let vaultContent: IVault
  const vault = new Vault()

  const getVideoURL = async (path: string) => {
    const fileContent = await window.API.fsRead(path)
    const videoFile = new window.File([fileContent], 'video/mp4')
    const url = URL.createObjectURL(videoFile)
    return url
  }

  TrackingStore.subscribe(async (t) => {
    console.log('TRACKER:', t)
    if (t.currentLesson === '') return
    console.log('onCHERCHE')
    videoPath = vault.getVideoPath(
      t.currentCourse,
      t.currentChapter,
      t.currentLesson
    )
    console.log('videoPath', videoPath)
    if (videoPath) {
      videoSource = await getVideoURL(videoPath)
      console.log('videoSource', videoSource)
    }
  })

  //'/media/toorop/Bertha/Formation/Dev/Udemy - HTML&CSS Tutorial and Projects Course 2022 (Flexbox&Grid)/01 - Course Intro/001 Course Structure.mp4'

  onMount(async () => {
    const video = document.getElementById('player') as HTMLVideoElement
    video.addEventListener('timeupdate', (evt: ProgressEvent) => {
      console.log(evt)
    })
    video.currentTime = 0
  })
</script>

<div id="videoPlayer">
  <video id="player" controls src={videoSource}>
    <track kind="captions" />
    <!-- <source src={videoSource} type="video/mp4" > -->
    Your browser does not support the video tag.
  </video>
</div>

<style lan="scss">
  #videoPlayer {
    justify-content: center;
    align-items: center;
    padding-bottom: 0;
  }

  video {
    display: block;
    width: 100%;
  }
  video:focus {
    outline: none;
  }
</style>
