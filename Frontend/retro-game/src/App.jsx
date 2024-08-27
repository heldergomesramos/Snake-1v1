import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { UserProvider } from './UserContext';
import HomePage from './pages/HomePage';
import MainMenu from './pages/MainMenu';
import PublicQueue from './pages/PublicQueue';

export default function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/main-menu" element={<MainMenu />} />
          <Route path="/public-queue" element={<PublicQueue />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}
