import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar/Navbar';
import Landing from './pages/Landing/Landing';
import Explore from './pages/Explore/Explore';

import Publish from './pages/Publish/Publish';
import SignUpPage from './pages/Profile/SignUpPage';
import LoginPage from './pages/Profile/LoginPage';
import ProfilePage from './pages/Profile/ProfilePage';

function App() {
  return (
    <ThemeProvider>
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<LoginPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;