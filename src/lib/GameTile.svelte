<script lang="ts">
import { createEventDispatcher } from 'svelte';

  import { Tile, Mine, Flag } from './sweeps'
  import type { TileEventProps } from './sweeps'
  export let tile: Tile = undefined;
  const dispatch = createEventDispatcher();
  enum FlagColor {
    'lightgrey',
    'orange',
    'yellow',
    'blue',
    'green',
    'indigo',
    'violet',
    'purple',
    'ligtblue',
    'maroon'
  }

  const contents = () => {
    if(tile) {
      if (tile.contents instanceof Mine ) {
        return 'M'
      } else if (tile.contents instanceof Flag) {
        return tile.contents.value
      } else {
        return ''
      }
    }
  }
  const style = () => {
    if(tile) {
      if (tile.contents instanceof Mine ) {
        return `background-color: ${FlagColor[9]}; color: red`
      } else if (tile.contents instanceof Flag) {
        return `background-color: ${FlagColor[tile.contents.value]}; color: black;`
      } else {
        return ''
      }
    }
  }

  const handleClick = (event: MouseEvent, t: Tile = tile) => {
    event.preventDefault();
    console.log("Handle Tile Click", event.button)
    console.log("Clicked Tile", t)
    const tileEvent: TileEventProps = {
      tile: t,
      button: event.button
    }
    dispatch("tileclick", tileEvent);
}
</script>
<div class="board-column" style={style()} on:click={handleClick} on:contextmenu={handleClick}>
 <p>{ contents()}</p>
</div>
<style>
  .board-column {
    height: 50px;
    width: 50px;
    background-color: lightgrey;
    border: 1px solid black;
  }
</style>