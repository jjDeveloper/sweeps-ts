enum TileStatus {
  hidden,
  shown,
}

type Coordinates = {
  x?: number;
  y?: number;
};

enum GameLevel {
  one,
  two,
}
enum MouseButton {
  left = 0,
  right = 2
}
interface TileEventProps {
  button: MouseButton;
  tile: Tile;
}

class Tile {
  contents: Mine | Flag;
  status: TileStatus;
  x: number;
  y: number;

  constructor(coords?: Coordinates) {
    if (coords !== undefined) {
      this.x = coords.x;
      this.y = coords.y;
    }
    this.status = TileStatus.hidden;
  }
}

class Mine {
  value: number;
  x: number;
  y: number;
  constructor(maxX: number, maxY: number) {
    this.x = this._randomInt(maxX);
    this.y = this._randomInt(maxY);
  }
  _randomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }
}

class Flag {
  value: number;
  constructor(touching?: boolean) {
    this.value = touching ? 1 : 0;
  }
}

class Board {
  tiles: Tile[][];
  level: GameLevel;

  constructor(level: GameLevel) {
    this.level = level;
    const mines = this._buildMines();
    console.log(mines);
    this._fillTiles(mines);
  }

  get mineCount(): number {
    switch (this.level) {
      case GameLevel.one:
        return 10;
      case GameLevel.two:
        return 40;
    }
  }

  get rowDepth(): number {
    switch (this.level) {
      case GameLevel.one:
        return 8;
      case GameLevel.two:
        return 16;
    }
  }

  get colDepth(): number {
    switch (this.level) {
      case GameLevel.one:
        return 8;
      case GameLevel.two:
        return 16;
    }
  }

  private _fillTiles(mines: Mine[]) {
    const arr: Tile[][] = new Array(this.rowDepth);
    for (let a = 0; a < arr.length; a++) {
      arr[a] = new Array(this.colDepth);
    }
    let tile;
    for (let y = 0; y < this.rowDepth; y++) {
      for (let x = 0; x < this.colDepth; x++) {
        tile = new Tile({ x, y });
        arr[x][y] = tile;
        tile = undefined;
      }
    }
    mines.forEach((mine) => {
      arr[mine.x][mine.y].contents = mine
    });

    console.log(arr);
    this.tiles = arr;
    this._placeFlags(mines);
  }

  private _buildMines(count: number = this.mineCount): Mine[] {
    let mines: Mine[] = [];
    const isDup = (m: Mine) => {
      const duplicates = mines.filter((mine) => mine.x === m.x && mine.y === m.y);
      if (duplicates.length > 0) {
        console.log('Removing Duplicate', m)
        isDup(new Mine(this.rowDepth, this.colDepth))
      } else {
        mines.push(m)
      }
    }
    for (let i = 0; i < count; i++) {
      isDup(new Mine(this.rowDepth, this.colDepth));
    }
    return mines;
  }

  private _placeFlags(mines: Mine[]) {
    const touchingTiles: Coordinates[] = [
      { x: -1, y: -1 },
      { x: -1, y: 0 },
      { x: -1, y: 1 },
      { x: 0, y: -1 },
      { x: 0, y: 1 },
      { x: 1, y: -1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
    ];
    mines.forEach((mine) => {
      console.log('current mine', mine);
      let coords: Coordinates;
      for (let i = 0; i < 8; i++) {
        coords = touchingTiles[i];
        const nextCoord: Coordinates = {
          x: mine.x + coords.x,
          y: mine.y + coords.y,
        };
        const canPlace = (spot: Coordinates): boolean => {
          const nonNegative =
            Object.entries(spot).filter(([, val]) => val >= 0).length === 2;
          const insideBounds = nonNegative
            ? spot.x < this.rowDepth && spot.y < this.colDepth
            : false;
          return insideBounds;
        };

        console.log('nextCoord', nextCoord);
        if (canPlace(nextCoord)) {
          if (this.tiles[nextCoord.x][nextCoord.y].contents instanceof Flag) {
            this.tiles[nextCoord.x][nextCoord.y].contents.value += 1;
          } else if (
            this.tiles[nextCoord.x][nextCoord.y].contents === undefined
          ) {
            const flag = new Flag(true);
            this.tiles[nextCoord.x][nextCoord.y].contents = flag;
          }
          console.log('placed tile', this.tiles[nextCoord.x][nextCoord.y]);
        }
      }

      console.log(this.tiles);
    });
  }
}
interface IGame {
  level: GameLevel
}
enum GameStatus {
  pregame,
  playing,
  over
}
class Game {
  board: Board;
  status: GameStatus;

  constructor(props: IGame) {
    this.board = new Board(props.level);
    this.status = GameStatus.playing;
  }

  public move(gameMove: TileEventProps): void {
    if (this.status !== GameStatus.playing) return;
    if (gameMove.tile.contents instanceof Mine) {
      console.log('Mine hit, Game over');
      this.gameOver(gameMove.tile);
    } else if (gameMove.tile.contents instanceof Flag) {
      console.log('Revealing Flag');
      this.flagPlay(gameMove.tile);
    } else if (gameMove.tile.contents === undefined) {
      console.log('Revealing empty spaces')
      this.emptySpacePlay(gameMove.tile);
    }
  };

  private gameOver(tile: Tile): void {
    // this.board.tiles[tile.x][tile.y].status = TileStatus.shown;
    this.board.tiles.forEach(row=> row.map(tile => tile.status = TileStatus.shown));
    this.status = GameStatus.over;
  }

  private flagPlay(tile: Tile) {
    console.log("Flag Play", tile);
    this.board.tiles[tile.x][tile.y].status = TileStatus.shown;
  }
  private emptySpacePlay(tile: Tile) {
    console.log("Empty Space Play", tile);
    this.board.tiles[tile.x][tile.y].status = TileStatus.shown;
  }
}

export { Board, GameLevel, Mine, Flag, Tile, Game, TileStatus }; export type { TileEventProps };

