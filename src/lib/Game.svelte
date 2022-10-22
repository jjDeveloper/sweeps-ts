<script lang="ts">
  import { games } from './gamestore'
  import GameBoard from './GameBoard.svelte'
  import { Board, GameLevel } from './sweeps.ts'
    const board = new Board(GameLevel.one);
  const boardTwo = new Board(GameLevel.two);
  const boards = [board, boardTwo];
  $games = boards
</script>
<main>
  {#each boards as game }
    <GameBoard tiles={game.tiles} />
  {/each}
</main>
<style>
</style>