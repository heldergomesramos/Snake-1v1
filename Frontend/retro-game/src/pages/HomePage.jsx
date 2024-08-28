import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function HomePage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [actionType, setActionType] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const BASE_URL = "http://localhost:5030";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Username and password cannot be empty.");
      return;
    }

    /* Change this when server gets public */
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
        setUser(data.player);
        navigate("/main-menu", { state: { user: data.player } });
      } else {
        switch (response.status) {
          case 400:
            setError("Invalid request. Please check your data.");
            break;
          case 401:
            setError("Unauthorized. Please check your credentials.");
            break;
          case 403:
            setError("Forbidden. You do not have permission.");
            break;
          case 409:
            setError("Conflict. Please try a different username.");
            break;
          case 500:
            setError("Server error. Please try again later.");
            break;
          default:
            setError("An unexpected error occurred. Please try again.");
        }
      }
    } catch (err) {
      console.log(err);
      setError("Failed to connect to the server.");
    }
  };

  /* Fix this later (doesnt have the switch error code to message validation) */
  const handleGuestLogin = async () => {
    setError(""); // Clear any previous errors

    try {
      const response = await fetch(BASE_URL + "/api/guest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok && data.status === "guest_logged_in") {
        setUser(data.user); // Save guest user data in context
        navigate("/main-menu", { state: { user: data.user } });
      } else {
        setError(
          "An error occurred while joining as a guest. Please try again."
        );
      }
    } catch (err) {
      setError("Failed to connect to the server.");
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
