import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import React, { useContext, useEffect } from "react";

import HomePage from "./pages/HomePage";
import MainMenu from "./pages/MainMenu";
import Profile from "./pages/Profile";
import CreatePrivateLobby from "./pages/CreatePrivateLobby";
import JoinPrivateLobby from "./pages/JoinPrivateLobby";
import PublicQueue from "./pages/PublicQueue";
import { PlayerProvider, PlayerContext } from "./context/PlayerContext";
import { SignalRProvider } from "./context/SignalRContext";

export default function App() {
  return (
    <PlayerProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
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
      <Route path="/profile" element={<Profile />} />
      <Route path="/create-private-lobby" element={<CreatePrivateLobby />} />
      <Route path="/join-private-lobby" element={<JoinPrivateLobby />} />
      <Route path="/public-queue" element={<PublicQueue />} />
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
