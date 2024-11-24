import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Trending from './pages/Trending';
import Premium from './pages/Premium';
import PremiumSuccess from './pages/PremiumSuccess';
import SearchResults from './pages/SearchResults';
import TrendingPage from './pages/TrendingPage';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import PremiumDivider from './components/PremiumDivider';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <div className="App min-h-screen flex flex-col bg-[#1A202C] text-white">
            <Navbar />
            <main className="flex-grow flex flex-col">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/trending" element={<Trending />} />
                <Route path="/premium" element={<Premium />} />
                <Route path="/premium/success" element={<PremiumSuccess />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/trends/:location" element={<TrendingPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </main>
            <PremiumDivider />
            <Footer />
          </div>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
