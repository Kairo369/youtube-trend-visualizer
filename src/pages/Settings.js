import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { user, isPremiumUser } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);

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
            <h1 className="text-4xl font-bold text-white mb-10">Settings</h1>

            <div className="space-y-8">
              <div className="bg-gray-700 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Notifications</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-white font-medium">Push Notifications</label>
                      <p className="text-gray-400 text-sm">Receive notifications about new trends</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications}
                        onChange={(e) => setNotifications(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#9F7AEA]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-white font-medium">Email Updates</label>
                      <p className="text-gray-400 text-sm">Receive weekly trend reports</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={emailUpdates}
                        onChange={(e) => setEmailUpdates(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#9F7AEA]"></div>
                    </label>
                  </div>
                </div>
              </div>

              {isPremiumUser() ? (
                <>
                  <div className="bg-gray-700 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Subscription Management</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400">Current Plan</label>
                        <p className="text-white">Premium Plan</p>
                        <p className="text-gray-400 text-sm mt-1">Next billing date: February 15, 2024</p>
                      </div>
                      <button
                        onClick={() => {/* Handle subscription management */}}
                        className="px-4 py-2 bg-gradient-to-r from-[#9F7AEA] to-[#aa6bfe] text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Manage Subscription
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-700 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Billing Information</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400">Payment Method</label>
                        <p className="text-white">•••• •••• •••• 4242</p>
                        <p className="text-gray-400 text-sm mt-1">Expires 12/25</p>
                      </div>
                      <div className="flex space-x-4">
                        <button
                          onClick={() => {/* Handle payment update */}}
                          className="px-4 py-2 bg-gradient-to-r from-[#9F7AEA] to-[#aa6bfe] text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          Update Payment
                        </button>
                        <button
                          onClick={() => {/* Handle view invoices */}}
                          className="px-4 py-2 bg-gray-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          View Invoices
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-gray-700 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Upgrade to Premium</h2>
                  <div className="space-y-4">
                    <div className="text-gray-300">
                      <p className="mb-2">Unlock premium features and take your trend analysis to the next level:</p>
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>Advanced analytics and trend predictions</li>
                        <li>Real-time notifications for trending content</li>
                        <li>Detailed insights and performance metrics</li>
                        <li>Priority support and feature updates</li>
                      </ul>
                    </div>
                    <button
                      onClick={() => navigate('/premium')}
                      className="w-full px-6 py-3 bg-gradient-to-r from-[#9F7AEA] to-[#aa6bfe] text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
                    >
                      Upgrade to Premium
                    </button>
                  </div>
                </div>
              )}

              {isPremiumUser() && (
                <div className="bg-gray-700 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Premium Features</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-white font-medium">Advanced Analytics</label>
                        <p className="text-gray-400 text-sm">Enable detailed trend analysis</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked={true}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#9F7AEA]"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
