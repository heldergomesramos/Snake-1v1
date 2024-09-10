import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { BASE_URL } from "../constants";
import { PlayerContext } from "../context/PlayerContext";
import { useSignalR } from "../context/SignalRContext";

import redSnake from "../assets/images/SnakeFull-red.png";
import orangeSnake from "../assets/images/SnakeFull-orange.png";
import yellowSnake from "../assets/images/SnakeFull-yellow.png";
import greenSnake from "../assets/images/SnakeFull-green.png";
import lightBlueSnake from "../assets/images/SnakeFull-blue-light.png";
import darkBlueSnake from "../assets/images/SnakeFull-blue-dark.png";
import purpleSnake from "../assets/images/SnakeFull-purple.png";
import pinkSnake from "../assets/images/SnakeFull-pink.png";

import headTailSwap from "../assets/images/AbilityIcons-HeadTailSwap.png";
import freezeTime from "../assets/images/AbilityIcons-FreezeTime.png";
import ghost from "../assets/images/AbilityIcons-Ghost.png";

import mapPlains from "../assets/images/Maps-Plains.png";
import mapJungle from "../assets/images/Maps-Jungle.png";

import trophy from "../assets/images/Trophy.png";
import skull from "../assets/images/Skull.png";
import palette from "../assets/images/PaletteIcon.png";
import powerup from "../assets/images/AbilityIcon.png";

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
  const [isPlayer1] = useState(
    initialLobby.player1.playerId == playerData.playerId
  );

  const GetSnakeSprite = {
    0: redSnake,
    1: orangeSnake,
    2: yellowSnake,
    3: greenSnake,
    4: lightBlueSnake,
    5: darkBlueSnake,
    6: purpleSnake,
    7: pinkSnake,
  };

  useEffect(() => {
    if (connection) {
      connection.on("LobbyUpdated", (updatedLobbyData) => {
        console.log("Lobby Updated:", updatedLobbyData);
        if (isPlayer1) setPlayerDataFields(updatedLobbyData.player1);
        else setPlayerDataFields(updatedLobbyData.player2);
        setLobby(updatedLobbyData);
        setMapSettings(updatedLobbyData.gameSettings);
        setTempMapSettings(updatedLobbyData.gameSettings);
      });

      connection.on("StartGame", (gameData) => {
        console.log("Start Game");
        navigate("/game", { state: { gameData } });
      });
    }
  }, [connection]);

  useEffect(() => {
    if (!lobby) {
      console.log("Lobby data is not present");
    } else {
      console.log("Lobby Id: " + lobby.lobbyId);
    }
  }, [lobby]);

  const handleSettingChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const updatedSettings = {
        ...tempMapSettings,
        [name]: checked,
      };

      setMapSettings(updatedSettings);

      if (connection) {
        connection
          .invoke("UpdateLobbySettings", lobby.lobbyId, updatedSettings)
          .catch((err) => console.error(err));
      }
    } else {
      setTempMapSettings({
        ...tempMapSettings,
        [name]: value,
      });
    }
  };

  const handleSettingBlur = () => {
    setMapSettings(tempMapSettings); // Update the actual map settings state
    if (connection) {
      connection
        .invoke("UpdateLobbySettings", lobby.lobbyId, tempMapSettings)
        .catch((err) => console.error(err));
    }
  };

  /* Color stuff */

  const [isColorMenuOpen, setIsColorMenuOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const colorMenuRef = useRef(null);

  const colors = [
    "#cf3636",
    "#da6f2a",
    "#e2c019",
    "#7de219",
    "#3adfba",
    "#3245df",
    "#50237d",
    "#b541b5",
  ];

  const toggleColorMenu = () => {
    if (!isColorMenuOpen) {
      setIsColorMenuOpen(true);
    }
  };

  const handleColorSelect = (color) => {
    const colorIndex = colors.indexOf(color);
    setSelectedColor(color);
    if (connection) {
      connection
        .invoke(
          "UpdatePlayerInLobby",
          playerData.playerId,
          lobby.lobbyId,
          colorIndex,
          playerData.ability
        )
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

  const abilities = [
    {
      id: 0,
      name: "Head-Tail Swap",
      img: headTailSwap,
      description: "Swaps the snake's head and tail.",
    },
    {
      id: 1,
      name: "Freeze Time",
      img: freezeTime,
      description: "Freezes the opponent for a few turns.",
    },
    {
      id: 2,
      name: "Ghost",
      img: ghost,
      description: "Allows the snake to pass through obstacles.",
    },
  ];

  const toggleAbilityMenu = () => {
    setIsAbilityMenuOpen(!isAbilityMenuOpen);
  };

  const handleAbilitySelect = (ability) => {
    setSelectedAbility(ability);
    if (connection) {
      connection
        .invoke(
          "UpdatePlayerInLobby",
          playerData.playerId,
          lobby.lobbyId,
          playerData.color,
          ability.id
        )
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

  /* Map Stuff */
  const mapData = [
    { name: "Plains", img: mapPlains },
    { name: "Jungle", img: mapJungle },
  ];

  const handleMapNavigation = (direction) => {
    console.log("Handle Navigation: " + direction);
    const currentIndex = mapSettings.map;
    const newIndex = direction === "left" ? currentIndex - 1 : currentIndex + 1;

    const updatedSettings = {
      ...mapSettings,
      map: newIndex,
    };

    if (connection) {
      connection
        .invoke("UpdateLobbySettings", lobby.lobbyId, updatedSettings)
        .catch((err) => console.error(err));
    }
  };

  /* Leave Button */
  const handleLeave = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        `${BASE_URL}/api/lobby/leave-private-lobby`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ playerId: playerData.playerId }),
        }
      );

      if (response.ok) {
        console.log("OK");
        navigate("/main-menu");
      } else {
        console.log("NOT OK");
        const errorData = await response.json();
        const errorMessage = errorData.message;
        console.log(errorMessage);

        switch (response.status) {
          case 400:
            setError("Invalid request, please check your data");
            break;
          case 401:
            setError("Wrong Credentials");
            break;
          case 403:
            setError("Forbidden, you do not have permission");
            break;
          case 409:
            setError("Username already exists");
            break;
          case 500:
            setError("Server error, please try again later");
            break;
          default:
            setError("An unexpected error occurred, please try again");
        }
      }
    } catch (err) {
      console.log(err);
      setError("Failed to connect to the server");
    }
  };

  /* Leave Button */
  const handleStart = async (e) => {
    // if (lobby.player1 == null || lobby.player2 == null) {
    //   setError("Lobby is not full");
    //   return;
    // }
    if (connection) {
      connection
        .invoke("StartGame", lobby.lobbyId)
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="cpl-container">
      <div className="cpl-top-grid border-gradient-normal">
        <div className="cpl-player-info cpl-player-info-left border-gradient-normal">
          {lobby.player1 == null ? (
            <div>
              <div>
                <p className="cpl-player-name gradient-text">Invite</p>
              </div>
              <div className="cpl-code-container">
                <p className="text-color-weaker">Code: </p>
                <p>{lobby.code}</p>
              </div>
            </div>
          ) : (
            <div className="player-info">
              <div>
                <p className="cpl-player-name gradient-text">
                  {lobby.player1.username}
                </p>
              </div>
              <div className="cpl-player-stats">
                <div className="cpl-player-stats-group">
                  <img
                    src={trophy}
                    alt="Wins"
                    className="pixel-art cpl-player-stats-icon"
                  />
                  <p className="text-color-green">{lobby.player1.wins}</p>
                </div>
                <div className="cpl-player-stats-group">
                  <img
                    src={skull}
                    alt="Losses"
                    className="pixel-art cpl-player-stats-icon"
                  />
                  <p className="text-color-red">{lobby.player1.losses}</p>
                </div>
              </div>
              <div className="container-center">
                <img
                  src={GetSnakeSprite[lobby.player1.color]}
                  alt="Player 1 Snake"
                  className="cpl-player-info-snake-image pixel-art"
                />
              </div>
              {/* Conditionally render buttons based on what player the user is */}
              {isPlayer1 && (
                <div className="container-center cpl-player-buttons-container">
                  <div className="cpl-player-pallete-container">
                    <img
                      src={palette}
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
                          {colors.map((color) => (
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
                      src={powerup}
                      alt="Powerup"
                      className="pixel-art cpl-player-button"
                      onClick={toggleAbilityMenu}
                      style={{
                        cursor: "pointer",
                        pointerEvents: isAbilityMenuOpen ? "none" : "auto",
                      }}
                    />
                    {isAbilityMenuOpen && (
                      <div
                        className="color-menu-container"
                        ref={abilityMenuRef}
                      >
                        <div className="ability-menu">
                          {abilities.map((ability) => (
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
              )}
            </div>
          )}
        </div>

        <div className="cpl-map-preview-container">
          <img
            className="pixel-art cpl-map-preview-image border-gradient-normal"
            src={mapData[mapSettings.map].img}
            alt="Map Image"
          />
          <div className="cpl-map-navigation-container">
            <button
              className="button-default button-square"
              onClick={() => handleMapNavigation("left")}
            >
              &lt;
            </button>
            <p className="cpl-map-name gradient-text">
              {mapData[mapSettings.map].name}
            </p>
            <button
              className="button-default button-square"
              onClick={() => handleMapNavigation("right")}
            >
              &gt;
            </button>
          </div>
        </div>
        <div className="cpl-player-info cpl-player-info-right border-gradient-normal">
          {lobby.player2 == null ? (
            <div>
              <div>
                <p className="cpl-player-name gradient-text">Invite</p>
              </div>
              <div className="cpl-code-container">
                <p className="text-color-weaker">Code: </p>
                <p>{lobby.code}</p>
              </div>
            </div>
          ) : (
            <div className="player-info">
              <div>
                <p className="cpl-player-name gradient-text">
                  {lobby.player2.username}
                </p>
              </div>
              <div className="cpl-player-stats">
                <div className="cpl-player-stats-group">
                  <img
                    src={trophy}
                    alt="Wins"
                    className="pixel-art cpl-player-stats-icon"
                  />
                  <p className="text-color-green">{lobby.player2.wins}</p>
                </div>
                <div className="cpl-player-stats-group">
                  <img
                    src={skull}
                    alt="Losses"
                    className="pixel-art cpl-player-stats-icon"
                  />
                  <p className="text-color-red">{lobby.player2.losses}</p>
                </div>
              </div>
              <div className="container-center">
                <img
                  src={GetSnakeSprite[lobby.player2.color]}
                  alt="Player 2 Snake"
                  className="cpl-player-info-snake-image pixel-art flip-horizontal"
                />
              </div>
              {/* Conditionally render buttons based on what player the user is */}
              {!isPlayer1 && (
                <div className="container-center cpl-player-buttons-container">
                  <div className="cpl-player-pallete-container">
                    <img
                      src={palette}
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
                          {colors.map((color) => (
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
                      src={powerup}
                      alt="Powerup"
                      className="pixel-art cpl-player-button"
                      onClick={toggleAbilityMenu}
                      style={{
                        cursor: "pointer",
                        pointerEvents: isAbilityMenuOpen ? "none" : "auto",
                      }}
                    />
                    {isAbilityMenuOpen && (
                      <div
                        className="color-menu-container"
                        ref={abilityMenuRef}
                      >
                        <div className="ability-menu">
                          {abilities.map((ability) => (
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
                              <div
                                className={`tooltip border-gradient-normal ${
                                  ability.id === 2 ? "tooltip-shift-left" : ""
                                }`}
                              >
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
              )}
            </div>
          )}
        </div>
      </div>
      <div className="cpl-map-settings border-gradient-normal">
        <div className="cpl-setting-container">
          <p className="cpl-label">Map Height</p>
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
          <p className="cpl-label">Time Limit</p>
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
          <p className="cpl-label">Map Width</p>
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
        >
          Leave
        </button>
        <button
          className="button-default button-height-less"
          onClick={handleStart}
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
