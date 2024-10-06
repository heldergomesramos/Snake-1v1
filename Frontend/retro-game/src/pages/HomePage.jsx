import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_BASE_URL } from "../constants";
import { PlayerContext } from "../context/PlayerContext";

export default function HomePage() {
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

        if (!response.ok) console.error("Ping request failed");
        else {
          const data = await response.json();
          console.log("Ping Success: " + JSON.stringify(data));
        }
      } catch (err) {
        console.error("Failed to connect to the server for ping:", err);
      }
    };

    sendPing(); // Send the ping request when the homepage loads
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading !== 0) return;

    setLoading(actionType === "login" ? 1 : 2);
    setError("");

    if (!username || !password) {
      setError("Username and password cannot be empty.");
      return;
    }

    if (username.length > 12) {
      setError("Username cannot exceed 12 characters.");
      return;
    }

    if (username.startsWith("Guest")) {
      setError('Usernames cannot start with "Guest".');
      return;
    }

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
        setPlayerData(data);
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
            setError("Player is already logged in");
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
    if (loading != 0) return;
    setLoading(3);
    setError("");

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
            maxLength={14}
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
              className="button-default button-height-less button-width-less"
              onClick={() => setActionType("login")}
            >
              {loading === 1 ? "Logging in..." : "Login"}
            </button>
            <button
              type="submit"
              className="button-default button-height-less button-width-less"
              onClick={() => setActionType("register")}
            >
              {loading === 2 ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
        <button
          type="button"
          className="button-default button-height-less"
          onClick={handleGuestLogin}
        >
          {loading === 3 ? "Joining..." : "Join as Guest"}
        </button>
      </div>
      <br />
      <div className="container-center">
        {error && <p className="error-text">{error}</p>}
      </div>
      <div className="version">v.0.3</div>
    </>
  );
}
