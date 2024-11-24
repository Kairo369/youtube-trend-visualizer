import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the return URL from state, defaulting to '/'
  const from = location.state?.from || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      const result = await login(email, password);
      if (result.success) {
        navigate(from);
      } else {
        setError('Failed to sign in');
      }
    } catch {
      setError('Failed to sign in');
    }
    setLoading(false);
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setError('');
      setLoading(true);
      const result = await loginWithGoogle(credentialResponse);
      if (result.success) {
        navigate(from);
      } else {
        setError('Failed to sign in with Google');
      }
    } catch {
      setError('Failed to sign in with Google');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#1A1A2E] to-[#16162A] pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-purple-500/20">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Sign In</h2>
            
            {error && (
              <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-center">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-800/50 text-gray-400">Or continue with</span>
                </div>
              </div>

              <div className="mt-6">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => setError('Failed to sign in with Google')}
                  size="large"
                  width="100%"
                  theme="filled_black"
                  text="signin_with"
                  shape="rectangular"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
