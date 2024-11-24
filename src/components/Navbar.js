import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaSearch, FaBell, FaRegUser } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import AuthModal from './AuthModal';
import NotificationPanel from './NotificationPanel';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [show, setShow] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isPremiumUser } = useAuth();
  const { unreadCount, checkForNewTrends } = useNotifications();
  const menuRef = useRef(null);
  const searchRef = useRef(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (isSearchOpen && searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
      if (showNotifications && notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchOpen, showNotifications]);

  // Close menu when route changes
  useEffect(() => {
    setIsUserMenuOpen(false);
    setIsSearchOpen(false);
    setShowNotifications(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      setIsUserMenuOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleNotificationClick = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    if (!isPremiumUser()) {
      navigate('/premium');
      return;
    }
    setShowNotifications(!showNotifications);
    checkForNewTrends();
  };

  const handleSignInClick = () => {
    setIsAuthModalOpen(true);
  };

  return (
    <nav className={`bg-[#aa6bfe] shadow-xl sticky top-0 z-50 transition-all duration-300 relative
      ${isScrolled ? 'border-b-[4px]' : 'border-b-[6px]'}
      before:absolute before:bottom-0 before:left-0 before:right-0 before:h-[4px] before:bg-gradient-to-r before:from-white before:via-purple-300 before:to-purple-400 before:animate-shimmer
      after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[4px] after:bg-gradient-to-r after:from-transparent after:via-white/30 after:to-transparent after:animate-shine`}
    >
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes shine {
          0% { transform: translateX(-200%); }
          100% { transform: translateX(200%); }
        }
        .animate-shimmer {
          background-size: 1000px 100%;
          animation: shimmer 8s linear infinite;
        }
        .animate-shine {
          animation: shine 3s ease-in-out infinite;
        }
      `}</style>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-3'
      }`}>
        <div className="flex items-center justify-between">
          {/* Left side with logo */}
          <div className="flex-shrink-0 flex items-center overflow-hidden h-full">
            <Link 
              to="/" 
              className="transform hover:scale-105 transition-all duration-300 relative group -ml-4"
            >
              <img 
                className="h-44 w-auto object-contain" 
                src="/logo/logo3.jpeg" 
                alt="YouTube Trend Visualizer" 
              />
            </Link>
          </div>

          {/* Center navigation with brackets */}
          <div className="hidden md:flex items-center space-x-8 flex-1 justify-center">
            {/* Left angle bracket < separator */}
            <div className="relative h-16 w-12">
              {/* Main lines of the < shape */}
              <div className="absolute top-0 left-1 h-[140%] w-[3px] bg-gradient-to-b from-white via-purple-300 to-purple-400 transform origin-bottom-left rotate-[-35deg] translate-y-[-15%] rounded-sm shadow-[0_0_10px_rgba(255,255,255,0.4)]"></div>
              <div className="absolute bottom-0 left-1 h-[140%] w-[3px] bg-gradient-to-t from-white via-purple-300 to-purple-400 transform origin-top-left rotate-[35deg] translate-y-[15%] rounded-sm shadow-[0_0_10px_rgba(255,255,255,0.4)]"></div>
              {/* Shine effects */}
              <div className="absolute top-0 left-1 h-[140%] w-[1px] bg-white/30 transform origin-bottom-left rotate-[-35deg] translate-y-[-15%] rounded-sm blur-[1px] animate-pulse"></div>
              <div className="absolute bottom-0 left-1 h-[140%] w-[1px] bg-white/30 transform origin-top-left rotate-[35deg] translate-y-[15%] rounded-sm blur-[1px] animate-pulse"></div>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-12">
              <Link
                to="/"
                className={`relative group ${
                  location.pathname === '/' 
                    ? 'text-white' 
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <span className="text-lg font-medium tracking-wide transition-all duration-300 group-hover:text-shadow-glow">Home</span>
                <div className={`absolute -bottom-1.5 left-0 w-full h-0.5 rounded-full transition-all duration-300 transform origin-left
                  ${location.pathname === '/' 
                    ? 'bg-gradient-to-r from-white via-purple-300 to-purple-400 scale-x-100 shadow-glow' 
                    : 'bg-white/30 scale-x-0 group-hover:scale-x-100'
                  }`}
                ></div>
              </Link>

              <Link
                to="/trending"
                className={`relative group ${
                  location.pathname === '/trending'
                    ? 'text-white'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <span className="text-lg font-medium tracking-wide transition-all duration-300 group-hover:text-shadow-glow">Trending</span>
                <div className={`absolute -bottom-1.5 left-0 w-full h-0.5 rounded-full transition-all duration-300 transform origin-left
                  ${location.pathname === '/trending' 
                    ? 'bg-gradient-to-r from-white via-purple-300 to-purple-400 scale-x-100 shadow-glow' 
                    : 'bg-white/30 scale-x-0 group-hover:scale-x-100'
                  }`}
                ></div>
              </Link>

              <Link
                to="/premium"
                className={`relative group ${
                  location.pathname === '/premium'
                    ? 'text-white'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <span className="text-lg font-medium tracking-wide transition-all duration-300 group-hover:text-shadow-glow">Premium</span>
                <div className={`absolute -bottom-1.5 left-0 w-full h-0.5 rounded-full transition-all duration-300 transform origin-left
                  ${location.pathname === '/premium' 
                    ? 'bg-gradient-to-r from-white via-purple-300 to-purple-400 scale-x-100 shadow-glow' 
                    : 'bg-white/30 scale-x-0 group-hover:scale-x-100'
                  }`}
                ></div>
              </Link>
            </div>

            {/* Right angle bracket > separator */}
            <div className="relative h-16 w-12">
              {/* Main lines of the > shape */}
              <div className="absolute top-0 right-1 h-[140%] w-[3px] bg-gradient-to-b from-white via-purple-300 to-purple-400 transform origin-bottom-right rotate-[35deg] translate-y-[-15%] rounded-sm shadow-[0_0_10px_rgba(255,255,255,0.4)]"></div>
              <div className="absolute bottom-0 right-1 h-[140%] w-[3px] bg-gradient-to-t from-white via-purple-300 to-purple-400 transform origin-top-right rotate-[-35deg] translate-y-[15%] rounded-sm shadow-[0_0_10px_rgba(255,255,255,0.4)]"></div>
              {/* Shine effects */}
              <div className="absolute top-0 right-1 h-[140%] w-[1px] bg-white/30 transform origin-bottom-right rotate-[35deg] translate-y-[-15%] rounded-sm blur-[1px] animate-pulse"></div>
              <div className="absolute bottom-0 right-1 h-[140%] w-[1px] bg-white/30 transform origin-top-right rotate-[-35deg] translate-y-[15%] rounded-sm blur-[1px] animate-pulse"></div>
            </div>
          </div>

          {/* Right side items */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search button */}
            <div className={`flex items-center space-x-4 ${isSearchOpen ? 'hidden md:flex' : ''}`}>
              <button
                onClick={() => {
                  setIsSearchOpen(true);
                  setTimeout(() => searchRef.current?.focus(), 100);
                }}
                className={`relative group p-2 ${
                  isSearchOpen 
                    ? 'text-white' 
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <span className="flex items-center transition-all duration-300 group-hover:text-shadow-glow">
                  <FaSearch className="h-5 w-5 search-icon" />
                </span>
                <div className={`absolute -bottom-1.5 left-0 w-full h-0.5 rounded-full transition-all duration-300 transform origin-left
                  ${isSearchOpen 
                    ? 'bg-gradient-to-r from-white via-purple-300 to-purple-400 scale-x-100 shadow-glow' 
                    : 'bg-gradient-to-r from-white via-purple-300 to-purple-400 scale-x-0 group-hover:scale-x-100'
                  }`}
                ></div>
              </button>

              {/* Notifications */}
              <div className="relative nav-menu" ref={notificationRef}>
                <button
                  onClick={handleNotificationClick}
                  className={`relative group p-2 ${
                    showNotifications 
                      ? 'text-white' 
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  <span className="flex items-center transition-all duration-300 group-hover:text-shadow-glow">
                    <FaBell className={`h-5 w-5 ${unreadCount > 0 ? 'animate-bounce' : ''}`} />
                  </span>
                  <div className={`absolute -bottom-1.5 left-0 w-full h-0.5 rounded-full transition-all duration-300 transform origin-left scale-x-0
                    ${showNotifications 
                      ? 'bg-gradient-to-r from-white via-purple-300 to-purple-400 scale-x-100 shadow-glow' 
                      : 'bg-gradient-to-r from-white via-purple-300 to-purple-400 group-hover:scale-x-100'
                    }`}
                  ></div>
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[#9F7AEA] to-[#aa6bfe] rounded-full shadow-md animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>
                {showNotifications && <NotificationPanel onClose={() => setShowNotifications(false)} />}
              </div>
            </div>

            {/* User menu */}
            <div className="relative">
              {user ? (
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-3 group focus:outline-none"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-8 w-8 rounded-full border-2 border-purple-400 group-hover:border-white transition-colors duration-200"
                    />
                    <span className="text-white group-hover:text-[#9F7AEA]">{user.name}</span>
                  </button>

                  {isUserMenuOpen && (
                    <div 
                      className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg py-2 border border-gray-100 z-50"
                      onClick={e => e.stopPropagation()}
                    >
                      <Link
                        to="/profile"
                        className="block w-full text-left px-4 py-2 text-gray-600 hover:text-[#9F7AEA] hover:bg-purple-50 transition-colors duration-200"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="block w-full text-left px-4 py-2 text-gray-600 hover:text-[#9F7AEA] hover:bg-purple-50 transition-colors duration-200"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-600 hover:text-[#9F7AEA] hover:bg-purple-50 transition-colors duration-200"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  onClick={handleSignInClick}
                  className="relative group px-8 py-3 rounded-xl font-medium transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#9F7AEA] to-[#aa6bfe] rounded-xl transition-all duration-300 group-hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.4)]"></div>
                  {/* Shine effect overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                  </div>
                  <span className="relative text-white text-lg font-bold flex items-center tracking-wide">
                    <FaRegUser className="mr-3 h-5 w-5" />
                    <span className="drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">Sign In</span>
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-purple-200 focus:outline-none transition-colors duration-200"
            >
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Search overlay */}
      {isSearchOpen && (
        <div 
          ref={searchRef}
          className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 p-4"
        >
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => {
                  setTimeout(() => {
                    if (searchQuery.trim() === '') {
                      setIsSearchOpen(false);
                    }
                  }, 200);
                }}
                autoFocus
                placeholder="Search trends..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#9F7AEA] focus:ring-2 focus:ring-[#9F7AEA] focus:ring-opacity-20 outline-none transition-all duration-200"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#9F7AEA] transition-colors duration-200"
              >
                <FaSearch className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-[#aa6bfe] shadow-lg border-t border-purple-400">
          <div className="px-4 pt-3 pb-4 space-y-3">
            <Link
              to="/"
              className={`relative block px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg ${
                location.pathname === '/' 
                  ? 'text-[#9F7AEA] font-bold bg-purple-50' 
                  : 'text-white hover:text-[#9F7AEA] hover:bg-purple-50'
              }`}
            >
              Home
            </Link>
            <Link
              to="/trending"
              className={`relative block px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg ${
                location.pathname === '/trending'
                  ? 'text-[#9F7AEA] font-bold bg-purple-50'
                  : 'text-white hover:text-[#9F7AEA] hover:bg-purple-50'
              }`}
            >
              Trending
            </Link>
            <Link
              to="/premium"
              className={`relative block px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg ${
                location.pathname === '/premium'
                  ? 'text-[#9F7AEA] font-bold bg-purple-50'
                  : 'text-white hover:text-[#9F7AEA] hover:bg-purple-50'
              }`}
            >
              Premium
            </Link>
            <div className="mt-6 px-2">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 px-4 py-2">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-10 w-10 rounded-full border-2 border-[#9F7AEA]"
                    />
                    <span className="text-white font-medium">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-white hover:text-[#9F7AEA] hover:bg-purple-50 transition-colors duration-200 rounded-lg"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleSignInClick}
                  className="relative w-full group px-6 py-3 rounded-xl font-medium transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#9F7AEA] to-[#aa6bfe] rounded-xl transition-all duration-300 group-hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.4)]"></div>
                  {/* Shine effect overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                  </div>
                  <span className="relative text-white text-lg font-bold flex items-center justify-center tracking-wide">
                    <FaRegUser className="mr-3 h-5 w-5" />
                    <span className="drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">Sign In</span>
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
          initialMode="login"
        />
      )}
    </nav>
  );
}

export default Navbar;
