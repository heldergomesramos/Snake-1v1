import React, { createContext, useState, useEffect } from "react";

export const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const [playerData, setPlayerData] = useState(null);

  const setPlayerDataFields = (simplifiedPlayerData) => {
    setPlayerData((prevPlayerData) => ({
      ...prevPlayerData,
      wins: simplifiedPlayerData.wins,
      losses: simplifiedPlayerData.losses,
      color: simplifiedPlayerData.color,
      ability: simplifiedPlayerData.ability,
    }));
  };

  /* Usefull to debug playerData updates */
  useEffect(() => {}, [playerData]);

  return (
    <PlayerContext.Provider
      value={{ playerData, setPlayerData, setPlayerDataFields }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
