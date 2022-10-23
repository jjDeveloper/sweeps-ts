<script lang="ts">
  import { games } from './gamestore'
  import GameBoard from './GameBoard.svelte'
  import { Board, GameLevel } from './sweeps.js'
    const board = new Board(GameLevel.one);
  const boardTwo = new Board(GameLevel.two);
  const boards = [board, boardTwo];
  const handleTileClick = (event) => console.log('Game handling tile click', event.detail)
  $games = boards
</script>
<main>
  {#each boards as game }
    <GameBoard tiles={game.tiles} on:tileclick={handleTileClick}/>
  {/each}
</main>
<style>
</style>