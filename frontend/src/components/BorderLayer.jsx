import borderTileset from "../assets/images/BorderTileset.png";

export const BorderLayer = ({
  gameData,
  tileSizePercent,
  tileSize,
  tilesetColumns,
}) => {
  const halfTileSizePercent = tileSizePercent / 2;
  if (!gameData.lobby.gameSettings.borders) return null;
  const rows = gameData.lobby.gameSettings.height;
  const columns = gameData.lobby.gameSettings.width;

  const GetBorderData = (rowIndex, colIndex) => {
    let topLeftX = 0;
    let topLeftY = 0;

    // Top-left corner
    if (rowIndex === 0 && colIndex === 0) {
      topLeftX = 0;
      topLeftY = 0;
    }
    // Top-right corner
    else if (rowIndex === 0 && colIndex === columns - 1) {
      topLeftX = 2;
      topLeftY = 0;
    }
    // Top edge
    else if (rowIndex === 0) {
      topLeftX = 1;
      topLeftY = 0;
    }

    // Bottom-left corner
    else if (rowIndex === rows - 1 && colIndex === 0) {
      topLeftX = 0;
      topLeftY = 2;
    }
    // Bottom-right corner
    else if (rowIndex === rows - 1 && colIndex === columns - 1) {
      topLeftX = 2;
      topLeftY = 2;
    }
    // Bottom edge
    else if (rowIndex === rows - 1) {
      topLeftX = 1;
      topLeftY = 2;
    }

    // Left edge
    else if (colIndex === 0) {
      topLeftX = 0;
      topLeftY = 1;
    }
    // Right edge
    else if (colIndex === columns - 1) {
      topLeftX = 2;
      topLeftY = 1;
    } else {
      topLeftX = 1;
      topLeftY = 1;
    }

    topLeftX = topLeftX * tileSizePercent;
    topLeftY = topLeftY * tileSizePercent;
    let bottomRightX = topLeftX + tileSizePercent;
    let bottomRightY = topLeftY + tileSizePercent;

    let translateX = halfTileSizePercent - topLeftX;
    let translateY = halfTileSizePercent - topLeftY;

    return {
      sprite: borderTileset,
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
        zIndex: 4,
      }}
    >
      {/* Render the border layer based on grid position */}
      {Array.from({ length: rows }).map((_, rowIndex) =>
        Array.from({ length: columns }).map((_, colIndex) => {
          const { sprite, clipPath, transform } = GetBorderData(
            rowIndex,
            colIndex
          );

          return (
            <img
              className="tile pixel-art"
              key={`border-${rowIndex}-${colIndex}`}
              src={sprite}
              alt="Border Tile"
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
