<script lang="ts">
  import { games } from './gamestore'
  import GameBoard from './GameBoard.svelte'
  import { Board, GameLevel, Game } from './sweeps.js'
  import type { TileEventProps } from './sweeps.js';
  const game = new Game({ level: GameLevel.one });
  $: tiles = [...game.board.tiles];
  //   const board = new Board(GameLevel.one);
  // const boardTwo = new Board(GameLevel.two);
  // const boards = [game];
  const handleTileClick = (event) => {
    console.log('Game handling tile click', event.detail)
    const gameMove: TileEventProps = event.detail;
    game.move(gameMove)
    tiles = [...game.board.tiles]

  }
  // $games = boards
  
</script>
<main>
  <!-- {#each boards as game } -->
  {#if game }
    <GameBoard bind:tiles on:tileclick={handleTileClick}/>
  {/if}
</main>
<style>
</style>