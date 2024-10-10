import React, { useState, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SERVER_BASE_URL } from "../constants";
import { PlayerContext } from "../context/PlayerContext";
import {
  handleInputChange,
  handleMouseClick,
  handleMouseEnter,
  handleError,
} from "../functions";

export default function JoinPrivateLobby() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const codeRef = useRef("");
  const [code, setCode] = useState("");
  const { playerData } = useContext(PlayerContext);
  const navigate = useNavigate();

  const handleJoin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    handleMouseClick();

    const endpoint = `${SERVER_BASE_URL}/api/lobby/join-private-lobby`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${playerData.token}`,
        },
        body: JSON.stringify({
          playerId: playerData.playerId,
          lobbyCode: code,
        }),
      });

      setLoading(false);

      if (response.ok) {
        const lobby = await response.json();
        navigate("/create-private-lobby", { state: { lobby } });
      } else {
        switch (response.status) {
          case 400:
            handleError(setError, "Invalid request");
            break;
          case 404:
            handleError(setError, "Lobby not found");
            break;
          case 409:
            handleError(setError, "You are already in a lobby");
            break;
          case 500:
            handleError(setError, "Server error, please try again later");
            break;
          default:
            handleError(
              setError,
              "An unexpected error occurred, please try again"
            );
        }
      }
    } catch (err) {
      handleError(setError, "Failed to connect to the server");
      setLoading(false);
    }
  };

  return (
    <div className="container-center">
      <p className="title gradient-text title-section">Join Private Game</p>
      <form onSubmit={handleJoin}>
        <input
          type="text"
          placeholder="6 character code"
          value={code}
          minLength={6}
          maxLength={6}
          onChange={(e) => handleInputChange(e, setCode, codeRef)}
          required
        />
        <div className="buttons-login">
          <button
            type="submit"
            className="button-default button-height-less"
            onMouseEnter={handleMouseEnter}
            disabled={loading}
          >
            {loading ? "Joining..." : "Join"}
          </button>
        </div>
      </form>
      <div className="btn-container">
        <Link to={"/main-menu"}>
          <button
            className="button-default button-height-less"
            onMouseEnter={handleMouseEnter}
            onClick={handleMouseClick}
          >
            Leave
          </button>
        </Link>
      </div>
      <br />
      <div className="container-center">
        {error && <p className="error-text">{error}</p>}
      </div>
    </div>
  );
}
