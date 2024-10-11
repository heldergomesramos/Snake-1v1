import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { PlayerContext } from "../context/PlayerContext";
import { useSignalR } from "../context/SignalRContext";

import { GroundLayer } from "../components/GroundLayer.jsx";
import { SpecialGroundLayer } from "../components/SpecialGroundLayer.jsx";
import { EntityLayer } from "../components/EntityLayer.jsx";
import { FrozenLayer } from "../components/FrozenLayer.jsx";
import { BorderLayer } from "../components/BorderLayer.jsx";

import { ABILITIES, COLORS } from "../constants";

import { formatTime, handleMouseClick, handleMouseEnter } from "../functions";
import GameEndOverlay from "../pages/GameEndOverlay";
import audioManager from "../services/AudioManager";

export default function Game() {
  const navigate = useNavigate();
  const { playerData } = useContext(PlayerContext);
  const { connection } = useSignalR();
  const location = useLocation();
  const initialGameData = location.state?.gameData;
  const [gameData, setGameData] = useState(initialGameData);
  const [tileSize, setTileSize] = useState(16);
  const [rematchState, setRematchState] = useState("normal");
  const [ping, setPing] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);

  const TILE_SIZE_PERCENT = 25;
  const TILESET_COLUMNS = 4;

  const player1 = gameData.lobby.player1;
  const player2 = gameData.lobby.player2;
  const player1Score = gameData.player1Score;
  const player2Score = gameData.player2Score;
  const ability = ABILITIES[playerData.ability];

  let pingStart = null;

  useEffect(() => {
    audioManager.playTimerSound();
  }, []);

  useEffect(() => {
    if (connection) {
      connection.off("UpdateGameState");
      connection.off("FoodEaten");
      connection.off("AbilitySfx");
      connection.off("LeaveGame");
      connection.off("RematchResponse");
      connection.off("Pong");

      connection.on("UpdateGameState", (gameState) => {
        setGameData(gameState);
        setRematchState("normal");
        if (gameState.gameState === "Waiting") {
          if (gameState.time > 0) audioManager.playTimerSound();
          else {
            audioManager.playGoSound();
            audioManager.playMusic();
          }
        } else if (gameState.gameState === "Finished") {
          if (gameState.finishedState.includes("TimeOut"))
            audioManager.playTimeOutSound();
          else if (gameState.finishedState.includes("Collision"))
            audioManager.playCollisionSound();
          audioManager.stopMusic();
        }
      });
      connection.on("FoodEaten", () => {
        audioManager.playEatSound();
      });

      connection.on("AbilitySfx", (ability) => {
        if (ability == 1) audioManager.playSwapSound();
        else if (ability == 2) audioManager.playFreezeSound();
        else if (ability == 3) audioManager.playCutTailSound();
      });
      connection.on("LeaveGame", () => {
        navigate("/main-menu");
        audioManager.stopMusic();
      });
      connection.on("RematchResponse", (response) => {
        setRematchState(response);
      });
      connection.on("Pong", () => {
        const now = Date.now();
        setPing(now - pingStart);
      });

      const pingInterval = setInterval(() => {
        if (connection) {
          pingStart = Date.now();
          connection.invoke("Ping");
        }
      }, 1000);
      return () => clearInterval(pingInterval);
    }
  }, [connection, navigate]);

  const handleAbilityMouseEnter = () => {
    setShowTooltip(true);
    handleMouseEnter();
  };

  const handleAbilityMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleLeave = async (e) => {
    e.preventDefault();
    handleMouseClick();
    if (connection) {
      connection.invoke("LeaveGame").catch(() => {});
    }
  };

  const handleRematch = async (e) => {
    e.preventDefault();
    handleMouseClick();
    if (connection) {
      connection.invoke("AskRematch").catch(() => {});
    }
  };

  const handlePlayAgain = async (e) => {
    e.preventDefault();
    handleMouseClick();
    if (connection) {
      connection.invoke("PlayAgain").catch(() => {});
    }
  };

  const handleAbility = async (e) => {
    if (!gameData.lobby.gameSettings.abilities) return;
    e.preventDefault();
    handleMouseClick();
    if (connection) {
      connection.invoke("ActivateAbility").catch(() => {});
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
      case " ":
        if (!gameData.lobby.gameSettings.abilities) return;
        if (connection) {
          connection.invoke("ActivateAbility").catch(() => {});
        }
        return;
      default:
        return;
    }

    if (direction && connection) {
      connection.invoke("UpdateDirectionCommand", direction).catch(() => {});
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [connection, gameData]);

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

  return (
    <div className="container-center">
      <div className="game-info">
        {player1 ? (
          <div className="game-player-info left">
            <p
              className="game-player-name gradient-text-dynamic"
              style={{
                "--player-color": COLORS[player1.color],
              }}
            >
              {player1.username}
            </p>
            <p className="game-player-name">Score: {player1Score || 0}</p>
          </div>
        ) : (
          <div className="empty"></div>
        )}

        <div className="game-timer">
          {gameData.time === 0 && gameData.gameTick == 0 ? (
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
              className="game-player-name gradient-text-dynamic"
              style={{
                "--player-color": COLORS[player2.color],
              }}
            >
              {player2.username}
            </p>
            <p className="game-player-name">Score: {player2Score || 0}</p>
          </div>
        ) : (
          <div className="empty"></div>
        )}
      </div>
      <div className="game-board">
        <GroundLayer
          gameData={gameData}
          tileSizePercent={TILE_SIZE_PERCENT}
          tileSize={tileSize}
          setTileSize={setTileSize}
          tilesetColumns={TILESET_COLUMNS}
        />
        <SpecialGroundLayer
          gameData={gameData}
          tileSizePercent={TILE_SIZE_PERCENT}
          tileSize={tileSize}
          tilesetColumns={TILESET_COLUMNS}
        />
        <EntityLayer
          gameData={gameData}
          tileSizePercent={TILE_SIZE_PERCENT}
          tileSize={tileSize}
          tilesetColumns={TILESET_COLUMNS}
        />
        <FrozenLayer
          gameData={gameData}
          tileSizePercent={TILE_SIZE_PERCENT}
          tileSize={tileSize}
          tilesetColumns={TILESET_COLUMNS}
        />
        <BorderLayer
          gameData={gameData}
          tileSizePercent={TILE_SIZE_PERCENT}
          tileSize={tileSize}
          tilesetColumns={TILESET_COLUMNS}
        />
      </div>
      <div className="game-ability container-center">
        {gameData.lobby.gameSettings.abilities && (
          <div className="game-ability-button">
            <img
              src={ability.img}
              alt="Ability Icon"
              className="game-ability-button-image pixel-art"
              onClick={handleAbility}
              onMouseEnter={handleAbilityMouseEnter}
              onMouseLeave={handleAbilityMouseLeave}
            />
            {/* Tooltip */}
            {showTooltip && (
              <div
                className="tooltip border-gradient-normal"
                style={{ display: "block" }}
              >
                <p className="tooltip-name">{ability.name}</p>
                <p className="tooltip-description">{ability.description}</p>
                <p className="tooltip-description">
                  Cooldown: {ability.cooldown}s
                </p>
                <p className="tooltip-description text-color-soft">
                  Press [Space] to use.
                </p>
              </div>
            )}
            {/* Cooldown overlay */}
            {gameData.lobby.player1 != null &&
              gameData.lobby.player1.playerId === playerData.playerId &&
              gameData.player1Cooldown > 0 && (
                <div className="game-ability-button-cooldown-overlay unselectable">
                  {String(gameData.player1Cooldown).padStart(2, "0")}
                </div>
              )}
            {gameData.lobby.player2 != null &&
              gameData.lobby.player2.playerId === playerData.playerId &&
              gameData.player2Cooldown > 0 && (
                <div className="game-ability-button-cooldown-overlay">
                  {String(gameData.player2Cooldown).padStart(2, "0")}
                </div>
              )}
          </div>
        )}
      </div>
      <div className="game-buttons container-center">
        <button
          className="button-default button-height-less button-width-less"
          onClick={handleLeave}
          onMouseEnter={handleMouseEnter}
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
      <p className="version">
        Ping: {ping !== null ? `${ping} ms` : "Calculating..."}
      </p>
    </div>
  );
}
