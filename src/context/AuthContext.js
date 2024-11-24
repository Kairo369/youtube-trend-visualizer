import React, { createContext, useState, useContext, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
      localStorage.removeItem('user');
    }
    setLoading(false);
  }, []);

  const isPremiumUser = () => {
    return user?.isPremium || false;
  };

  const upgradeToPremium = () => {
    if (user) {
      const updatedUser = { ...user, isPremium: true };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return true;
    }
    return false;
  };

  const login = async (email, password) => {
    try {
      if (email && password) {
        const mockUser = {
          id: '1',
          email,
          name: email.split('@')[0],
          avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=6B46C1&color=fff`,
          isPremium: false
        };
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        return { success: true };
      }
      throw new Error('Invalid credentials');
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  const loginWithGoogle = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const googleUser = {
        id: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        avatar: decoded.picture,
        isPremium: false
      };
      setUser(googleUser);
      localStorage.setItem('user', JSON.stringify(googleUser));
      return { success: true };
    } catch (error) {
      console.error('Google login error:', error);
      return { success: false, error: error.message };
    }
  };

  const register = async (email, password, name) => {
    try {
      if (email && password && name) {
        const mockUser = {
          id: '1',
          email,
          name,
          avatar: `https://ui-avatars.com/api/?name=${name}&background=6B46C1&color=fff`,
          isPremium: false
        };
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        return { success: true };
      }
      throw new Error('Invalid registration details');
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    try {
      setUser(null);
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    loginWithGoogle,
    logout,
    register,
    isPremiumUser,
    upgradeToPremium
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    </GoogleOAuthProvider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
