<script lang="ts">
  import {onDestroy} from "svelte";
  import Icon from '@iconify/svelte'
  import { TrackingStore } from '../Stores/tracking'
  import ListFile from './ListFile.svelte'
  import type { ITracking } from '../Stores/tracking'

  import type { IChapter, ICourse } from '../global.d'

  export let chapter: IChapter = {
    id: '',
    name: '',
    path: ''
  }


  let tracking: ITracking
  const unsubscribe = TrackingStore.subscribe((t) => {
    tracking = t
  })

  // change chapter
  const updateCurrentChapter = (id: string) => {
    $TrackingStore.currentChapter = id
  }

  // unsub
  onDestroy(() => {
    unsubscribe()
  })
</script>

<div class="chapter" on:click={() => updateCurrentChapter(chapter.id)}>
  <h3>{chapter.name}</h3>
  <div class="v-spacer"></div>
  <Icon
    icon={tracking.currentChapter === chapter.id
      ? 'charm:chevrons-down'
      : 'charm:chevrons-right'}
    width="24"
  />
</div>
{#if tracking.currentChapter === chapter.id}
  {#each chapter.files as file}
    <ListFile {file} />
  {/each}
{/if}

<style lang="scss">
  @import '../styles/colors.scss';

  h3 {
    font-size: 1.2rem;
    font-weight: bold;
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
</style>
