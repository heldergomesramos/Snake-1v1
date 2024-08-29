import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import MainMenu from "./pages/MainMenu";
import PublicQueue from "./pages/PublicQueue";
import Profile from "./pages/Profile";
import { PlayerProvider } from "./context/PlayerContext";

export default function App() {
  return (
    <PlayerProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/main-menu" element={<MainMenu />} />
          <Route path="/public-queue" element={<PublicQueue />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </PlayerProvider>
  );
}
