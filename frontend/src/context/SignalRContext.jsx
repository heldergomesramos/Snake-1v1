import React, { createContext, useContext, useEffect, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { SERVER_BASE_URL } from "../constants";
import { PlayerContext } from "../context/PlayerContext";

const SignalRContext = createContext();

export const SignalRProvider = ({ children }) => {
  const [connection, setConnection] = useState(null);
  const [connectionState, setConnectionState] = useState("Disconnected");
  const [errorMessage, setErrorMessage] = useState("");
  const { playerData } = useContext(PlayerContext);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(`${SERVER_BASE_URL}/gameHub?playerId=${playerData.playerId}`, {
        withCredentials: false,
        accessTokenFactory: () => playerData.token,
      })
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    newConnection.onclose((error) => {
      setConnectionState("Disconnected");
    });

    newConnection.onreconnecting((error) => {
      setConnectionState("Reconnecting");
    });

    newConnection.onreconnected(() => {
      setConnectionState("Connected");
    });

    newConnection
      .start()
      .then(() => {
        setConnectionState("Connected");
      })
      .catch((e) => {
        setConnectionState("Disconnected");
        setErrorMessage("Failed to connect to the SignalR hub.");
      });

    return () => {
      if (newConnection) {
        newConnection.stop();
      }
    };
  }, []);

  return (
    <SignalRContext.Provider
      value={{ connection, connectionState, errorMessage }}
    >
      {children}
    </SignalRContext.Provider>
  );
};

export const useSignalR = () => useContext(SignalRContext);
