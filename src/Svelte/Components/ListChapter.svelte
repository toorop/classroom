<script lang="ts">
  import Icon from '@iconify/svelte'
  import type { IChapter, ICourse } from '../global.d'

  export let chapter: IChapter = {
    id: '',
    name: '',
    path: ''
  }

  // format time
  function formatTime(time: number): string {
    time = time / 1000
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }
</script>

<div class="chapter">
  <h3>{chapter.name}</h3>
  <div class="v-spacer" />
  <Icon icon="charm:chevrons-right" width="24" />
</div>
{#each chapter.files as file}
  {#if file.type === 'video/mp4'}
    <div class="lesson">
      <h4>{file.name}</h4>
      <div class="lesson-detail">
        <div class="duration">
          <Icon icon="charm:clock" width="16" />
          {formatTime(file.duration)}
        </div>
      </div>
    </div>
  {/if}
{/each}

<style lang="scss">
  @import '../styles/colors.scss';

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

  .chapter {
    display: flex;
    align-items: center;
    padding: 0.8rem;
    border-bottom: 1px solid $color7;
    background-color: $color2;
    h3 {
      padding-right: 0.2rem;
      width: 100%;
    }
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
</style>
