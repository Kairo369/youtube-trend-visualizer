import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function PremiumSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifySubscription = async () => {
      const sessionId = searchParams.get('session_id');
      if (!sessionId) {
        setError('Invalid session');
        setLoading(false);
        return;
      }

      try {
        // Verify the subscription with your backend
        await axios.post('/api/stripe/verify-subscription', { sessionId });
        // Refresh user data to update premium status
        await refreshUser();
        
        // Redirect to dashboard after 5 seconds
        setTimeout(() => {
          navigate('/dashboard');
        }, 5000);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to verify subscription');
      } finally {
        setLoading(false);
      }
    };

    verifySubscription();
  }, [searchParams, navigate, refreshUser]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#1A1A2E] to-[#16162A] pt-20 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-purple-500/20">
          {loading ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
              <p className="mt-4 text-gray-300">Verifying your subscription...</p>
            </div>
          ) : error ? (
            <div className="text-center">
              <div className="text-red-500 text-xl mb-4">❌</div>
              <h2 className="text-xl font-semibold text-red-400 mb-2">Subscription Error</h2>
              <p className="text-gray-400">{error}</p>
              <button
                onClick={() => navigate('/premium')}
                className="mt-6 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-green-500 text-4xl mb-4">✨</div>
              <h2 className="text-2xl font-semibold text-white mb-4">Welcome to Premium!</h2>
              <p className="text-gray-300 mb-6">
                Your subscription has been successfully activated. You now have access to all premium features.
              </p>
              <p className="text-sm text-gray-400">
                Redirecting you to the dashboard in a few seconds...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PremiumSuccess;
