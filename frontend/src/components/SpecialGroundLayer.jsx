import miscSprite from "../assets/images/Misc.png";
import desertTileset1 from "../assets/images/DesertHazards-1.png";
import desertTileset2 from "../assets/images/DesertHazards-2.png";

export const SpecialGroundLayer = ({
  gameData,
  tileSizePercent,
  tileSize,
  tilesetColumns,
}) => {
  const halfTileSizePercent = tileSizePercent / 2;
  const rows = gameData.lobby.gameSettings.height;
  const columns = gameData.lobby.gameSettings.width;

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

      /* Quicksand Vertical */
      case "quicksand-vertical-0":
        sprite = desertTileset2;
        topLeftX = 0;
        topLeftY = 0;
        break;

      case "quicksand-vertical-1":
        sprite = desertTileset2;
        topLeftX = 1;
        topLeftY = 0;
        break;

      case "quicksand-vertical-2":
        sprite = desertTileset2;
        topLeftX = 0;
        topLeftY = 1;
        break;

      case "quicksand-vertical-3":
        sprite = desertTileset2;
        topLeftX = 1;
        topLeftY = 1;
        break;

      case "quicksand-vertical-4":
        sprite = desertTileset2;
        topLeftX = 0;
        topLeftY = 2;
        break;

      case "quicksand-vertical-5":
        sprite = desertTileset2;
        topLeftX = 1;
        topLeftY = 2;
        break;

      case "quicksand-vertical-6":
        sprite = desertTileset2;
        topLeftX = 0;
        topLeftY = 3;
        break;

      case "quicksand-vertical-7":
        sprite = desertTileset2;
        topLeftX = 1;
        topLeftY = 3;
        break;

      /* Quicksand Horizontal */
      case "quicksand-horizontal-0":
        sprite = desertTileset1;
        topLeftX = 0;
        topLeftY = 2;
        break;

      case "quicksand-horizontal-1":
        sprite = desertTileset1;
        topLeftX = 1;
        topLeftY = 2;
        break;

      case "quicksand-horizontal-2":
        sprite = desertTileset1;
        topLeftX = 2;
        topLeftY = 2;
        break;

      case "quicksand-horizontal-3":
        sprite = desertTileset1;
        topLeftX = 3;
        topLeftY = 2;
        break;

      case "quicksand-horizontal-4":
        sprite = desertTileset1;
        topLeftX = 0;
        topLeftY = 3;
        break;

      case "quicksand-horizontal-5":
        sprite = desertTileset1;
        topLeftX = 1;
        topLeftY = 3;
        break;

      case "quicksand-horizontal-6":
        sprite = desertTileset1;
        topLeftX = 2;
        topLeftY = 3;
        break;

      case "quicksand-horizontal-7":
        sprite = desertTileset1;
        topLeftX = 3;
        topLeftY = 3;
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
        zIndex: 1,
      }}
    >
      {gameData.specialGroundLayer.map((row, rowIndex) =>
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
