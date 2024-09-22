import React, { useEffect, useState, useRef, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { PlayerContext } from "../context/PlayerContext";
import { useSignalR } from "../context/SignalRContext";
import { COLORS } from "../constants";

import headTailSwap from "../assets/images/AbilityIcons-HeadTailSwap.png";
import freezeTime from "../assets/images/AbilityIcons-FreezeTime.png";
import ghost from "../assets/images/AbilityIcons-Ghost.png";

import tileset from "../assets/images/Maps-Plains.png";
import redSnake from "../assets/images/Snake-red.png";
import orangeSnake from "../assets/images/Snake-orange.png";
import yellowSnake from "../assets/images/Snake-yellow.png";
import greenSnake from "../assets/images/Snake-green.png";
import lightBlueSnake from "../assets/images/Snake-blue-light.png";
import darkBlueSnake from "../assets/images/Snake-blue-dark.png";
import purpleSnake from "../assets/images/Snake-purple.png";
import pinkSnake from "../assets/images/Snake-pink.png";
import frozenSnake from "../assets/images/Snake-frozen.png";
import miscSprite from "../assets/images/Misc.png";

import { formatTime } from "../functions";
import GameEndOverlay from "../pages/GameEndOverlay";

export default function Game() {
  const navigate = useNavigate();
  const { playerData, setPlayerData } = useContext(PlayerContext);
  const { connection } = useSignalR();
  const location = useLocation();
  const initialGameData = location.state?.gameData;
  const [gameData, setGameData] = useState(initialGameData);
  const boardRef = useRef(null);
  const [tileSize, setTileSize] = useState(16); // Dynamically calculated tile size
  const [rematchState, setRematchState] = useState("normal");

  const miscTilset = miscSprite;
  const TILE_SIZE_PERCENT = 25;
  const HALF_TILE_SIZE_PERCENT = 12.5;

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

  const abilities = [headTailSwap, freezeTime, ghost];

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
      connection.on("UpdateGameState", (gameState) => {
        console.log(`Received Game State: ${JSON.stringify(gameState)}`);
        setGameData(gameState);
        setRematchState("normal");
      });
      connection.on("LeaveGame", () => {
        console.log("Leave Game");
        navigate("/main-menu");
      });
      connection.on("RematchResponse", (response) => {
        console.log("Rematch Response: " + JSON.stringify(response));
        setRematchState(response);
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

  const handleRematch = async (e) => {
    e.preventDefault();
    if (connection) {
      connection
        .invoke("AskRematch", playerData.playerId, gameData.gameId)
        .catch((err) => console.error(err));
    }
  };

  const handlePlayAgain = async (e) => {
    e.preventDefault();
    if (connection) {
      connection
        .invoke("PlayAgain", playerData.playerId, gameData.gameId)
        .catch((err) => console.error(err));
    }
  };

  const handleAbility = async (e) => {
    e.preventDefault();
    if (connection) {
      connection
        .invoke("ActivateAbility", playerData.playerId, gameData.gameId)
        .catch((err) => console.error("Error activating ability:", err));
    }
  };

  const handleKeyPress = (event) => {
    let direction = null;

    switch (event.key) {
      case "w":
      case "ArrowUp":
        direction = "u";
        break;
      case "a":
      case "ArrowLeft":
        direction = "l";
        break;
      case "s":
      case "ArrowDown":
        direction = "d";
        break;
      case "d":
      case "ArrowRight":
        direction = "r";
        break;
      case " ": // Detect Space Bar (space character)
        if (connection) {
          connection
            .invoke("ActivateAbility", playerData.playerId, gameData.gameId)
            .catch((err) => console.error("Error activating ability:", err));
        }
        return;
      default:
        return;
    }

    if (direction && connection) {
      connection
        .invoke(
          "UpdateDirectionCommand",
          playerData.playerId,
          gameData.gameId,
          direction
        )
        .catch((err) => console.error("Error sending direction command:", err));
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [connection, gameData]);

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

  const ConvertFinishedStateToText = (finishedState) => {
    switch (finishedState) {
      case "Player1Disconnected":
        return `${gameData.lobby.player1.username} disconnected`;
      case "Player2Disconnected":
        return `${gameData.lobby.player2.username} disconnected`;
      case "Player1WonByTimeOut":
      case "Player2WonByTimeOut":
        return "Time out!";
      case "Player1WonByCollision":
      case "Player2WonByCollision":
        return "Snake collision!";
      case "DrawByTimeOut":
        return "Time out!";
      case "DrawByCollision":
        return "Snake collision!";
      case "SinglePlayerTimeOut":
        return "Time out!";
      case "SinglePlayerCollision":
        return "Snake collision!";
      default:
        return "";
    }
  };

  const ConvertFinishedStateToResult = (finishedState) => {
    if (gameData.isSinglePlayer) {
      return "";
    }

    switch (finishedState) {
      case "Player2Disconnected":
      case "Player1WonByTimeOut":
      case "Player1WonByCollision":
        return playerData.playerId === gameData.lobby.player1.playerId
          ? "win"
          : "lose";
      case "Player1Disconnected":
      case "Player2WonByTimeOut":
      case "Player2WonByCollision":
        return playerData.playerId === gameData.lobby.player2.playerId
          ? "win"
          : "lose";
      case "DrawByTimeOut":
      case "DrawByCollision":
        return "draw";
      default:
        return "";
    }
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

  const EntityLayer = () => {
    const rows = gameData.lobby.gameSettings.height;
    const columns = gameData.lobby.gameSettings.width;
    const player1 = gameData.lobby.player1;
    const player2 = gameData.lobby.player2;
    const player1SnakeSprite =
      player1 == null ? null : snakeTilesets[player1.color];
    const player2SnakeSprite =
      player2 == null ? null : snakeTilesets[player2.color];

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
          transform: `translate(${-tileSize / 2}px, ${tileSize}px)`,
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

  const FrozenLayer = () => {
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
          transform: `translate(${-tileSize / 2}px, ${tileSize}px)`,
          zIndex: 2,
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
            <p
              className="cpl-player-name gradient-text-dynamic"
              style={{
                "--player-color": COLORS[player1.color],
              }}
            >
              {player1.username}
            </p>
            <p>Score: {player1Score || 0}</p>
          </div>
        ) : (
          <div className="empty"></div>
        )}

        <div className="game-timer">
          {gameData.time === 0 ? (
            <p>GO!</p>
          ) : gameData.gameTick === 0 ? (
            <p>{gameData.time}</p>
          ) : (
            <>
              <p>{formatTime(gameData.time)}</p>
              <p>{gameData.gameTick}</p>
            </>
          )}
        </div>

        {player2 ? (
          <div className="game-player-info right">
            <p
              className="cpl-player-name gradient-text-dynamic"
              style={{
                "--player-color": COLORS[player2.color],
              }}
            >
              {player2.username}
            </p>
            <p>Score: {player2Score || 0}</p>
          </div>
        ) : (
          <div className="empty"></div>
        )}
      </div>
      <div className="game-board">
        <Board />
        <EntityLayer />
        <FrozenLayer />
      </div>
      <div className="game-ability container-center">
        <div className="game-ability-button">
          <img
            src={abilities[playerData.ability]}
            alt="Ability Icon"
            className="game-ability-button-image pixel-art"
            onClick={handleAbility}
          />
          {gameData.lobby.player1.playerId === playerData.playerId &&
            gameData.player1Cooldown > 0 && (
              <div className="game-ability-button-cooldown-overlay">
                {String(gameData.player1Cooldown).padStart(2, "0")}
              </div>
            )}
          {gameData.lobby.player2.playerId === playerData.playerId &&
            gameData.player2Cooldown > 0 && (
              <div className="game-ability-button-cooldown-overlay">
                {String(gameData.player2Cooldown).padStart(2, "0")}
              </div>
            )}
        </div>
      </div>
      <div className="game-buttons container-center">
        <button
          className="button-default button-height-less button-width-less"
          onClick={handleLeave}
        >
          Leave
        </button>
      </div>
      {gameData.finishedState != "NotFinished" && (
        <GameEndOverlay
          cause={ConvertFinishedStateToText(gameData.finishedState)}
          result={ConvertFinishedStateToResult(gameData.finishedState)}
          yourScore={
            playerData.playerId === gameData.lobby.player1.playerId
              ? gameData.player1Score
              : gameData.player2Score
          }
          opponentName={
            gameData.isSinglePlayer
              ? ""
              : playerData.playerId === gameData.lobby.player1.playerId
              ? gameData.lobby.player2.username
              : gameData.lobby.player1.username
          }
          opponentScore={
            gameData.isSinglePlayer
              ? null
              : playerData.playerId === gameData.lobby.player1.playerId
              ? gameData.player2Score
              : gameData.player1Score
          }
          time={formatTime(gameData.time)}
          moves={gameData.gameTick}
          optionalMessage=""
          onLeave={handleLeave}
          onRematch={handleRematch}
          rematchState={rematchState}
          isSinglePlayer={gameData.isSinglePlayer}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </div>
  );
}
