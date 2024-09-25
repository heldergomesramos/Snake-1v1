import React, { useState, useContext, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";
import { useSignalR } from "../context/SignalRContext";
import { COLORS, ABILITIES } from "../constants";
import { SNAKE_SPRITES } from "../constants";

import { WINS_ICON } from "../constants";
import { LOSSES_ICON } from "../constants";
import { COLORS_ICON } from "../constants";
import { ABILITIES_ICON } from "../constants";

export default function PublicQueue() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [phase, setPhase] = useState(0);
  const { playerData, setPlayerData } = useContext(PlayerContext);
  const { connection } = useSignalR();

  useEffect(() => {
    if (connection) {
      connection.on("PlayerUpdated", (color, ability) => {
        console.log("Player Updated: " + color + " , " + ability);
        setPlayerData((prevPlayerData) => ({
          ...prevPlayerData,
          color: color,
          ability: ability,
        }));
      });

      connection.on("StartGame", (gameData) => {
        console.log("Start Game");
        navigate("/game", { state: { gameData } });
      });
    }
  }, [connection]);

  const handleLeave = async (e) => {
    navigate("/main-menu");
  };

  const handleFind = async (e) => {
    setPhase(1);
    // if (connection) {
    //   connection
    //     .invoke("StartGame", lobby.lobbyId)
    //     .catch((err) => console.error(err));
    // }
  };

  const handleStop = async (e) => {
    // if (connection) {
    //   connection
    //     .invoke("StartGame", lobby.lobbyId)
    //     .catch((err) => console.error(err));
    // }
  };

  /* Color Stuff */
  const [isColorMenuOpen, setIsColorMenuOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const colorMenuRef = useRef(null);

  const toggleColorMenu = () => {
    if (!isColorMenuOpen) {
      setIsColorMenuOpen(true);
    }
  };

  const handleColorSelect = (color) => {
    const colorIndex = COLORS.indexOf(color);
    setSelectedColor(color);
    if (connection) {
      connection
        .invoke("UpdatePlayer", colorIndex, playerData.ability)
        .catch((err) => console.error(err));
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        colorMenuRef.current &&
        !colorMenuRef.current.contains(event.target)
      ) {
        setIsColorMenuOpen(false);
      }
    };

    if (isColorMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isColorMenuOpen]);

  /* Ability Stuff */
  const [isAbilityMenuOpen, setIsAbilityMenuOpen] = useState(false);
  const [selectedAbility, setSelectedAbility] = useState(playerData.ability);
  const abilityMenuRef = useRef(null);

  const toggleAbilityMenu = () => {
    setIsAbilityMenuOpen(!isAbilityMenuOpen);
  };

  const handleAbilitySelect = (ability) => {
    setSelectedAbility(ability);
    if (connection) {
      connection
        .invoke("UpdatePlayer", playerData.color, ability.id)
        .catch((err) => console.error(err));
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        abilityMenuRef.current &&
        !abilityMenuRef.current.contains(event.target)
      ) {
        setIsAbilityMenuOpen(false);
      }
    };

    if (isAbilityMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAbilityMenuOpen]);

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

  const PlayerButtons = () => {
    return (
      <div className="container-center cpl-player-buttons-container">
        <div className="cpl-player-pallete-container">
          <img
            src={COLORS_ICON}
            alt="Palette"
            className="pixel-art cpl-player-button"
            onClick={() => {
              if (!isColorMenuOpen) {
                toggleColorMenu();
              }
            }}
            style={{
              cursor: "pointer",
              pointerEvents: isColorMenuOpen ? "none" : "auto",
            }}
          />
          {/* Conditional rendering of color menu */}
          {isColorMenuOpen && (
            <div className="color-menu-container" ref={colorMenuRef}>
              <div className="color-menu">
                {COLORS.map((color) => (
                  <label
                    key={color}
                    className="color-button"
                    style={{ backgroundColor: color }}
                  >
                    <input
                      type="radio"
                      name="color"
                      value={color}
                      checked={selectedColor === color}
                      onChange={() => handleColorSelect(color)}
                      style={{ display: "none" }}
                    />
                    {selectedColor === color && (
                      <div className="color-selected-indicator" />
                    )}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Ability Button */}
        <div className="cpl-player-pallete-container">
          <img
            src={ABILITIES_ICON}
            alt="Powerup"
            className="pixel-art cpl-player-button"
            onClick={toggleAbilityMenu}
            style={{
              cursor: "pointer",
              pointerEvents: isAbilityMenuOpen ? "none" : "auto",
            }}
          />
          {isAbilityMenuOpen && (
            <div className="color-menu-container" ref={abilityMenuRef}>
              <div className="ability-menu">
                {ABILITIES.map((ability) => (
                  <div className="ability-container" key={ability.id}>
                    <label
                      style={{
                        backgroundImage: `url(${ability.img})`,
                      }}
                      className="ability-button pixel-art"
                    >
                      <input
                        type="radio"
                        name="ability"
                        value={ability.id}
                        checked={playerData.ability === ability.id}
                        onChange={() => handleAbilitySelect(ability)}
                        style={{ display: "none" }}
                      />
                      {playerData.ability === ability.id && (
                        <div className="ability-selected-indicator" />
                      )}
                    </label>
                    <div className="tooltip border-gradient-normal">
                      <p className="tooltip-name">{ability.name}</p>
                      <p className="tooltip-description">
                        {ability.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const BeforeQueue = () => {
    return (
      <div className="container-center">
        <div className="pq-player-info">
          <PlayerInfo />
        </div>
        <div className="pq-player-buttons">
          <PlayerButtons />
        </div>
        <div className="buttons-login-container container-center">
          <button
            className="button-default button-height-less"
            onClick={handleLeave}
          >
            Leave
          </button>
          <button
            className="button-default button-height-less"
            onClick={handleFind}
          >
            Find Game
          </button>
          <div className="container-center">
            {error && <p className="error-text">{error}</p>}
          </div>
        </div>
      </div>
    );
  };

  const DuringQueue = () => {
    return (
      <div className="container-center">
        <p className="title gradient-text title-section">
          {loading
            ? "Looking for an opponent..."
            : lobby
            ? `Lobby ID: ${lobby.lobbyId}`
            : "???"}
        </p>
        <button
          className="button-default button-height-less"
          onClick={handleStop}
        >
          Stop
        </button>
      </div>
    );
  };

  return (
    <div className="container-center">
      {phase === 0 && <BeforeQueue />}
      {phase === 1 && <DuringQueue />}
    </div>
  );
}
