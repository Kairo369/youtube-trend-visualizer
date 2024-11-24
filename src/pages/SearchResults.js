import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('relevance');
  const [videoStats, setVideoStats] = useState({});
  const [copiedId, setCopiedId] = useState(null);
  const [regionCode, setRegionCode] = useState('US');

  const regions = {
    US: 'United States',
    GB: 'United Kingdom',
    CA: 'Canada',
    AU: 'Australia',
    IN: 'India',
    JP: 'Japan',
    KR: 'South Korea',
    FR: 'France',
    DE: 'Germany',
    BR: 'Brazil',
    RU: 'Russia',
    IT: 'Italy',
    ES: 'Spain',
    NL: 'Netherlands',
    SE: 'Sweden'
  };

  const query = searchParams.get('q');

  const fetchVideoStats = async (videoIds) => {
    try {
      const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos`,
        {
          params: {
            part: 'statistics,snippet',
            id: videoIds.join(','),
            key: API_KEY
          }
        }
      );
      
      const statsMap = {};
      response.data.items.forEach(item => {
        statsMap[item.id] = {
          viewCount: parseInt(item.statistics.viewCount) || 0,
          publishedAt: item.snippet.publishedAt
        };
      });
      setVideoStats(statsMap);
    } catch (err) {
      console.error('Error fetching video stats:', err);
    }
  };

  const handleCopyLink = (videoId) => {
    const link = `https://www.youtube.com/watch?v=${videoId}`;
    navigator.clipboard.writeText(link);
    setCopiedId(videoId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search`,
          {
            params: {
              part: 'snippet',
              maxResults: 25,
              q: query,
              type: 'video',
              order: sortBy,
              regionCode: regionCode,
              key: API_KEY
            }
          }
        );

        setResults(response.data.items);
        
        // Fetch stats for all videos
        const videoIds = response.data.items.map(item => item.id.videoId);
        await fetchVideoStats(videoIds);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, sortBy, regionCode]);

  const sortedResults = [...results].sort((a, b) => {
    if (sortBy === 'viewCount') {
      return (videoStats[b.id.videoId]?.viewCount || 0) - (videoStats[a.id.videoId]?.viewCount || 0);
    } else if (sortBy === 'date') {
      return new Date(videoStats[b.id.videoId]?.publishedAt || b.snippet.publishedAt) - new Date(videoStats[a.id.videoId]?.publishedAt || a.snippet.publishedAt);
    }
    return 0;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#1A1A2E] to-[#16162A] pt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto mt-16">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500/80"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#1A1A2E] to-[#16162A] pt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto mt-16">
            <div className="bg-red-500/10 backdrop-blur-lg border border-red-500/20 rounded-2xl p-8 max-w-2xl mx-auto">
              <div className="text-center text-red-400 text-lg">
                Error: {error}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#1A1A2E] to-[#16162A] pt-16">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto mt-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-[#6B46C1] to-purple-600 text-transparent bg-clip-text leading-tight py-2 mb-6 md:mb-0">
              Search Results for "{query}"
            </h1>
            <div className="flex flex-col md:flex-row gap-4">
              <select
                value={regionCode}
                onChange={(e) => setRegionCode(e.target.value)}
                className="bg-gray-800/30 backdrop-blur-lg text-gray-200 rounded-xl px-6 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-purple-500/25 bg-gradient-to-r from-purple-500/10 to-purple-600/10"
              >
                {Object.entries(regions).map(([code, name]) => (
                  <option key={code} value={code} className="bg-gray-800 text-gray-200">
                    {name}
                  </option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-800/30 backdrop-blur-lg text-gray-200 rounded-xl px-6 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-purple-500/25 bg-gradient-to-r from-purple-500/10 to-purple-600/10"
              >
                <option value="relevance" className="bg-gray-800 text-gray-200">Sort by Relevance</option>
                <option value="viewCount" className="bg-gray-800 text-gray-200">Sort by Views (Highest to Lowest)</option>
                <option value="date" className="bg-gray-800 text-gray-200">Sort by Date (Latest Today)</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {sortedResults.map((item) => (
              <div key={item.id.videoId} className="group bg-gray-800/50 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300">
                <img
                  src={item.snippet.thumbnails.medium.url}
                  alt={item.snippet.title}
                  className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-3 line-clamp-2 text-gray-200 group-hover:text-purple-400 transition-colors duration-300">
                    {item.snippet.title}
                  </h2>
                  <p className="text-gray-400 text-sm mb-3">
                    {item.snippet.channelTitle}
                  </p>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                    {item.snippet.description}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                    <span>{videoStats[item.id.videoId]?.viewCount?.toLocaleString() || '0'} views</span>
                    <span>{new Date(videoStats[item.id.videoId]?.publishedAt || item.snippet.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <a
                      href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center px-6 py-3 bg-purple-600/80 backdrop-blur-sm text-white rounded-xl hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                    >
                      Watch Video
                    </a>
                    <button
                      onClick={() => handleCopyLink(item.id.videoId)}
                      className="px-4 py-3 bg-gray-700/50 backdrop-blur-sm text-white rounded-xl hover:bg-gray-600/50 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 border border-purple-500/20 hover:border-purple-500/50"
                      title="Copy video link"
                    >
                      {copiedId === item.id.videoId ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {sortedResults.length === 0 && (
            <div className="text-center text-gray-400 text-lg mt-12">
              No results found for "{query}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
