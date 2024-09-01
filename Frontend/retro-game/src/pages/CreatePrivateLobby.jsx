import React, { useState } from "react";
import greenWormFull from "../assets/images/GreenWormFull.png";
import redWormFull from "../assets/images/RedWormFull.png";
import mapTest from "../assets/images/MapTest.png";

export default function CreatePrivateLobby() {
  const [activeAbility, setActiveAbility] = useState(null);
  const [mapSettings, setMapSettings] = useState({
    height: 20,
    width: 20,
    speed: 2,
    timeLimit: 180,
    borders: false,
    specials: true,
  });
  const [mapType, setMapType] = useState("Forest");

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
    <div className="cpl-container border-gradient-normal">
      <div className="cpl-top-grid border-gradient-normal">
        <div className="cpl-player-info cpl-player-info-left border-gradient-normal">
          <div>
            <h3 className="title gradient-text">Pofinho</h3>
          </div>
          <div>
            <p className="text-color-green">Ws: 5</p>
            <p className="text-color-red">Ls: 3</p>
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
            <button>&lt;</button>
            <p className="cpl-map-name gradient-text">Forest</p>
            <button>&gt;</button>
          </div>
        </div>

        <div className="cpl-player-info cpl-player-info-right border-gradient-normal">
          <div>
            <h3 className="title gradient-text">Shaduru</h3>
          </div>
          <div>
            <p className="text-color-green">Ws: 0</p>
            <p className="text-color-red">Ls: 69</p>
          </div>
          <img
            src={redWormFull}
            alt="Player 1 Snake"
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
      </div>
      <div className="map-settings border-gradient-normal">
        <label>
          Map Height:
          <input
            type="number"
            name="height"
            value={mapSettings.height}
            onChange={handleMapSettingChange}
          />
        </label>
        <label>
          Map Width:
          <input
            type="number"
            name="width"
            value={mapSettings.width}
            onChange={handleMapSettingChange}
          />
        </label>
        <label>
          Tiles/Second:
          <input
            type="number"
            name="speed"
            value={mapSettings.speed}
            onChange={handleMapSettingChange}
          />
        </label>
        <label>
          Time Limit:
          <input
            type="number"
            name="timeLimit"
            value={mapSettings.timeLimit}
            onChange={handleMapSettingChange}
          />
        </label>
        <label>
          Borders:
          <input
            type="checkbox"
            name="borders"
            checked={mapSettings.borders}
            onChange={handleMapSettingChange}
          />
        </label>
        <label>
          Specials:
          <input
            type="checkbox"
            name="specials"
            checked={mapSettings.specials}
            onChange={handleMapSettingChange}
          />
        </label>
      </div>
      <div className="game-code container-center border-gradient-normal">
        Code: AHGEYF
      </div>
      <div className="buttons-login-container container-center border-gradient-normal">
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
