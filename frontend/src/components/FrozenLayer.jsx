import frozenSnake from "../assets/images/Snake-frozen.png";
import miscSprite from "../assets/images/Misc.png";

export const FrozenLayer = ({
  gameData,
  tileSizePercent,
  tileSize,
  tilesetColumns,
}) => {
  const halfTileSizePercent = tileSizePercent / 2;
  const rows = gameData.lobby.gameSettings.height;
  const columns = gameData.lobby.gameSettings.width;

  const player1Frozen = gameData.player1Frozen;
  const player2Frozen = gameData.player2Frozen;

  const GetFrozenData = (entity) => {
    let sprite = miscSprite;
    let topLeftX = 3;
    let topLeftY = 3;

    if (entity.startsWith("snake1") && player1Frozen) {
      sprite = frozenSnake;
    } else if (entity.startsWith("snake2") && player2Frozen) {
      sprite = frozenSnake;
    } else {
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
    }

    // Same logic as in GetEntityData to align frozen layer
    switch (entity) {
      case "snake1-head-l":
      case "snake2-head-l":
        topLeftX = 0;
        topLeftY = 0;
        break;

      case "snake1-head-u":
      case "snake2-head-u":
        topLeftX = 3;
        topLeftY = 0;
        break;

      case "snake1-head-r":
      case "snake2-head-r":
        topLeftX = 1;
        topLeftY = 1;
        break;

      case "snake1-head-d":
      case "snake2-head-d":
        topLeftX = 2;
        topLeftY = 2;
        break;

      case "snake1-body-h":
      case "snake2-body-h":
        topLeftX = 1;
        topLeftY = 0;
        break;

      case "snake1-body-v":
      case "snake2-body-v":
        topLeftX = 3;
        topLeftY = 1;
        break;

      case "snake1-body-lu":
      case "snake2-body-lu":
        topLeftX = 1;
        topLeftY = 3;
        break;

      case "snake1-body-ld":
      case "snake2-body-ld":
        topLeftX = 1;
        topLeftY = 2;
        break;

      case "snake1-body-ru":
      case "snake2-body-ru":
        topLeftX = 0;
        topLeftY = 3;
        break;

      case "snake1-body-rd":
      case "snake2-body-rd":
        topLeftX = 0;
        topLeftY = 2;
        break;

      case "snake1-tail-l":
      case "snake2-tail-l":
        topLeftX = 2;
        topLeftY = 0;
        break;

      case "snake1-tail-u":
      case "snake2-tail-u":
        topLeftX = 3;
        topLeftY = 2;
        break;

      case "snake1-tail-r":
      case "snake2-tail-r":
        topLeftX = 0;
        topLeftY = 1;
        break;

      case "snake1-tail-d":
      case "snake2-tail-d":
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
        zIndex: 3,
      }}
    >
      {gameData.entityLayer.map((row, rowIndex) =>
        row.map((entity, colIndex) => {
          const { sprite, clipPath, transform } = GetFrozenData(entity);

          if (!sprite) return null; // No frozen overlay for non-snake entities

          return (
            <img
              className="tile pixel-art"
              key={`frozen-${rowIndex}-${colIndex}`}
              src={sprite}
              alt="Frozen Entity"
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
