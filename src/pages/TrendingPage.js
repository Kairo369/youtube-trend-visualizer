import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';

export default function TrendingPage() {
  const { location } = useParams();
  const { user } = useAuth();
  const { notifications } = useNotifications();
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrends = async () => {
      if (!user?.isPremium) {
        setError('Premium subscription required to view trends');
        setLoading(false);
        return;
      }

      try {
        // For now, we'll use the notification data as our source of trends
        const locationTrends = notifications
          .filter(n => n.type === 'TREND' && n.data.location === location)
          .map(n => n.data.trends)
          .flat();

        setTrends(locationTrends);
        setLoading(false);
      } catch (err) {
        setError('Failed to load trends');
        setLoading(false);
      }
    };

    fetchTrends();
  }, [location, user, notifications]);

  if (!user?.isPremium) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Premium Feature
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Upgrade to premium to access trending content in your preferred locations.
            </p>
            <button className="mt-8 bg-[#6B46C1] text-white px-6 py-3 rounded-md hover:bg-[#553499] transition-colors duration-200">
              Upgrade to Premium
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6B46C1]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Error</h2>
            <p className="mt-2 text-gray-500">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Trending in {location}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trends.map((trend, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              <img
                src={trend.thumbnail}
                alt={trend.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {trend.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {trend.views.toLocaleString()} views
                </p>
                <a
                  href={`https://youtube.com/watch?v=${trend.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center text-[#6B46C1] hover:text-[#553499]"
                >
                  Watch on YouTube
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
