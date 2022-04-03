<script lang="ts">
  import {onMount, onDestroy} from 'svelte'
  import {Vault} from '../Classes/Vault'
  import {TrackingStore} from '../Stores/tracking'

  let videoPath: string
  let videoSource: string = ''
  // toi avoid duplicate search
  let currentLesson: string = ''

  const vault = new Vault()

  const getVideoURL = async (path: string) => {
    const fileContent = await window.API.fsRead(path)
    const videoFile = new File([fileContent as BlobPart], 'video/mp4')
    return URL.createObjectURL(videoFile)
  }

  const unsubscribe = TrackingStore.subscribe(async (t) => {
    if (t.currentLesson === '') return
    if (t.currentLesson === currentLesson) return
    currentLesson = t.currentLesson
    videoPath = vault.getVideoPath(
      t.currentCourse,
      t.currentChapter,
      t.currentLesson
    )
    if (videoPath) {
      videoSource = await getVideoURL(videoPath)
    }
  })

  onMount(async () => {
    const video = document.getElementById('player') as HTMLVideoElement
    video.addEventListener('timeupdate', (evt: ProgressEvent) => {
      console.log(evt)
    })
    video.currentTime = 0
  })

  onDestroy(() => {
    unsubscribe()
  })
</script>

<div id="videoPlayer">
  <video id="player" controls src={videoSource}>
    <track kind="captions"  src="{videoSource}"/>
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
