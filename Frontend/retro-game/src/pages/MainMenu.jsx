import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";
import { BASE_URL } from "../constants";

export default function MainMenu() {
  const { playerData, setPlayerData } = useContext(PlayerContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Prevents multiple button clicks

  useEffect(() => {
    if (playerData === null) {
      navigate("/"); // Navigate to home page when playerData is cleared
    }
  }, [playerData, navigate]);

  const handleLogout = () => {
    setPlayerData(null);
  };

  const handlePrivateGame = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint = `${BASE_URL}/api/lobby/create-private-lobby`;

    /* Missing: Block button clicks until received message from server */

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ playerId: playerData.playerId }),
      });

      setLoading(false);

      if (response.ok) {
        const lobby = await response.json();
        navigate("/create-private-lobby", { state: { lobby } });
      } else {
        console.log("Got Here!");
        const errorData = await response.json();
        console.log("Got Here 2!");
        const errorMessage = errorData.message;
        console.log("Got Here 3!");
        console.log(errorMessage);
        console.log("Got Here 4!");

        switch (response.status) {
          case 400:
            setError("Invalid request, please check your data");
            break;
          case 401:
            setError("Wrong Credentials");
            break;
          case 403:
            setError("Forbidden, you do not have permission");
            break;
          case 409:
            setError("Username already exists");
            break;
          case 500:
            setError("Server error, please try again later");
            break;
          default:
            setError("An unexpected error occurred, please try again");
        }
      }
    } catch (err) {
      //console.error(err);
      setError("Failed to connect to the server.");
      setLoading(false);
    }
  };

  return (
    <div className="container-center">
      <div className="title-section">
        <p className="section__text__p2">Welcome, {playerData?.username}</p>
        <p className="title gradient-text">Pick your poison</p>
      </div>
      <div className="buttons-main-menu-container">
        <Link>
          <button className="button-default" onClick={handlePrivateGame}>
            {loading ? "Creating..." : "Create Private Game"}
          </button>
        </Link>
        <Link to="/join-private-lobby">
          <button className="button-default">Join Private Game</button>
        </Link>
        <Link to="/public-queue">
          <button className="button-default">Join Public Game</button>
        </Link>
        <Link to="/play-vs-ai">
          <button className="button-default">Play vs AI</button>
        </Link>
      </div>
      <br />
      <br />
      <div className="buttons-main-menu-container">
        <Link to="/profile">
          <button className="button-default button-height-less">Profile</button>
        </Link>
        <Link>
          <button
            className="button-default button-height-less"
            onClick={handleLogout}
          >
            Log Out
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
