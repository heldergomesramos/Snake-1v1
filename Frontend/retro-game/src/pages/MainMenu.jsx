import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";

export default function MainMenu() {
  const { playerData, setPlayerData } = useContext(PlayerContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (playerData === null) {
      navigate("/"); // Navigate to home page when playerData is cleared
    }
  }, [playerData, navigate]);

  const handleLogout = () => {
    setPlayerData(null);
  };

  return (
    <div className="container-center">
      <div className="title-section">
        <p className="section__text__p2">Welcome, {playerData?.username}</p>
        <p className="title gradient-text">Pick your poison</p>
      </div>
      <div className="buttons-main-menu-container">
        <Link to="/create-private-lobby">
          <button className="button-default">Create Private Game</button>
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
    </div>
  );
}
