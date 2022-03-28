<script lang="ts">
  import { afterUpdate, beforeUpdate, onMount } from 'svelte'

  // create File object
  const videoPath =
    '/media/toorop/Bertha/Formation/Dev/Udemy - HTML&CSS Tutorial and Projects Course 2022 (Flexbox&Grid)/01 - Course Intro/001 Course Structure.mp4'

  let videoSource: string = ''

  onMount(async () => {
    videoSource = await getVideoURL(videoPath)
    const video = document.getElementById('player') as HTMLVideoElement
    video.addEventListener('timeupdate', (evt: ProgressEvent) => {
      console.log(evt)
    })
    video.currentTime = 2
  })

  const getVideoURL = async (path: string) => {
    const fileContent = await window.API.fsRead(path)
    const videoFile = new window.File([fileContent], 'video/mp4')
    const url = URL.createObjectURL(videoFile)
    return url
  }
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
    width: 100%;
  }
</style>
