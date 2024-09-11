import React, { useEffect, useState, useRef, useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { useSignalR } from "../context/SignalRContext";
import { useLocation, useNavigate } from "react-router-dom";
import headTailSwap from "../assets/images/AbilityIcons-HeadTailSwap.png";
import tileset from "../assets/images/Maps-Plains.png";

export default function Game() {
  const navigate = useNavigate();
  const { connection } = useSignalR();
  const { playerData, setPlayerData } = useContext(PlayerContext);
  const location = useLocation();
  const initialGameData = location.state?.gameData;
  const [gameData, setGameData] = useState(initialGameData);
  const boardRef = useRef(null);
  const [tileSize, setTileSize] = useState(16); // Dynamically calculated tile size

  const TILESET_COLUMNS = 4; // Number of columns in the tileset (64px / 16px = 4)
  const TILESET_TILE_SIZE = 16; // Size of each tile in the tileset (16x16 px)
  const TILESET_SIZE = 64; // Size of each tile in the tileset (16x16 px)

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

  const getTileOffset = (tileIndex) => {
    const TILE_SIZE = 16; // Tile size in pixels

    const row = Math.floor(tileIndex / TILESET_COLUMNS);
    const col = tileIndex % TILESET_COLUMNS;

    return {
      backgroundPositionX: -col * TILE_SIZE,
      backgroundPositionY: -row * TILE_SIZE,
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
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
        }}
      >
        {gameData.groundLayer.map((row, rowIndex) =>
          row.map((tileIndex, colIndex) => {
            const { backgroundPositionX, backgroundPositionY } =
              getTileOffset(tileIndex);

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="tile"
                style={{
                  width: `100%`,
                  height: `100%`,
                  backgroundImage: `url(${tileset})`,
                  backgroundPosition: `${backgroundPositionX}px ${backgroundPositionY}px`,
                }}
              />
            );
          })
        )}
      </div>
    );
  };

  return (
    <div className="container-center">
      <div className="game-info">
        <div className="game-player-info">
          <p>Pofinho</p>
          <p>Score: 1440</p>
        </div>
        <div className="game-timer">
          <p>00:45</p>
          <p>354</p>
        </div>
        <div className="game-player-info">
          <p>Pofinho</p>
          <p>Score: 1440</p>
        </div>
      </div>
      <div className="game-board container-center">
        <Board />
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
