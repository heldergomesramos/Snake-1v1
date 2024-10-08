import React from "react";
import { handleMouseEnter } from "../functions";

const GameEndOverlay = ({
  cause,
  result,
  yourScore,
  opponentName,
  opponentScore,
  time,
  moves,
  optionalMessage,
  onLeave,
  onRematch,
  rematchState,
  isSinglePlayer,
  onPlayAgain,
}) => {
  return (
    <div className="overlay">
      <div className="overlay-content border-gradient-normal">
        <p className="overlay-cause">{cause}</p>
        {!isSinglePlayer && (
          <p className={`overlay-result ${result}`}>
            {result === "win"
              ? "You Win!"
              : result === "lose"
              ? "You Lose!"
              : "Draw!"}
          </p>
        )}
        <p>
          {isSinglePlayer ? `Score: ${yourScore}` : `Your Score: ${yourScore}`}
        </p>
        {!isSinglePlayer && (
          <p>
            {opponentName}'s score: {opponentScore}
          </p>
        )}
        <p>Time Left: {time}</p>
        <p>Moves: {moves}</p>

        <div className="button-group">
          <button
            className="button-default button-height-less button-width-less"
            onClick={onLeave}
            onMouseEnter={handleMouseEnter}
          >
            Leave
          </button>
          <button
            onClick={isSinglePlayer ? onPlayAgain : onRematch}
            onMouseEnter={handleMouseEnter}
            className={`button-default button-height-less button-width-less ${
              !isSinglePlayer ? `overlay-rematch ${rematchState}` : ""
            }`}
            disabled={!isSinglePlayer && rematchState === "disabled"}
          >
            {isSinglePlayer
              ? "Play Again"
              : rematchState === "lockedIn"
              ? "Locked In"
              : "Rematch"}
          </button>
        </div>
        {optionalMessage && <p>{optionalMessage}</p>}
      </div>
    </div>
  );
};

export default GameEndOverlay;
