import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";
import { PlayerContext } from "../context/PlayerContext";

export default function HomePage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [actionType, setActionType] = useState("");
  const navigate = useNavigate();

  const { setPlayerData } = useContext(PlayerContext);

  // Add useEffect to send a ping request on component mount
  useEffect(() => {
    const sendPing = async () => {
      try {
        const response = await fetch(BASE_URL + "/api/app/ping", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) console.error("Ping request failed");
      } catch (err) {
        console.error("Failed to connect to the server for ping:", err);
      }
    };

    sendPing(); // Send the ping request when the homepage loads
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Username and password cannot be empty.");
      return;
    }

    const endpoint =
      actionType === "login"
        ? BASE_URL + "/api/player/login"
        : BASE_URL + "/api/player/register";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setPlayerData(data.player);
        navigate("/main-menu");
      } else {
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
      console.log(err);
      setError("Failed to connect to the server");
    }
  };

  const handleGuestLogin = async () => {
    setError("");

    try {
      const response = await fetch(BASE_URL + "/api/player/guest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setPlayerData(data.player);
        navigate("/main-menu");
      } else {
        setError(
          "An error occurred while joining as a guest, please try again"
        );
      }
    } catch (err) {
      setError("Failed to connect to the server");
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
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
          />
          <div className="buttons-login">
            <button
              type="submit"
              className="button-default button-height-less"
              onClick={() => setActionType("login")}
            >
              Login
            </button>
            <button
              type="submit"
              className="button-default button-height-less"
              onClick={() => setActionType("register")}
            >
              Register
            </button>
          </div>
        </form>
        <button
          type="button"
          className="button-default button-height-less"
          onClick={handleGuestLogin}
        >
          Join as Guest
        </button>
      </div>
      <br />
      <div className="container-center">
        {error && <p className="error-text">{error}</p>}
      </div>
    </>
  );
}
