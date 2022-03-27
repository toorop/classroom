<script lang="ts">
  import { afterUpdate, beforeUpdate, onMount } from 'svelte'

  // create File object
  const videoPath =
    '/media/toorop/Bertha/Formation/Dev/Egghead - Build an nft based ticketing system/01-egghead-create-a-new-nft-project-with-scaffold-eth-vlrVuk-um.mp4'

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

<div class="debug"><pre>{videoSource}</pre></div>
<div id="videoPlayer">
  <video id="player" controls src={videoSource}>
    <track kind="captions" />
    <!-- <source src={videoSource} type="video/mp4" /> -->
    Your browser does not support the video tag.
  </video>
</div>

<style lan="scss">
  #videoPlayer {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    height: 400px;
  }

  video {
    height: 100%;
  }
  .debug {
    display: flex;
    flex-grow: 1;

    justify-content: center;
  }

  /* your styles go here */
</style>
