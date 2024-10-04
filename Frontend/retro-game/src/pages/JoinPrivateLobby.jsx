import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SERVER_BASE_URL } from "../constants";
import { PlayerContext } from "../context/PlayerContext";

export default function JoinPrivateLobby() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const { playerData } = useContext(PlayerContext);
  const navigate = useNavigate();

  const handleJoin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint = `${SERVER_BASE_URL}/api/lobby/join-private-lobby`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
        const errorData = await response.json();
        const errorMessage = errorData.message || "An error occurred";
        console.log(errorMessage);

        switch (response.status) {
          case 400:
            setError("Invalid request, please check your data");
            break;
          case 401:
            setError("Unauthorized, please log in");
            break;
          case 403:
            setError("Forbidden, you do not have permission");
            break;
          case 409:
            setError("The lobby is full");
            break;
          case 500:
            setError("Server error, please try again later");
            break;
          default:
            setError("An unexpected error occurred, please try again");
        }
      }
    } catch (err) {
      console.error(err);
      setError("Failed to connect to the server.");
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
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <div className="buttons-login">
          <button
            type="submit"
            className="button-default button-height-less"
            disabled={loading}
          >
            {loading ? "Joining..." : "Join"}
          </button>
        </div>
      </form>
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
