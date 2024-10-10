import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";
import { useSignalR } from "../context/SignalRContext";
import { COLORS, SNAKE_SPRITES, WINS_ICON, LOSSES_ICON } from "../constants";
import { handleMouseClick, handleMouseEnter } from "../functions";
import AbilityColorMenu from "../components/AbilityColorMenu";

export default function PublicQueue() {
  const navigate = useNavigate();
  const [error] = useState("");
  const [phase, setPhase] = useState(0);
  const { playerData, setPlayerDataFields } = useContext(PlayerContext);
  const { connection } = useSignalR();

  useEffect(() => {
    if (connection) {
      connection.on("PlayerUpdated", (newPlayerData) => {
        setPlayerDataFields(newPlayerData);
      });

      connection.on("StartGame", (gameData) => {
        navigate("/game", { state: { gameData } });
      });
    }
  }, [connection]);

  const handleLeave = async (e) => {
    handleMouseClick();
    navigate("/main-menu");
  };

  const handleFind = async (e) => {
    handleMouseClick();
    setPhase(1);
    if (connection) {
      connection.invoke("JoinPublicLobby").catch(() => {});
    }
  };

  const handleStop = async (e) => {
    handleMouseClick();
    if (connection) {
      setPhase(0);
      connection.invoke("StopQueue").catch(() => {});
    }
  };

  const PlayerInfo = () => {
    return (
      <div className="cpl-player-info border-gradient-normal">
        <div className="player-info">
          <div>
            <p
              className="cpl-player-name gradient-text-dynamic"
              style={{
                "--player-color": COLORS[playerData.color],
              }}
            >
              {playerData.username}
            </p>
          </div>
          <div className="container-center">
            <img
              src={SNAKE_SPRITES[playerData.color]}
              alt="Player Snake"
              className={`cpl-player-info-snake-image cpl-player-info-snake-image-1 pixel-art`}
            />
          </div>
          <div className="cpl-player-stats">
            <div className="cpl-player-stats-group">
              <img
                src={WINS_ICON}
                alt="Wins"
                className="pixel-art cpl-player-stats-icon"
              />
              <p className="text-color-green">{playerData.wins}</p>
            </div>
            <div className="cpl-player-stats-group">
              <img
                src={LOSSES_ICON}
                alt="Losses"
                className="pixel-art cpl-player-stats-icon"
              />
              <p className="text-color-red">{playerData.losses}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DuringQueue = () => {
    return (
      <div className="container-center">
        <p className="title gradient-text title-section">
          Looking for an opponent...
        </p>
        <button
          className="button-default button-height-less"
          onClick={handleStop}
          onMouseEnter={handleMouseEnter}
        >
          Stop
        </button>
      </div>
    );
  };

  return (
    <div className="container-center">
      {/* Did not refactor into BeforeQueue due to it creating a bug with the AbilityColorMenu component */}
      {phase === 0 && (
        <div className="container-center">
          <div className="pq-player-info">
            <PlayerInfo />
          </div>
          <div className="pq-player-buttons">
            <AbilityColorMenu
              connection={connection}
              playerData={playerData}
              invokeMethod={"UpdatePlayer"}
            />
          </div>
          <div className="buttons-login-container container-center">
            <button
              className="button-default button-height-less"
              onClick={handleLeave}
              onMouseEnter={handleMouseEnter}
            >
              Leave
            </button>
            <button
              className="button-default button-height-less"
              onClick={handleFind}
              onMouseEnter={handleMouseEnter}
            >
              Find Game
            </button>
            <div className="container-center">
              {error && <p className="error-text">{error}</p>}
            </div>
          </div>
        </div>
      )}
      {phase === 1 && <DuringQueue />}
    </div>
  );
}
