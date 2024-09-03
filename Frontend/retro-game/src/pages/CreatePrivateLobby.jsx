import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import greenWormFull from "../assets/images/GreenWormFull.png";
import redWormFull from "../assets/images/RedWormFull.png";
import mapTest from "../assets/images/MapTest.png";
import trophy from "../assets/images/Trophy.png";
import skull from "../assets/images/Skull.png";

import { PlayerContext } from "../context/PlayerContext";

export default function CreatePrivateLobby() {
  const { playerData, setPlayerData } = useContext(PlayerContext);
  const [mapType, setMapType] = useState("Forest");
  const [activeAbility, setActiveAbility] = useState(null);
  const [mapSettings, setMapSettings] = useState({
    height: 20,
    width: 20,
    speed: 2,
    timeLimit: 180,
    borders: false,
    specials: true,
  });

  const location = useLocation();
  const lobby = location.state?.lobby.lobby;

  useEffect(() => {
    if (!lobby) {
      console.log("Lobby data is not present");
    } else console.log("Lobby Id: " + lobby.lobbyId);
  }, [lobby]);

  const handleAbilityClick = (ability) => {
    setActiveAbility(ability);
  };

  const handleMapSettingChange = (e) => {
    setMapSettings({
      ...mapSettings,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  const handleMapTypeChange = (direction) => {
    // Update map type based on direction (left or right)
  };

  const handleSubmit = () => {
    // Start game logic
  };

  return (
    <div className="cpl-container">
      <div className="cpl-top-grid border-gradient-normal">
        <div className="cpl-player-info cpl-player-info-left border-gradient-normal">
          <div>
            <p className="title gradient-text">{lobby.player1.username}</p>
          </div>
          <div class="cpl-player-stats">
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
          <img
            src={greenWormFull}
            alt="Player 1 Snake"
            className="cpl-player-info-snake-image pixel-art"
          />
          <div className="abilities">
            <button
              onClick={() => handleAbilityClick(1)}
              className={activeAbility === 1 ? "active" : ""}
            ></button>
            <button
              onClick={() => handleAbilityClick(2)}
              className={activeAbility === 2 ? "active" : ""}
            ></button>
            <button
              onClick={() => handleAbilityClick(3)}
              className={activeAbility === 3 ? "active" : ""}
            ></button>
          </div>
        </div>

        <div className="cpl-map-preview-container">
          <img
            className="pixel-art cpl-map-preview-image border-gradient-normal"
            src={mapTest}
            alt="Map Image"
          />
          <div className="cpl-map-navigation-container">
            <button className="button-default button-square">&lt;</button>
            <p className="cpl-map-name gradient-text">Forest</p>
            <button className="button-default button-square">&gt;</button>
          </div>
        </div>

        <div className="cpl-player-info cpl-player-info-right border-gradient-normal">
          {lobby.player2 == null ? (
            <div>
              <div>
                <p className="title gradient-text">Invite</p>
              </div>
              <div className="cpl-code-container">
                <p className="text-color-weaker">Code: </p>
                <p>{lobby.code}</p>
              </div>
            </div>
          ) : (
            <div className="player-info">
              <div>
                <p className="title gradient-text">{lobby.player2.username}</p>
              </div>
              <div class="cpl-player-stats">
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
              <img
                src={redWormFull}
                alt="Player 2 Snake"
                className="cpl-player-info-snake-image pixel-art flip-horizontal"
              />
              <div className="abilities">
                <button
                  onClick={() => handleAbilityClick(1)}
                  className={activeAbility === 1 ? "active" : ""}
                ></button>
                <button
                  onClick={() => handleAbilityClick(2)}
                  className={activeAbility === 2 ? "active" : ""}
                ></button>
                <button
                  onClick={() => handleAbilityClick(3)}
                  className={activeAbility === 3 ? "active" : ""}
                ></button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="cpl-map-settings border-gradient-normal">
        <label className="cpl-label">
          Map Height
          <input
            className="cpl-input"
            type="number"
            name="height"
            value={lobby.gameSettings.height}
            onChange={handleMapSettingChange}
          />
        </label>
        <label className="cpl-label">
          Time Limit
          <input
            className="cpl-input"
            type="number"
            name="timeLimit"
            value={lobby.gameSettings.time}
            onChange={handleMapSettingChange}
          />
        </label>
        <label className="cpl-label">
          Borders
          <input
            className="cpl-checkbox"
            type="checkbox"
            name="borders"
            checked={lobby.gameSettings.borders}
            onChange={handleMapSettingChange}
          />
        </label>
        <label className="cpl-label">
          Map Width
          <input
            className="cpl-input"
            type="number"
            name="width"
            value={lobby.gameSettings.width}
            onChange={handleMapSettingChange}
          />
        </label>
        <label className="cpl-label">
          Speed
          <input
            className="cpl-input"
            type="number"
            name="speed"
            value={lobby.gameSettings.speed}
            onChange={handleMapSettingChange}
          />
        </label>
        <label className="cpl-label">
          Abilities
          <input
            className="cpl-checkbox"
            type="checkbox"
            name="specials"
            checked={lobby.gameSettings.abilities}
            onChange={handleMapSettingChange}
          />
        </label>
      </div>
      <div className="buttons-login-container container-center">
        <button
          className="button-default button-height-less"
          onClick={handleSubmit}
        >
          Leave
        </button>
        <button
          className="button-default button-height-less"
          onClick={handleSubmit}
        >
          Start
        </button>
      </div>
    </div>
  );
}
