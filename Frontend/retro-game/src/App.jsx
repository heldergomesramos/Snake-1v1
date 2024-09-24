import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import React, { useContext, useEffect } from "react";

import Game from "./pages/Game";
import HomePage from "./pages/HomePage"; // Assuming this is your initial landing page
import MainMenu from "./pages/MainMenu";
import CreatePrivateLobby from "./pages/CreatePrivateLobby";
import JoinPrivateLobby from "./pages/JoinPrivateLobby";
import PublicQueue from "./pages/PublicQueue";
import { PlayerProvider, PlayerContext } from "./context/PlayerContext";
import { SignalRProvider } from "./context/SignalRContext";
import { BASE_PATH } from "./constants";

export default function App() {
  return (
    <PlayerProvider>
      <Router basename={BASE_PATH}>
        <Routes>
          {/* Redirect root "/" to the Home Page */}
          <Route path="/" element={<HomePage />} />

          {/* Protected routes */}
          <Route
            path="/*"
            element={
              <RequireAuth>
                <SignalRProvider>
                  <ProtectedRoutes />
                </SignalRProvider>
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </PlayerProvider>
  );
}

function ProtectedRoutes() {
  return (
    <Routes>
      <Route path="/main-menu" element={<MainMenu />} />
      <Route path="/create-private-lobby" element={<CreatePrivateLobby />} />
      <Route path="/join-private-lobby" element={<JoinPrivateLobby />} />
      <Route path="/public-queue" element={<PublicQueue />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  );
}

function RequireAuth({ children }) {
  const { playerData } = useContext(PlayerContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!playerData) {
      navigate("/"); // Redirect to home page if not logged in
    }
  }, [playerData, navigate]);

  return playerData ? children : null;
}
