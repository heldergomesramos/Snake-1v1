import React, { useState, useContext, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { PlayerContext } from "../context/PlayerContext";
import { useSignalR } from "../context/SignalRContext";

import {
  WINS_ICON,
  LOSSES_ICON,
  MAPS,
  SNAKE_SPRITES,
  COLORS,
  SERVER_BASE_URL,
} from "../constants";

import copyIcon from "../assets/images/Copy.png";
import {
  handleMouseClick,
  handleMouseEnter,
  handleError,
  handleInputChange,
} from "../functions";

import AbilityColorMenu from "../components/AbilityColorMenu.jsx";

export default function CreatePrivateLobby() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { playerData, setPlayerDataFields } = useContext(PlayerContext);
  const { connection } = useSignalR();

  const location = useLocation();
  const initialLobby = location.state?.lobby.lobby;
  const [lobby, setLobby] = useState(initialLobby);
  const [mapSettings, setMapSettings] = useState(lobby.gameSettings);
  const [tempMapSettings, setTempMapSettings] = useState(mapSettings);
  const [isPlayer1, setIsPlayer1] = useState(
    initialLobby.player1.playerId === playerData.playerId
  );
  const [copyMessageVisible, setCopyMessageVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const prevInputValueRefs = useRef({});

  const handleCopy = () => {
    if (copyMessageVisible) return;
    navigator.clipboard.writeText(lobby.code);

    setFadeOut(false);
    setCopyMessageVisible(true);

    setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setCopyMessageVisible(false);
      }, 500);
    }, 1000);
  };

  useEffect(() => {
    setIsPlayer1(
      lobby.player1 != null && lobby.player1.playerId === playerData.playerId
    );
  }, [lobby]);

  useEffect(() => {
    for (const key in tempMapSettings) {
      if (tempMapSettings.hasOwnProperty(key)) {
        prevInputValueRefs.current[key] = tempMapSettings[key] || "";
      }
    }
  }, [tempMapSettings]);

  useEffect(() => {
    if (connection) {
      connection.on("LobbyUpdated", (updatedLobbyData) => {
        if (
          updatedLobbyData.player1 != null &&
          updatedLobbyData.player1.playerId === playerData.playerId
        )
          setPlayerDataFields(updatedLobbyData.player1);
        else if (updatedLobbyData.player2 != null)
          setPlayerDataFields(updatedLobbyData.player2);
        setLobby(updatedLobbyData);
        setMapSettings(updatedLobbyData.gameSettings);
        setTempMapSettings(updatedLobbyData.gameSettings);
      });

      connection.on("StartGame", (gameData) => {
        navigate("/game", { state: { gameData } });
      });
    }
  }, [connection]);

  const handleSettingChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const updatedSettings = {
        ...tempMapSettings,
        [name]: checked,
      };

      setMapSettings(updatedSettings);
      handleMouseClick();
      if (connection) {
        connection
          .invoke("UpdatePrivateLobbySettings", updatedSettings)
          .catch(() => {});
      }
    } else {
      if (!prevInputValueRefs.current[name]) {
        prevInputValueRefs.current[name] = "";
      }

      handleInputChange(
        e,
        (newValue) => {
          setTempMapSettings({
            ...tempMapSettings,
            [name]: newValue,
          });
        },
        { current: prevInputValueRefs.current[name] }
      );

      prevInputValueRefs.current[name] = value;
    }
  };

  const handleSettingBlur = () => {
    setMapSettings(tempMapSettings);
    if (connection) {
      connection
        .invoke("UpdatePrivateLobbySettings", tempMapSettings)
        .catch(() => {});
    }
  };

  const handleMapNavigation = (direction) => {
    handleMouseClick();
    const currentIndex = mapSettings.map;
    const newIndex = direction === "left" ? currentIndex - 1 : currentIndex + 1;

    const updatedSettings = {
      ...mapSettings,
      map: newIndex,
    };

    if (connection) {
      connection
        .invoke("UpdatePrivateLobbySettings", updatedSettings)
        .catch(() => {});
    }
  };

  const handleLeave = async (e) => {
    e.preventDefault();
    setError("");
    handleMouseClick();

    try {
      const response = await fetch(
        `${SERVER_BASE_URL}/api/lobby/leave-private-lobby`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ playerId: playerData.playerId }),
        }
      );

      if (response.ok) navigate("/main-menu");
      else
        handleError(setError, "An unexpected error occurred, please try again");
    } catch (err) {
      handleError(setError, "Failed to connect to the server");
    }
  };

  const handleStart = async (e) => {
    handleMouseClick();
    if (connection) {
      connection.invoke("StartGame").catch(() => {});
    }
  };

  const PlayerInfo = ({ player, playerNumber }) => {
    return (
      <>
        <div className="cpl-player-info border-gradient-normal">
          {player == null ? (
            <div style={{ position: "relative" }}>
              <div>
                <p className="cpl-player-name gradient-text">Invite</p>
              </div>
              <div className="cpl-code-container">
                <p className="text-color-weaker">Code: </p>
                <p>{lobby.code}</p>
                <img
                  src={copyIcon}
                  alt="Copy code"
                  className="pixel-art cpl-copy-icon"
                  onClick={handleCopy}
                  style={{ cursor: "pointer" }}
                />
              </div>
              {copyMessageVisible && (
                <p className={`copy-message ${fadeOut ? "fade-out" : ""}`}>
                  Copied to clipboard!
                </p>
              )}
            </div>
          ) : (
            <div className="cpl-player-info">
              <div>
                <p
                  className="cpl-player-name gradient-text-dynamic"
                  style={{
                    "--player-color": COLORS[player.color],
                  }}
                >
                  {player.username}
                </p>
              </div>
              <div className="cpl-player-info-snake-container container-center ">
                <img
                  src={SNAKE_SPRITES[player.color]}
                  alt="Player Snake"
                  className={`cpl-player-info-snake-image cpl-player-info-snake-image-${playerNumber} pixel-art`}
                />
              </div>
              <div className="cpl-player-stats">
                <div className="cpl-player-stats-group">
                  <img
                    src={WINS_ICON}
                    alt="Wins"
                    className="pixel-art cpl-player-stats-icon"
                  />
                  <p className="text-color-green">{player.wins}</p>
                </div>
                <div className="cpl-player-stats-group">
                  <img
                    src={LOSSES_ICON}
                    alt="Losses"
                    className="pixel-art cpl-player-stats-icon"
                  />
                  <p className="text-color-red">{player.losses}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  };
  return (
    <div className="cpl-container">
      <div className="cpl-top-section-container border-gradient-normal">
        <div className="cpl-top-section cpl-top-section-1">
          <PlayerInfo player={lobby.player1} playerNumber={1} />
          <img
            className="pixel-art cpl-map-preview-image border-gradient-normal"
            src={MAPS[mapSettings.map].img}
            alt="Map Image"
          />
          <PlayerInfo player={lobby.player2} playerNumber={2} />
        </div>
        <div className="cpl-top-section cpl-top-section-2">
          <div>
            {isPlayer1 && (
              <AbilityColorMenu
                connection={connection}
                playerData={playerData}
                invokeMethod={"UpdatePlayerInPrivateLobby"}
              />
            )}
          </div>
          <div className="cpl-map-preview-container">
            <div className="cpl-map-navigation-container">
              <button
                className="button-default button-square"
                onClick={() => handleMapNavigation("left")}
                onMouseEnter={handleMouseEnter}
              >
                &lt;
              </button>
              <p className="cpl-map-name gradient-text">
                {MAPS[mapSettings.map].name}
              </p>
              <button
                className="button-default button-square"
                onClick={() => handleMapNavigation("right")}
                onMouseEnter={handleMouseEnter}
              >
                &gt;
              </button>
            </div>
          </div>
          <div>
            {!isPlayer1 && (
              <AbilityColorMenu
                connection={connection}
                playerData={playerData}
                invokeMethod={"UpdatePlayerInPrivateLobby"}
              />
            )}
          </div>
        </div>
      </div>
      <div className="cpl-map-settings border-gradient-normal">
        <div className="cpl-setting-container">
          <p className="cpl-label">Height</p>
          <input
            className="cpl-input"
            type="number"
            name="height"
            value={tempMapSettings.height}
            onChange={handleSettingChange}
            onBlur={handleSettingBlur}
          />
        </div>
        <div className="cpl-setting-container">
          <p className="cpl-label">Time (s)</p>
          <input
            className="cpl-input"
            type="number"
            name="time"
            value={tempMapSettings.time}
            onChange={handleSettingChange}
            onBlur={handleSettingBlur}
          />
        </div>
        <div className="cpl-setting-container">
          <p className="cpl-label">Borders</p>
          <div className="checkbox_wrapper">
            <input
              type="checkbox"
              name="borders"
              checked={tempMapSettings.borders}
              onChange={handleSettingChange}
            />
            <label></label>
          </div>
        </div>
        <div className="cpl-setting-container">
          <p className="cpl-label">Width</p>
          <input
            className="cpl-input"
            type="number"
            name="width"
            value={tempMapSettings.width}
            onChange={handleSettingChange}
            onBlur={handleSettingBlur}
          />
        </div>
        <div className="cpl-setting-container">
          <p className="cpl-label">Speed</p>
          <input
            className="cpl-input"
            type="number"
            name="speed"
            value={tempMapSettings.speed}
            onChange={handleSettingChange}
            onBlur={handleSettingBlur}
          />
        </div>
        <div className="cpl-setting-container">
          <p className="cpl-label">Abilities</p>
          <div className="checkbox_wrapper">
            <input
              type="checkbox"
              name="abilities"
              checked={tempMapSettings.abilities}
              onChange={handleSettingChange}
            />
            <label></label>
          </div>
        </div>
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
          onClick={handleStart}
          onMouseEnter={handleMouseEnter}
        >
          Start
        </button>
      </div>
      <div className="container-center">
        {error && <p className="error-text">{error}</p>}
      </div>
    </div>
  );
}
