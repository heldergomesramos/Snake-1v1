import React, { createContext, useState, useEffect } from "react";

export const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const [playerData, setPlayerData] = useState(null);

  const setPlayerDataFields = (simplifiedPlayerData) => {
    console.log("Set Player Data Fields called");
    console.log(JSON.stringify(simplifiedPlayerData));
    console.log("Survived step 1");
    setPlayerData((prevPlayerData) => ({
      ...prevPlayerData,
      wins: simplifiedPlayerData.wins,
      losses: simplifiedPlayerData.losses,
      color: simplifiedPlayerData.color,
      ability: simplifiedPlayerData.ability,
    }));
  };

  /* Usefull to debug playerData updates */
  useEffect(() => {
    console.log("Player data updated:", playerData);
  }, [playerData]);

  return (
    <PlayerContext.Provider
      value={{ playerData, setPlayerData, setPlayerDataFields }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
