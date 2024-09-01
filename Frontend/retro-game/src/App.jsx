import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import MainMenu from "./pages/MainMenu";
import Profile from "./pages/Profile";
import CreatePrivateLobby from "./pages/CreatePrivateLobby";
import JoinPrivateLobby from "./pages/JoinPrivateLobby";
import PublicQueue from "./pages/PublicQueue";
import { PlayerProvider } from "./context/PlayerContext";

export default function App() {
  return (
    <PlayerProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/main-menu" element={<MainMenu />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/create-private-lobby"
            element={<CreatePrivateLobby />}
          />
          <Route path="/join-private-lobby" element={<JoinPrivateLobby />} />
          <Route path="/public-queue" element={<PublicQueue />} />
        </Routes>
      </Router>
    </PlayerProvider>
  );
}
