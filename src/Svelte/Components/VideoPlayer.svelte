<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy } from 'svelte'
  import { Vault } from '../Classes/Vault'
  import TrackingStore from '../Stores/tracking'

  let videoPath: string
  let videoSource: string = ''

  // to avoid duplicate search
  //let currentLesson: string = ''

  // dispatcher
  const dispatch = createEventDispatcher()

  // Vault
  const vault = new Vault()

  // get video URL as ObjectURL
  const getVideoURL = async (path: string) => {
    const fileContent = await window.API.fsRead(path)
    const videoFile = new File([fileContent as BlobPart], 'video/mp4')
    return URL.createObjectURL(videoFile)
  }

  // store
  const unsubscribe = TrackingStore.subscribe(async (t) => {
    if (t.currentLesson === '') return
    videoPath = await vault.getVideoPath(
      t.currentCourse,
      t.currentChapter,
      t.currentLesson
    )
    if (videoPath) {
      videoSource = await getVideoURL(videoPath)
    }
  })

  onMount(async () => {
    let video = document.getElementById('player') as HTMLVideoElement
    // video start at
    video.currentTime = 0

    // play video
    // launch play
    window.addEventListener('play', () => {
      video.addEventListener(
        'canplay',
        async () => {
          await video.play()
        },
        { once: true }
      )
    })

    // time tracking
    video.addEventListener('timeupdate', (evt: ProgressEvent) => {
      //console.log(evt)
    })
    // end of video
    video.addEventListener('ended', (evt: ProgressEvent) => {
      console.log('end of video')
      dispatch('videoEnded')
    })
  })

  onDestroy(() => {
    unsubscribe()
  })
</script>

<div id="videoPlayer">
  <video id="player" controls src={videoSource}>
    <track kind="captions" src={videoSource} />
    <!--<source src={videoSource} type="video/mp4" />-->
    Your browser does not support the video tag.
  </video>
</div>

<style lang="scss">
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
