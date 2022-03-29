<script>
  import Clock from '../../../public/img/icons/clock.svg'
  import ChevronDown from '../../../public/img/icons/chevrons-down.svg'
  import ChevronRight from '../../../public/img/icons/chevrons-right.svg'
  import VideoPlayer from '../Components/VideoPlayer.svelte'
</script>

<h1>Udemy - HTML&CSS Course 2022 Flexbox & Grid</h1>
<div id="room">
  <div id="video-player">
    <VideoPlayer />
  </div>
  <div id="chapterslessons">
    <h2>Lessons</h2>
    <div class="chapters-wrapper scrollable">
      <div class="chapters-content">
        <div class="chapter">
          <h3>01 - Course intro</h3>
          <div class="v-spacer" />
          <ChevronDown width="24" height="24" viewBox="0 0 24 24" />
        </div>
        <div class="lesson active">
          <h4>001 Course Structure</h4>
          <div class="duration">
            <Clock width="14" height="14" viewBox="0 0 24 24" />
            4:15
          </div>
        </div>
        <div class="lesson">
          <h4>002 Video blur fix</h4>
          <div class="duration">
            <Clock width="14" height="14" viewBox="0 0 24 24" />
            12:51
          </div>
        </div>
        <div class="lesson">
          <h4>003 Course Review</h4>
          <div class="duration">
            <Clock width="14" height="14" viewBox="0 0 24 24" />
            8:12
          </div>
        </div>
        <div class="chapter">
          <h3>02 - HTML tutorial</h3>
          <div class="v-spacer" />
          <ChevronRight width="24" height="24" viewBox="0 0 24 24" />
        </div>
        <div class="chapter">
          <h3>03 - HTML Coffee Project</h3>
          <div class="v-spacer" />
          <ChevronRight width="24" height="24" viewBox="0 0 24 24" />
        </div>
        <div class="chapter">
          <h3>04 - HTML tutorial</h3>
          <div class="v-spacer" />
          <ChevronRight width="24" height="24" viewBox="0 0 24 24" />
        </div>
        <div class="chapter">
          <h3>05 - HTML Coffee Project</h3>
          <div class="v-spacer" />
          <ChevronRight width="24" height="24" viewBox="0 0 24 24" />
        </div>
        <div class="chapter">
          <h3>06 - HTML tutorial</h3>
          <div class="v-spacer" />
          <ChevronRight width="24" height="24" viewBox="0 0 24 24" />
        </div>
        <div class="chapter">
          <h3>07 - HTML Coffee Project</h3>
          <div class="v-spacer" />
          <ChevronRight width="24" height="24" viewBox="0 0 24 24" />
        </div>
      </div>
  </div>
  </div>
</div>

<style lang="scss">
  @import '../styles/colors.scss';

  .chapters-wrapper{

    background: red;
    max-height: 300px;
    overflow: auto;

    @media (min-width: 1200px) {
      max-height: unset;
      flex: 1 0 auto;
      position: relative;
      overflow: auto;
    }

 
  }

  .chapters-content{
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
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
    color: $color5;
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

  #room {
   

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

  .scrollable::-webkit-scrollbar {
    width: 15px;
  }
  .scrollable::-webkit-scrollbar-thumb {
    background-color: $color9;
    border-radius: 1px;
  }
  .scrollable::-webkit-scrollbar-track {
    background-color: $color1;
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
    gap: 0.1rem;
    margin-left: 0rem;
    font-size: 0.9rem;
  }

  .lesson.active {
    background: linear-gradient(90deg, $color10, $color8);
  }
</style>
