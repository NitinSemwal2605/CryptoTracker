import React, { useEffect, useState } from 'react';
import AnimatedCursor from 'react-animated-cursor';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import About from './components/About';
import Banner from './components/Banner';
import Footer from './components/Common/Footer';
import Header from './components/Common/Header';
import MainComponent from './components/LandingPage/MainComponent';
import Testimonials from './components/Testimonials';
import CoinPage from './pages/Coin';
import ComparePage from './pages/ComparePage';
import DashboardPage from './pages/DashboardPage';
import WatchlistPage from './pages/WatchlistPage';

// Home Page Component
const HomePage = () => (
  <>
    <Banner />
    <MainComponent />
    <About />
    <Testimonials />
    <Footer />
  </>
);

const App = () => {
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Set initial state based on screen width

  useEffect(() => {
    // Fetch theme from localStorage
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setDarkMode(storedTheme === 'dark');
    } else {
      // Default to dark mode if no theme is stored
      localStorage.setItem('theme', 'dark');
      setDarkMode(true);
    }

    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');

    // Listen for screen resize events to update isMobile
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [darkMode]);

  // Handle theme change
  const changeTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    toast.success('Theme Changed!');
  };

  return (
    <Router>
      <Header
        changeTheme={changeTheme}
        darkMode={darkMode}
      />

      {/* Only show custom cursor on non-mobile screens */}
      {!isMobile && (
        <AnimatedCursor
          innerSize={8}
          outerSize={40}
          color="58, 128, 233"
          outerAlpha={0.5}
          innerScale={0.7}
          outerScale={1.5}
          clickables={['a', 'button', 'input', 'textarea']}
        />
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/coin/:coinID" element={<CoinPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
      </Routes>

      <ToastContainer />
    </Router>
  );
};

export default App;
