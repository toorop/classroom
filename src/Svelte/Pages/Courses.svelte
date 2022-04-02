<script lang="ts">
  import Icon from '@iconify/svelte'
  import { push } from 'svelte-spa-router'
  import VaultStore from '../Stores/vault'
</script>

<div class="title">
  <h1>{$VaultStore.courses.length} Courses in this library</h1>
</div>
<div id="wrapper">
  <div id="courses">
    {#each $VaultStore.courses as course}
      <div
        class="course"
        on:click={() => push(`/course/${course.name}/${course.id}`)}
      >
        <p>{course.name}</p>
        <div class="spacer" />
        <Icon id="iconPlay" icon="carbon:play-filled-alt" width="32" />
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  @import '../styles/colors.scss';

  .spacer {
    flex-grow: 1;
  }

  .title {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    & > h1 {
      font-weight: bold;
      color: $color5;
    }
  }

  #wrapper {
    display: flex;
    justify-content: center;
  }

  #courses {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    padding: 3rem;
    padding-top: 1rem;
  }

  .course {
    display: flex;
    flex: 1 1 100%;
    flex-direction: row;
    align-items: center;
    padding: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-right: 2rem;
    color: $color4;
    background-color: $color3;
    border-radius: 4px;
    margin-bottom: 1rem;
    cursor: pointer;
    &:hover {
      background-color: $color2;
    }
    & > p {
      font-size: 1.2rem;
      margin-left: 1rem;
    }
  }
</style>
