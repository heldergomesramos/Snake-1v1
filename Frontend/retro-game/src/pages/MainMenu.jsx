import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";
import { SERVER_BASE_URL } from "../constants";
import { HowToPlayOverlay } from "./HowToPlayOverlay";
import { handleMouseClick, handleMouseEnter, handleError } from "../functions";

export default function MainMenu() {
  const { playerData, setPlayerData } = useContext(PlayerContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [guide, setGuide] = useState(false);

  useEffect(() => {
    if (playerData === null) {
      navigate("/"); // Navigate to home page when playerData is cleared
    }
  }, [playerData, navigate]);

  const handleLogout = () => {
    setPlayerData(null);
    handleMouseClick();
  };

  const handleHowToPlay = () => {
    setGuide(true);
    handleMouseClick();
  };

  const handlePrivateGame = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    handleMouseClick();

    const endpoint = `${SERVER_BASE_URL}/api/lobby/create-private-lobby`;

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
        const errorData = await response.json();
        const errorMessage = errorData.message;
        audioManager.playErrorSound();
        switch (response.status) {
          case 400:
            handleError(error, "Invalid request, please check your data");
            break;
          case 401:
            handleError(setError, "Wrong Credentials");
            break;
          case 403:
            handleError(setError, "Forbidden, you do not have permission");
            break;
          case 409:
            handleError(setError, "Username already exists");
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
      {guide && <HowToPlayOverlay setGuide={setGuide} />}
      <div className="title-section">
        <p className="section__text__p2">Welcome, {playerData?.username}</p>
        <p className="title gradient-text">Pick your poison</p>
      </div>
      <div className="buttons-main-menu-container">
        <Link>
          <button
            className="button-default"
            onMouseEnter={handleMouseEnter}
            onClick={handlePrivateGame}
          >
            {loading ? "Creating..." : "Create Private Game"}
          </button>
        </Link>
        <Link to={"/join-private-lobby"}>
          <button
            className="button-default"
            onMouseEnter={handleMouseEnter}
            onClick={handleMouseClick}
          >
            Join Private Game
          </button>
        </Link>
        <Link to={"/public-queue"}>
          <button
            className="button-default"
            onMouseEnter={handleMouseEnter}
            onClick={handleMouseClick}
          >
            Join Public Game
          </button>
        </Link>
        <button
          className="button-default"
          onMouseEnter={handleMouseEnter}
          onClick={handleHowToPlay}
        >
          How to Play
        </button>
        <Link>
          <button
            className="button-default"
            onMouseEnter={handleMouseEnter}
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
