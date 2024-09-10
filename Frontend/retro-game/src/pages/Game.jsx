import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";
import { PlayerContext } from "../context/PlayerContext";
import headTailSwap from "../assets/images/AbilityIcons-HeadTailSwap.png";
import freezeTime from "../assets/images/AbilityIcons-FreezeTime.png";
import ghost from "../assets/images/AbilityIcons-Ghost.png";

export default function Game() {
  const location = useLocation();
  const initialGameData = location.state?.gameData;
  console.log("Initial Game Data: " + JSON.stringify(initialGameData));
  const handleLeave = async (e) => {
    e.preventDefault();
    setError("");
  };

  const Board = () => {
    return (
      <div>
        <p>BOARD xD</p>
      </div>
    );
    // return (
    //   <div
    //     className=""
    //     style={{
    //       gridTemplateRows: `repeat(${boardHeight}, 32px)`,
    //       gridTemplateColumns: `repeat(${boardWidth}, 32px)`,
    //     }}
    //   >
    //     {/* Background ground layer */}
    //     {groundTiles.map((row, rowIndex) =>
    //       row.map((tileIndex, colIndex) => (
    //         <div
    //           key={`${rowIndex}-${colIndex}`}
    //           className={`tile tile-${tileIndex}`}
    //         />
    //       ))
    //     )}
    //     {/* Snake layer */}
    //     {[...snakes.player1, ...snakes.player2].map((snakePart, index) => (
    //       <div
    //         key={index}
    //         className="snake"
    //         style={{ gridRow: snakePart.y + 1, gridColumn: snakePart.x + 1 }}
    //       />
    //     ))}
    //   </div>
    // );
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
      <div className="game-board">
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
