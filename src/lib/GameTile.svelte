<script lang="ts">
  import { Tile, Mine, Flag } from './sweeps'
  export let tile: Tile = undefined;
  enum FlagColor {
    0 = 'lightgrey',
    1 = 'orange',
    2 = 'yellow',
    3 = 'blue',
    4 = 'green',
    5 = 'indigo',
    6 = 'violet',
    7 = 'purple',
    8 = 'ligtblue',
    9 = 'maroon'
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
</script>
<div class="board-column" style={style()}>
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