import { MAPS } from "../constants";
import { useEffect, useRef } from "react";

export const GroundLayer = ({
  gameData,
  tileSizePercent,
  tileSize,
  setTileSize,
  tilesetColumns,
}) => {
  const halfTileSizePercent = tileSizePercent / 2;
  const boardRef = useRef(null);
  const rows = gameData.lobby.gameSettings.height;
  const columns = gameData.lobby.gameSettings.width;
  const map = MAPS[gameData.lobby.gameSettings.map].tileset;

  useEffect(() => {
    const resizeBoard = () => {
      if (!boardRef.current) return;

      const { clientWidth, clientHeight } = boardRef.current;
      const rows = gameData.lobby.gameSettings.height;
      const columns = gameData.lobby.gameSettings.width;

      // Calculate the maximum possible tile size while maintaining the aspect ratio
      const tileSizeWidth = Math.floor(clientWidth / columns);
      const tileSizeHeight = Math.floor(clientHeight / rows);

      // Set the tile size based on the smaller dimension to maintain aspect ratio
      const newTileSize = Math.min(tileSizeWidth, tileSizeHeight);
      setTileSize(newTileSize);
    };

    // Recalculate tile size on initial load and window resize
    resizeBoard();
    window.addEventListener("resize", resizeBoard);

    return () => window.removeEventListener("resize", resizeBoard);
  }, [gameData]);

  const getTileClipPathAndPosition = (tileIndex) => {
    // Calculate row and column for the given tile index
    const row = Math.floor(tileIndex / tilesetColumns); // Row index (0 to 3)
    const col = tileIndex % tilesetColumns; // Column index (0 to 3)

    // Calculate top-left and bottom-right coordinates for the tile in percentages
    const topLeftX = col * tileSizePercent;
    const topLeftY = row * tileSizePercent;
    const bottomRightX = topLeftX + tileSizePercent;
    const bottomRightY = topLeftY + tileSizePercent;

    // To center the tile, we use transform: translate to shift the image
    const translateX = halfTileSizePercent - topLeftX;
    const translateY = halfTileSizePercent - topLeftY;

    return {
      clipPath: `polygon(${topLeftX}% ${topLeftY}%, ${bottomRightX}% ${topLeftY}%, ${bottomRightX}% ${bottomRightY}%, ${topLeftX}% ${bottomRightY}%)`,
      transform: `translate(${translateX}%, ${translateY}%)`,
    };
  };

  return (
    <div
      className="game-grid container-center"
      ref={boardRef}
      style={{
        display: "grid",
        gridTemplateRows: `repeat(${rows}, ${tileSize}px)`,
        gridTemplateColumns: `repeat(${columns}, ${tileSize}px)`,
        transform: `translate(${-tileSize / 2}px, ${tileSize}px)`,
        zIndex: 0,
      }}
    >
      {gameData.groundLayer.map((row, rowIndex) =>
        row.map((tileIndex, colIndex) => {
          const { clipPath, transform } = getTileClipPathAndPosition(tileIndex);

          return (
            <img
              className="tile pixel-art"
              key={`${rowIndex}-${colIndex}`}
              src={map}
              alt={`Tile ${tileIndex}`}
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
