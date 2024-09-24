import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { SERVER_BASE_URL } from "../constants";
import { PlayerContext } from "../context/PlayerContext";

export default function PublicQueue() {
  const [lobby, setLobby] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { playerData, setPlayerData } = useContext(PlayerContext);

  useEffect(() => {
    if (!hasJoinedLobby.current) {
      checkLobbyStatus();
      hasJoinedLobby.current = true;
    }

    const handleUnload = () => {
      leaveLobby();
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
      leaveLobby();
    };
  }, []);

  const checkLobbyStatus = async () => {
    try {
      const response = await fetch(
        `${SERVER_BASE_URL}/api/lobby/check-lobby-status`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            playerId: playerData.playerId,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.lobby) {
        setLobby(data.lobby);
        setLoading(false);
      } else {
        joinLobby();
      }
    } catch (err) {
      console.error("Error checking lobby status:", err);
      setError("Failed to connect to the server. Please try again.");
      setLoading(false);
    }
  };

  const joinLobby = async () => {
    console.log("Join Lobby Front End");
    try {
      const response = await fetch(
        `${SERVER_BASE_URL}/api/lobby/join-public-lobby`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            playerId: playerData.playerId,
            username: playerData.username,
            isGuest: playerData.isGuest,
            wins: playerData.wins,
            losses: playerData.losses,
            color: playerData.color,
            ability: playerData.ability,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setLobby(data.lobby);
      } else {
        setError(
          "An error occurred while joining the lobby. Please try again."
        );
      }
    } catch (err) {
      console.error("Error joining lobby:", err);
      setError("Failed to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const leaveLobby = async () => {
    console.log("Leave Lobby Front End");
    try {
      const response = await fetch(`${SERVER_BASE_URL}/api/lobby/leave-lobby`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          playerId: playerData.playerId,
        }),
      });

      if (!response.ok) {
        console.error("Error leaving lobby.");
      }
    } catch (err) {
      console.error("Error leaving lobby:", err);
    }
  };

  return (
    <div className="container-center">
      <p className="title gradient-text title-section">
        {loading
          ? "Joining the lobby..."
          : lobby
          ? `Lobby ID: ${lobby.lobbyId}`
          : "Waiting for a player..."}
      </p>
      <br />
      <br />
      {lobby && (
        <div>
          <p>Players: {lobby.players.join(", ")}</p>
          <p>Status: {lobby.isFull ? "Full" : "Open"}</p>
        </div>
      )}
      <div className="btn-container">
        <Link to={"/main-menu"}>
          <button className="button-default button-height-less">Leave</button>
        </Link>
      </div>
      <br />
      <div className="container-center">
        {error && <p className="error-text">{error}</p>}
      </div>
    </div>
  );
}
