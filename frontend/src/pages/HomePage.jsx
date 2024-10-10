import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_BASE_URL } from "../constants";
import { PlayerContext } from "../context/PlayerContext";
import {
  handleInputChange,
  handleMouseEnter,
  handleMouseClick,
  handleError,
} from "../functions";
import githubLogo from "../assets/images/GitHubIcon.png";

export default function HomePage() {
  const usernameRef = useRef("");
  const passwordRef = useRef("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [actionType, setActionType] = useState("");
  const [loading, setLoading] = useState(0); // 0: Default, 1: Logging in, 2: Registering, 3: Joining as Guest
  const navigate = useNavigate();

  const { setPlayerData } = useContext(PlayerContext);

  useEffect(() => {
    const sendPing = async () => {
      try {
        const response = await fetch(SERVER_BASE_URL + "/api/app/ping", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          console.log("Server ping successful!");
        }
      } catch (err) {}
    };

    sendPing(); // Send the ping request when the homepage loads
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading !== 0) return;

    setLoading(actionType === "login" ? 1 : 2);
    setError("");

    if (!username || !password) {
      handleError(setError, "Username and password cannot be empty");
      return;
    }

    if (username.length > 12) {
      handleError(setError, "Username cannot exceed 12 characters");
      return;
    }

    if (username.startsWith("Guest")) {
      handleError(setError, 'Usernames cannot start with "Guest"');
      return;
    }

    handleMouseClick();

    const endpoint =
      actionType === "login"
        ? SERVER_BASE_URL + "/api/player/login"
        : SERVER_BASE_URL + "/api/player/register";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      setLoading(0);
      if (response.ok) {
        console.log("Before Token AAA");
        setPlayerData(data);
        console.log("token: " + data.token);
        navigate("/main-menu");
      } else {
        switch (response.status) {
          case 400:
            handleError(setError, "Invalid request, please check your data");
            break;
          case 401:
            handleError(setError, "Wrong Credentials");
            break;
          case 403:
            handleError(setError, "Player is already logged in");
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
    }
  };

  const handleGuestLogin = async () => {
    if (loading != 0) return;
    setLoading(3);
    setError("");
    handleMouseClick();

    try {
      const response = await fetch(SERVER_BASE_URL + "/api/player/guest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        setPlayerData(data.player);
        navigate("/main-menu");
      } else {
        handleError(
          setError,
          "An error occurred while joining as a guest, please try again"
        );
      }
    } catch (err) {
      handleError(setError, "Failed to connect to the server");
    }
  };

  return (
    <>
      <div className="container-center">
        <div className="title-section">
          <p className="title gradient-text">Snake 1v1</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => handleInputChange(e, setUsername, usernameRef)}
            placeholder="username"
            maxLength={14}
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => handleInputChange(e, setPassword, passwordRef)}
            placeholder="password"
            required
          />
          <div className="buttons-login">
            <button
              type="submit"
              className="button-default button-height-less button-width-less"
              onClick={() => setActionType("login")}
              onMouseEnter={handleMouseEnter}
            >
              {loading === 1 ? "Logging in..." : "Login"}
            </button>
            <button
              type="submit"
              className="button-default button-height-less button-width-less"
              onClick={() => setActionType("register")}
              onMouseEnter={handleMouseEnter}
            >
              {loading === 2 ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
        <button
          type="button"
          className="button-default button-height-less"
          onClick={handleGuestLogin}
          onMouseEnter={handleMouseEnter}
        >
          {loading === 3 ? "Joining..." : "Join as Guest"}
        </button>
      </div>
      <br />
      <div className="container-center">
        {error && <p className="error-text">{error}</p>}
      </div>
      <div className="version">v.1.0.7</div>
      <a
        href="https://github.com/heldergomesramos/Snake-1v1"
        target="_blank"
        rel="noopener noreferrer"
        className="github-icon"
        aria-label="GitHub"
      >
        <img
          src={githubLogo}
          alt="GitHub Logo pixel-art"
          className="github-logo"
        />
      </a>
    </>
  );
}
