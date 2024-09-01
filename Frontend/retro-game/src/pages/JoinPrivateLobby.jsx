import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../constants";
import { PlayerContext } from "../context/PlayerContext";

export default function JoinPrivateLobby() {
  const [lobby, setLobby] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { playerData, setPlayerData } = useContext(PlayerContext);

  return (
    <div className="container-center">
      <p className="title gradient-text title-section">Join Private Game</p>
      <form>
        <input
          type="text"
          //value={username}
          //onChange={(e) => setUsername(e.target.value)}
          placeholder="6 digit code"
          required
        />
        <div className="buttons-login">
          <button
            type="submit"
            className="button-default button-height-less"
            //onClick={() => setActionType("login")}
          >
            Join
          </button>
        </div>
      </form>
      <div className="btn-container">
        <Link to="/main-menu">
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
