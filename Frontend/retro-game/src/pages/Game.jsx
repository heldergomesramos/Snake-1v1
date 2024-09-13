import React, { useEffect, useState, useRef, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";
import { useSignalR } from "../context/SignalRContext";
import headTailSwap from "../assets/images/AbilityIcons-HeadTailSwap.png";
import tileset from "../assets/images/Maps-Plains.png";
import redSnake from "../assets/images/Snake-red.png";
import orangeSnake from "../assets/images/Snake-orange.png";
import yellowSnake from "../assets/images/Snake-yellow.png";
import greenSnake from "../assets/images/Snake-green.png";
import lightBlueSnake from "../assets/images/Snake-blue-light.png";
import darkBlueSnake from "../assets/images/Snake-blue-dark.png";
import purpleSnake from "../assets/images/Snake-purple.png";
import pinkSnake from "../assets/images/Snake-pink.png";
import miscSprite from "../assets/images/Misc.png";

export default function Game() {
  const navigate = useNavigate();
  const { playerData, setPlayerData } = useContext(PlayerContext);
  const { connection } = useSignalR();
  const location = useLocation();
  const initialGameData = location.state?.gameData;
  const [gameData, setGameData] = useState(initialGameData);
  const boardRef = useRef(null);
  const [tileSize, setTileSize] = useState(16); // Dynamically calculated tile size

  const snakeTilesets = [
    redSnake,
    orangeSnake,
    yellowSnake,
    greenSnake,
    lightBlueSnake,
    darkBlueSnake,
    purpleSnake,
    pinkSnake,
  ];

  const miscTilset = miscSprite;

  console.log(JSON.stringify(initialGameData));

  const TILE_SIZE_PERCENT = 25;
  const HALF_TILE_SIZE_PERCENT = 12.5;

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
          transform: `translate(${-tileSize / 2}px, ${tileSize}px)`,
          zIndex: 0,
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
                  width: `${tileSize * 4.1}px`,
                  height: `${tileSize * 4.1}px`,
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
    const player1 = gameData.lobby.player1;
    const player2 = gameData.lobby.player2;
    const player1SnakeSprite =
      player1 == null ? null : snakeTilesets[player1.color];
    const player2SnakeSprite =
      player2 == null ? null : snakeTilesets[player2.color];

    console.log(player1SnakeSprite);
    console.log(player2SnakeSprite);

    const GetEntityData = (entity) => {
      let sprite = null;
      let topLeftX = 0;
      let topLeftY = 0;

      switch (entity) {
        case "empty":
          sprite = miscTilset;
          topLeftX = 3;
          topLeftY = 3;
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
          topLeftX = 0;
          topLeftY = 3;
          break;
        case "snake1-body-ld":
          sprite = player1SnakeSprite;
          topLeftX = 0;
          topLeftY = 2;
          break;
        case "snake1-body-ru":
          sprite = p;
          topLeftX = 1;
          topLeftY = 3 * TILE_SIZE_PERCENT;
          break;
        case "snake1-body-rd":
          sprite = player1SnakeSprite;
          topLeftX = 1;
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
        case "apple":
          sprite = miscTilset;
          topLeftX = 0;
          topLeftY = 0;
          break;
      }

      topLeftX = topLeftX * TILE_SIZE_PERCENT;
      topLeftY = topLeftY * TILE_SIZE_PERCENT;
      let bottomRightX = topLeftX + TILE_SIZE_PERCENT;
      let bottomRightY = topLeftY + TILE_SIZE_PERCENT;

      let translateX = HALF_TILE_SIZE_PERCENT - topLeftX;
      let translateY = HALF_TILE_SIZE_PERCENT - topLeftY;

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
          position: "absolute",
          top: `${tileSize / 2}px`,
          left: `${-tileSize / 2}px`,
          zIndex: 1,
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
                  width: `${tileSize * 4}px`,
                  height: `${tileSize * 4}px`,
                }}
              />
            );
          })
        )}
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
        <EntityLayer />
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
