<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import { Tile, Mine, Marker, TileStatus } from "./sweeps";
  import type { TileEventProps } from "./sweeps";
  export let tile: Tile = undefined;
  const dispatch = createEventDispatcher();
  enum MarkerColor {
    "lightgrey",
    "orange",
    "yellow",
    "blue",
    "green",
    "indigo",
    "violet",
    "purple",
    "ligtblue",
    "maroon",
    "grey",
  }

  const contents = () => {
    if (tile) {
      if (tile.contents instanceof Mine) {
        return "M";
      } else if (tile.contents instanceof Marker) {
        return tile.contents.value;
      } else {
        return "";
      }
    }
  };
  $: style = () => {
    console.log("Style Ran");
    if (tile && tile.status === TileStatus.shown) {
      if (tile.contents instanceof Mine) {
        return `background-color: ${MarkerColor[9]}; color: red`;
      } else if (tile.contents instanceof Marker) {
        return `background-color: ${
          MarkerColor[tile.contents.value]
        }; color: black;`;
      } else {
        return "";
      }
    } else if (tile && tile.status === TileStatus.hidden) {
      return `background-color: ${MarkerColor[10]};`;
    }
  };

  const handleClick = (event: MouseEvent, t: Tile = tile) => {
    event.preventDefault();
    console.log("Handle Tile Click", event.button);
    console.log("Clicked Tile", t);
    const tileEvent: TileEventProps = {
      tile: t,
      button: event.button,
    };
    dispatch("tileclick", tileEvent);
  };
  $: status = tile.status;
</script>

<div
  class="board-column"
  style={style()}
  on:keypress={() => handleClick(new MouseEvent('click'))}
  on:click={handleClick}
  on:contextmenu={handleClick}
>
  {#if status === TileStatus.shown}
    <p>{contents()}</p>
  {:else if status === TileStatus.hidden}
    <p />
  {/if}
</div>

<style>
  .board-column {
    height: 50px;
    width: 50px;
    background-color: lightgrey;
    border: 1px solid black;
  }
</style>
