<script lang="ts">
  import type { Tile } from './sweeps'
  import GameTile from './GameTile.svelte'
  export let tiles: Tile[][] = undefined;
</script>

<div class="board">
  {#each tiles as row }
    <div class="board-row">
      {#each row as tile }
        <GameTile tile={tile} on:tileclick />
      {/each }
    </div>
  {/each }
</div>

<style>
  .board {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }
  .board-row {
    display: flex;
    flex-direction: row;
  }
</style>