// AbilityColorMenu.js
import React, { useState, useRef, useEffect } from "react";
import {
  ABILITIES,
  COLORS,
  ABILITIES_ICON,
  COLORS_ICON,
} from "../constants.jsx";
import { handleMouseClick, handleMouseEnter } from "../functions";

const AbilityColorMenu = ({ connection, playerData, invokeMethod }) => {
  /* Color stuff */
  const [isColorMenuOpen, setIsColorMenuOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const colorMenuRef = useRef(null);
  const colorButtonRef = useRef(null);

  const toggleColorMenu = () => {
    setIsColorMenuOpen(!isColorMenuOpen);
    setIsAbilityMenuOpen(false);
    handleMouseClick();
  };

  const handleColorSelect = (color) => {
    handleMouseClick();
    const colorIndex = COLORS.indexOf(color);
    setSelectedColor(color);
    if (connection) {
      connection
        .invoke(invokeMethod, colorIndex, playerData.ability)
        .catch(() => {});
    }
  };

  /* Ability Stuff */
  const [isAbilityMenuOpen, setIsAbilityMenuOpen] = useState(false);
  const abilityMenuRef = useRef(null);
  const abilityButtonRef = useRef(null);

  const toggleAbilityMenu = () => {
    setIsAbilityMenuOpen(!isAbilityMenuOpen);
    setIsColorMenuOpen(false);
    handleMouseClick();
  };

  const handleAbilitySelect = (ability) => {
    handleMouseClick();
    if (connection) {
      connection
        .invoke(invokeMethod, playerData.color, ability.id)
        .catch(() => {});
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleColorClickOutside = (event) => {
      if (
        colorMenuRef.current &&
        !colorMenuRef.current.contains(event.target)
      ) {
        setIsColorMenuOpen(false);
      }
      if (abilityButtonRef.current.contains(event.target)) toggleAbilityMenu();
    };

    const handleAbilityClickOutside = (event) => {
      if (
        abilityMenuRef.current &&
        !abilityMenuRef.current.contains(event.target)
      ) {
        setIsAbilityMenuOpen(false);
      }
      if (colorButtonRef.current.contains(event.target)) toggleColorMenu();
    };

    if (isColorMenuOpen) {
      document.addEventListener("mousedown", handleColorClickOutside);
    }
    if (isAbilityMenuOpen) {
      document.addEventListener("mousedown", handleAbilityClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleColorClickOutside);
      document.removeEventListener("mousedown", handleAbilityClickOutside);
    };
  }, [isColorMenuOpen, isAbilityMenuOpen]);

  const PlayerButtons = () => {
    return (
      <div>
        <div className="container-center cpl-player-buttons-container">
          {/* Ability Button */}
          <div className="cpl-player-pallete-container">
            <img
              src={ABILITIES_ICON}
              alt="Powerup"
              className="pixel-art cpl-player-button"
              onClick={toggleAbilityMenu}
              onMouseEnter={handleMouseEnter}
              ref={abilityButtonRef}
              style={{ pointerEvents: isAbilityMenuOpen ? "none" : "auto" }}
            />
            {/* Conditional rendering of ability menu */}
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
                        onMouseEnter={handleMouseEnter}
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
                        className="tooltip border-gradient-normal"
                        style={{
                          transform: `translateX(-${(ability.id + 1) * 25}%)`, // Dynamically calculate the tooltip position
                        }}
                      >
                        <p className="tooltip-name">{ability.name}</p>
                        <p className="tooltip-description">
                          {ability.description}
                        </p>
                        <p className="tooltip-description">
                          Cooldown: {ability.cooldown}s
                        </p>
                        <p className="tooltip-description text-color-soft">
                          Press [Space] to use.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* Color Button */}
          <div className="cpl-player-pallete-container">
            <img
              src={COLORS_ICON}
              alt="Palette"
              className="pixel-art cpl-player-button"
              ref={colorButtonRef}
              onClick={toggleColorMenu}
              onMouseEnter={handleMouseEnter}
              style={{ pointerEvents: isColorMenuOpen ? "none" : "auto" }}
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
                      onMouseEnter={handleMouseEnter}
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
        </div>
      </div>
    );
  };

  return <PlayerButtons />;
};

export default AbilityColorMenu;
