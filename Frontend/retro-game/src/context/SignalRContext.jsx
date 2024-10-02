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
      })
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    newConnection.onclose((error) => {
      setConnectionState("Disconnected");
      console.log("SignalR connection closed:", error);
    });

    newConnection.onreconnecting((error) => {
      setConnectionState("Reconnecting");
      console.log("SignalR reconnecting:", error);
    });

    newConnection.onreconnected(() => {
      setConnectionState("Connected");
      console.log("SignalR reconnected");
    });

    newConnection
      .start()
      .then(() => {
        setConnectionState("Connected");
        console.log("SignalR connected");
      })
      .catch((e) => {
        setConnectionState("Disconnected");
        console.error("SignalR connection failed:", e);
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
