import { SNAKE_TILESETS } from "../constants.jsx";
import miscSprite from "../assets/images/Misc.png";
import lavaTileset from "../assets/images/LavaTileset.png";
import desertTileset1 from "../assets/images/DesertHazards-1.png";

export const EntityLayer = ({
  gameData,
  tileSizePercent,
  tileSize,
  tilesetColumns,
}) => {
  const halfTileSizePercent = tileSizePercent / 2;

  const rows = gameData.lobby.gameSettings.height;
  const columns = gameData.lobby.gameSettings.width;
  const player1 = gameData.lobby.player1;
  const player2 = gameData.lobby.player2;
  const player1SnakeSprite =
    player1 == null ? null : SNAKE_TILESETS[player1.color];
  const player2SnakeSprite =
    player2 == null ? null : SNAKE_TILESETS[player2.color];

  const GetEntityData = (entity) => {
    let sprite = null;
    let topLeftX = 0;
    let topLeftY = 0;

    switch (entity) {
      case "empty":
        sprite = miscSprite;
        topLeftX = 3;
        topLeftY = 3;
        break;

      // Food cases
      case "apple":
        sprite = miscSprite;
        topLeftX = 0;
        topLeftY = 0;
        break;

      case "apple-rot":
        sprite = miscSprite;
        topLeftX = 1;
        topLeftY = 0;
        break;

      case "golden-apple":
        sprite = miscSprite;
        topLeftX = 0;
        topLeftY = 1;
        break;

      case "golden-apple-rot":
        sprite = miscSprite;
        topLeftX = 1;
        topLeftY = 1;
        break;

      case "snake-meat":
        sprite = miscSprite;
        topLeftX = 0;
        topLeftY = 2;
        break;

      case "snake-meat-rot":
        sprite = miscSprite;
        topLeftX = 1;
        topLeftY = 2;
        break;

      // Snake 1 cases
      case "snake1-head-l":
        sprite = player1SnakeSprite;
        topLeftX = 0;
        topLeftY = 0;
        break;

      case "snake1-head-u":
        sprite = player1SnakeSprite;
        topLeftX = 3;
        topLeftY = 0;
        break;

      case "snake1-head-r":
        sprite = player1SnakeSprite;
        topLeftX = 1;
        topLeftY = 1;
        break;

      case "snake1-head-d":
        sprite = player1SnakeSprite;
        topLeftX = 2;
        topLeftY = 2;
        break;

      case "snake1-body-h":
        sprite = player1SnakeSprite;
        topLeftX = 1;
        topLeftY = 0;
        break;

      case "snake1-body-v":
        sprite = player1SnakeSprite;
        topLeftX = 3;
        topLeftY = 1;
        break;

      case "snake1-body-lu":
        sprite = player1SnakeSprite;
        topLeftX = 1;
        topLeftY = 3;
        break;

      case "snake1-body-ld":
        sprite = player1SnakeSprite;
        topLeftX = 1;
        topLeftY = 2;
        break;

      case "snake1-body-ru":
        sprite = player1SnakeSprite;
        topLeftX = 0;
        topLeftY = 3;
        break;

      case "snake1-body-rd":
        sprite = player1SnakeSprite;
        topLeftX = 0;
        topLeftY = 2;
        break;

      case "snake1-tail-l":
        sprite = player1SnakeSprite;
        topLeftX = 2;
        topLeftY = 0;
        break;

      case "snake1-tail-u":
        sprite = player1SnakeSprite;
        topLeftX = 3;
        topLeftY = 2;
        break;

      case "snake1-tail-r":
        sprite = player1SnakeSprite;
        topLeftX = 0;
        topLeftY = 1;
        break;

      case "snake1-tail-d":
        sprite = player1SnakeSprite;
        topLeftX = 2;
        topLeftY = 1;
        break;

      case "snake2-head-l":
        sprite = player2SnakeSprite;
        topLeftX = 0;
        topLeftY = 0;
        break;

      case "snake2-head-u":
        sprite = player2SnakeSprite;
        topLeftX = 3;
        topLeftY = 0;
        break;

      case "snake2-head-r":
        sprite = player2SnakeSprite;
        topLeftX = 1;
        topLeftY = 1;
        break;

      case "snake2-head-d":
        sprite = player2SnakeSprite;
        topLeftX = 2;
        topLeftY = 2;
        break;

      case "snake2-body-h":
        sprite = player2SnakeSprite;
        topLeftX = 1;
        topLeftY = 0;
        break;

      case "snake2-body-v":
        sprite = player2SnakeSprite;
        topLeftX = 3;
        topLeftY = 1;
        break;

      case "snake2-body-lu":
        sprite = player2SnakeSprite;
        topLeftX = 1;
        topLeftY = 3;
        break;

      case "snake2-body-ld":
        sprite = player2SnakeSprite;
        topLeftX = 1;
        topLeftY = 2;
        break;

      case "snake2-body-ru":
        sprite = player2SnakeSprite;
        topLeftX = 0;
        topLeftY = 3;
        break;

      case "snake2-body-rd":
        sprite = player2SnakeSprite;
        topLeftX = 0;
        topLeftY = 2;
        break;

      case "snake2-tail-l":
        sprite = player2SnakeSprite;
        topLeftX = 2;
        topLeftY = 0;
        break;

      case "snake2-tail-u":
        sprite = player2SnakeSprite;
        topLeftX = 3;
        topLeftY = 2;
        break;

      case "snake2-tail-r":
        sprite = player2SnakeSprite;
        topLeftX = 0;
        topLeftY = 1;
        break;

      case "snake2-tail-d":
        sprite = player2SnakeSprite;
        topLeftX = 2;
        topLeftY = 1;
        break;

      // Vertical 4-tile lava pool
      case "lava-vertical-0":
        sprite = lavaTileset;
        topLeftX = 0;
        topLeftY = 0;
        break;
      case "lava-vertical-1":
        sprite = lavaTileset;
        topLeftX = 0;
        topLeftY = 1;
        break;
      case "lava-vertical-2":
        sprite = lavaTileset;
        topLeftX = 0;
        topLeftY = 2;
        break;
      case "lava-vertical-3":
        sprite = lavaTileset;
        topLeftX = 0;
        topLeftY = 3;
        break;

      // Horizontal 3-tile lava pool
      case "lava-horizontal-0":
        sprite = lavaTileset;
        topLeftX = 1;
        topLeftY = 3;
        break;
      case "lava-horizontal-1":
        sprite = lavaTileset;
        topLeftX = 2;
        topLeftY = 3;
        break;
      case "lava-horizontal-2":
        sprite = lavaTileset;
        topLeftX = 3;
        topLeftY = 3;
        break;

      // 4-tile circular lava pool
      case "lava-circle-large-0":
        sprite = lavaTileset;
        topLeftX = 1;
        topLeftY = 1;
        break;
      case "lava-circle-large-1":
        sprite = lavaTileset;
        topLeftX = 2;
        topLeftY = 1;
        break;
      case "lava-circle-large-2":
        sprite = lavaTileset;
        topLeftX = 1;
        topLeftY = 2;
        break;
      case "lava-circle-large-3":
        sprite = lavaTileset;
        topLeftX = 2;
        topLeftY = 2;
        break;

      case "lava-circle-small":
        sprite = lavaTileset;
        topLeftX = 1;
        topLeftY = 0;
        break;

      /* Cactus */
      case "cactus-0":
        sprite = desertTileset1;
        topLeftX = 0;
        topLeftY = 1;
        break;
      case "cactus-1":
        sprite = desertTileset1;
        topLeftX = 1;
        topLeftY = 1;
        break;
      case "cactus-2":
        sprite = desertTileset1;
        topLeftX = 2;
        topLeftY = 1;
        break;
    }

    topLeftX = topLeftX * tileSizePercent;
    topLeftY = topLeftY * tileSizePercent;
    let bottomRightX = topLeftX + tileSizePercent;
    let bottomRightY = topLeftY + tileSizePercent;

    let translateX = halfTileSizePercent - topLeftX;
    let translateY = halfTileSizePercent - topLeftY;

    return {
      sprite,
      clipPath: `polygon(${topLeftX}% ${topLeftY}%, ${bottomRightX}% ${topLeftY}%, ${bottomRightX}% ${bottomRightY}%, ${topLeftX}% ${bottomRightY}%)`,
      transform: `translate(${translateX}%, ${translateY}%)`,
    };
  };

  return (
    <div
      className="game-grid container-center"
      style={{
        display: "grid",
        gridTemplateRows: `repeat(${rows}, ${tileSize}px)`,
        gridTemplateColumns: `repeat(${columns}, ${tileSize}px)`,
        transform: `translate(${-tileSize / 2}px, ${tileSize}px)`,
        zIndex: 2,
      }}
    >
      {gameData.entityLayer.map((row, rowIndex) =>
        row.map((entity, colIndex) => {
          const { sprite, clipPath, transform } = GetEntityData(entity);

          return (
            <img
              className="tile pixel-art"
              key={`${rowIndex}-${colIndex}`}
              src={sprite}
              alt={`Entity ${entity}`}
              style={{
                clipPath: clipPath,
                transform: transform,
                width: `${tileSize * tilesetColumns}px`,
                height: `${tileSize * tilesetColumns}px`,
              }}
            />
          );
        })
      )}
    </div>
  );
};
