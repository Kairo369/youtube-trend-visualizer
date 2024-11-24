import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, isPremiumUser } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#1A1A2E] to-[#16162A] flex flex-col">
      <div className="flex-grow container mx-auto px-4 flex items-center justify-center">
        <div className="max-w-4xl w-full bg-gray-800/50 backdrop-blur-md rounded-xl shadow-lg overflow-hidden my-8">
          <div className="p-10">
            <div className="flex items-center space-x-8">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-28 h-28 rounded-full border-4 border-purple-400 shadow-lg"
              />
              <div>
                <h1 className="text-3xl font-bold text-white">{user.name}</h1>
                <p className="text-gray-400">{user.email}</p>
                {isPremiumUser() && (
                  <span className="inline-flex items-center px-3 py-1 mt-2 rounded-full text-sm font-medium bg-gradient-to-r from-[#9F7AEA] to-[#aa6bfe] text-white shadow-lg">
                    Premium Member
                  </span>
                )}
              </div>
            </div>

            <div className="mt-8 space-y-6">
              <div className="bg-gray-700 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Account Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Account Type</label>
                    <p className="text-white">{isPremiumUser() ? 'Premium' : 'Basic'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Member Since</label>
                    <p className="text-white">January 2024</p>
                  </div>
                </div>
              </div>

              {!isPremiumUser() && (
                <div className="bg-gray-700 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Upgrade to Premium</h2>
                  <p className="text-gray-300 mb-4">
                    Get access to advanced analytics, real-time notifications, and more with our premium features.
                  </p>
                  <button
                    onClick={() => navigate('/premium')}
                    className="px-6 py-2 bg-gradient-to-r from-[#9F7AEA] to-[#aa6bfe] text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Upgrade Now
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
