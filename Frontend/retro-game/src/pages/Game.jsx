import React, { useEffect, useState, useRef, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";
import { useSignalR } from "../context/SignalRContext";
import headTailSwap from "../assets/images/AbilityIcons-HeadTailSwap.png";
import tileset from "../assets/images/Maps-Plains.png";

export default function Game() {
  const navigate = useNavigate();
  const { playerData, setPlayerData } = useContext(PlayerContext);
  const { connection } = useSignalR();
  const location = useLocation();
  const initialGameData = location.state?.gameData;
  const [gameData, setGameData] = useState(initialGameData);
  const boardRef = useRef(null);
  const [tileSize, setTileSize] = useState(16); // Dynamically calculated tile size

  const TILESET_COLUMNS = 4; // Number of columns in the tileset (64px / 16px = 4)
  const TILESET_TILE_SIZE = 16; // Size of each tile in the tileset (16x16 px)
  const TILESET_SIZE = 64; // Size of each tile in the tileset (16x16 px)

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

  useEffect(() => {
    if (connection) {
      connection.on("LeaveGame", () => {
        console.log("Leave Game");
        navigate("/main-menu");
      });
    }
  }, [connection]);

  const handleLeave = async (e) => {
    e.preventDefault();
    if (connection) {
      connection
        .invoke("LeaveGame", playerData.playerId, gameData.gameId)
        .catch((err) => console.error(err));
    }
  };

  const getTileClipPathAndPosition = (tileIndex) => {
    const TILESET_COLUMNS = 4; // 4 columns and 4 rows
    const TILE_SIZE_PERCENT = 25; // Each tile is 25% of the total image
    const HALF_TILE_SIZE_PERCENT = TILE_SIZE_PERCENT / 2; // 12.5% for centering

    // Calculate row and column for the given tile index
    const row = Math.floor(tileIndex / TILESET_COLUMNS); // Row index (0 to 3)
    const col = tileIndex % TILESET_COLUMNS; // Column index (0 to 3)

    // Calculate top-left and bottom-right coordinates for the tile in percentages
    const topLeftX = col * TILE_SIZE_PERCENT;
    const topLeftY = row * TILE_SIZE_PERCENT;
    const bottomRightX = topLeftX + TILE_SIZE_PERCENT;
    const bottomRightY = topLeftY + TILE_SIZE_PERCENT;

    // To center the tile, we use transform: translate to shift the image
    const translateX = HALF_TILE_SIZE_PERCENT - topLeftX; // Horizontal centering
    const translateY = HALF_TILE_SIZE_PERCENT - topLeftY; // Vertical centering

    // Return the clip-path and translation for centering the tile
    return {
      clipPath: `polygon(${topLeftX}% ${topLeftY}%, ${bottomRightX}% ${topLeftY}%, ${bottomRightX}% ${bottomRightY}%, ${topLeftX}% ${bottomRightY}%)`,
      transform: `translate(${translateX}%, ${translateY}%)`,
    };
  };

  const Board = () => {
    const rows = gameData.lobby.gameSettings.height;
    const columns = gameData.lobby.gameSettings.width;

    return (
      <div
        ref={boardRef}
        className="game-grid container-center"
        style={{
          display: "grid",
          gridTemplateRows: `repeat(${rows}, ${tileSize}px)`,
          gridTemplateColumns: `repeat(${columns}, ${tileSize}px)`,
          transform: `translate(${-tileSize / 2}px, ${tileSize}px)`, // Offset 1 cell down and half a cell left
        }}
      >
        {gameData.groundLayer.map((row, rowIndex) =>
          row.map((tileIndex, colIndex) => {
            const { clipPath, transform } =
              getTileClipPathAndPosition(tileIndex);

            return (
              <img
                className="tile pixel-art"
                key={`${rowIndex}-${colIndex}`}
                src={tileset}
                alt={`Tile ${tileIndex}`}
                style={{
                  clipPath: clipPath,
                  transform: transform,
                }}
              />
            );
          })
        )}
      </div>
    );
  };

  const EntityLayer = () => {
    const rows = gameData.lobby.gameSettings.height;
    const columns = gameData.lobby.gameSettings.width;

    return (
      <div
        className="game-grid container-center"
        style={{
          display: "grid",
          gridTemplateRows: `repeat(${rows}, ${tileSize}px)`,
          gridTemplateColumns: `repeat(${columns}, ${tileSize}px)`,
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        {/* {gameData.entityLayer.map((row, rowIndex) =>
          row.map((entity, colIndex) => {
            const entitySprite = getEntitySprite(entity);

            return (
              <img
                className="entity pixel-art"
                key={`${rowIndex}-${colIndex}`}
                src={entitySprite || ""}
                alt={`Entity ${entity}`}
                style={{
                  width: tileSize,
                  height: tileSize,
                }}
              />
            );
          })
        )} */}
      </div>
    );
  };

  const player1 = gameData.lobby.player1;
  const player2 = gameData.lobby.player2;
  const player1Score = gameData.player1Score;
  const player2Score = gameData.player2Score;

  return (
    <div className="container-center">
      <div className="game-info">
        {player1 ? (
          <div className="game-player-info left">
            <p>{player1.username}</p>
            <p>Score: {player1Score || 0}</p>
          </div>
        ) : (
          <div className="empty"></div>
        )}

        <div className="game-timer">
          <p>00:00</p>
          <p>0</p>
        </div>

        {player2 ? (
          <div className="game-player-info right">
            <p>{player2.username}</p>
            <p>Score: {player2Score || 0}</p>
          </div>
        ) : (
          <div className="empty"></div>
        )}
      </div>
      <div className="game-board">
        <Board />
        {/* <EntityLayer /> */}
      </div>
      <div className="game-ability container-center">
        <img
          src={headTailSwap}
          alt="Ability Icon"
          className="game-ability-button pixel-art"
        />
      </div>
      <div className="game-buttons container-center">
        <button
          className="button-default button-height-less button-width-less"
          onClick={handleLeave}
        >
          Leave
        </button>
      </div>
    </div>
  );
}
