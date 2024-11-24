import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { COLORS, API_KEYS, YOUTUBE_API_BASE_URL } from '../config/constants';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Trending() {
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('0'); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [region, setRegion] = useState('US');

  const regions = [
    { code: 'AF', name: 'Afghanistan' },
    { code: 'AL', name: 'Albania' },
    { code: 'DZ', name: 'Algeria' },
    { code: 'AD', name: 'Andorra' },
    { code: 'AO', name: 'Angola' },
    { code: 'AG', name: 'Antigua and Barbuda' },
    { code: 'AR', name: 'Argentina' },
    { code: 'AM', name: 'Armenia' },
    { code: 'AU', name: 'Australia' },
    { code: 'AT', name: 'Austria' },
    { code: 'AZ', name: 'Azerbaijan' },
    { code: 'BS', name: 'Bahamas' },
    { code: 'BH', name: 'Bahrain' },
    { code: 'BD', name: 'Bangladesh' },
    { code: 'BB', name: 'Barbados' },
    { code: 'BY', name: 'Belarus' },
    { code: 'BE', name: 'Belgium' },
    { code: 'BZ', name: 'Belize' },
    { code: 'BJ', name: 'Benin' },
    { code: 'BT', name: 'Bhutan' },
    { code: 'BO', name: 'Bolivia' },
    { code: 'BA', name: 'Bosnia and Herzegovina' },
    { code: 'BW', name: 'Botswana' },
    { code: 'BR', name: 'Brazil' },
    { code: 'BN', name: 'Brunei' },
    { code: 'BG', name: 'Bulgaria' },
    { code: 'BF', name: 'Burkina Faso' },
    { code: 'BI', name: 'Burundi' },
    { code: 'CV', name: 'Cabo Verde' },
    { code: 'KH', name: 'Cambodia' },
    { code: 'CM', name: 'Cameroon' },
    { code: 'CA', name: 'Canada' },
    { code: 'CF', name: 'Central African Republic' },
    { code: 'TD', name: 'Chad' },
    { code: 'CL', name: 'Chile' },
    { code: 'CN', name: 'China' },
    { code: 'CO', name: 'Colombia' },
    { code: 'KM', name: 'Comoros' },
    { code: 'CG', name: 'Congo' },
    { code: 'CR', name: 'Costa Rica' },
    { code: 'HR', name: 'Croatia' },
    { code: 'CU', name: 'Cuba' },
    { code: 'CY', name: 'Cyprus' },
    { code: 'CZ', name: 'Czech Republic' },
    { code: 'DK', name: 'Denmark' },
    { code: 'DJ', name: 'Djibouti' },
    { code: 'DM', name: 'Dominica' },
    { code: 'DO', name: 'Dominican Republic' },
    { code: 'EC', name: 'Ecuador' },
    { code: 'EG', name: 'Egypt' },
    { code: 'SV', name: 'El Salvador' },
    { code: 'GQ', name: 'Equatorial Guinea' },
    { code: 'ER', name: 'Eritrea' },
    { code: 'EE', name: 'Estonia' },
    { code: 'SZ', name: 'Eswatini' },
    { code: 'ET', name: 'Ethiopia' },
    { code: 'FJ', name: 'Fiji' },
    { code: 'FI', name: 'Finland' },
    { code: 'FR', name: 'France' },
    { code: 'GA', name: 'Gabon' },
    { code: 'GM', name: 'Gambia' },
    { code: 'GE', name: 'Georgia' },
    { code: 'DE', name: 'Germany' },
    { code: 'GH', name: 'Ghana' },
    { code: 'GR', name: 'Greece' },
    { code: 'GD', name: 'Grenada' },
    { code: 'GT', name: 'Guatemala' },
    { code: 'GN', name: 'Guinea' },
    { code: 'GW', name: 'Guinea-Bissau' },
    { code: 'GY', name: 'Guyana' },
    { code: 'HT', name: 'Haiti' },
    { code: 'HN', name: 'Honduras' },
    { code: 'HU', name: 'Hungary' },
    { code: 'IS', name: 'Iceland' },
    { code: 'IN', name: 'India' },
    { code: 'ID', name: 'Indonesia' },
    { code: 'IR', name: 'Iran' },
    { code: 'IQ', name: 'Iraq' },
    { code: 'IE', name: 'Ireland' },
    { code: 'IL', name: 'Israel' },
    { code: 'IT', name: 'Italy' },
    { code: 'JM', name: 'Jamaica' },
    { code: 'JP', name: 'Japan' },
    { code: 'JO', name: 'Jordan' },
    { code: 'KZ', name: 'Kazakhstan' },
    { code: 'KE', name: 'Kenya' },
    { code: 'KI', name: 'Kiribati' },
    { code: 'KP', name: 'North Korea' },
    { code: 'KR', name: 'South Korea' },
    { code: 'KW', name: 'Kuwait' },
    { code: 'KG', name: 'Kyrgyzstan' },
    { code: 'LA', name: 'Laos' },
    { code: 'LV', name: 'Latvia' },
    { code: 'LB', name: 'Lebanon' },
    { code: 'LS', name: 'Lesotho' },
    { code: 'LR', name: 'Liberia' },
    { code: 'LY', name: 'Libya' },
    { code: 'LI', name: 'Liechtenstein' },
    { code: 'LT', name: 'Lithuania' },
    { code: 'LU', name: 'Luxembourg' },
    { code: 'MG', name: 'Madagascar' },
    { code: 'MW', name: 'Malawi' },
    { code: 'MY', name: 'Malaysia' },
    { code: 'MV', name: 'Maldives' },
    { code: 'ML', name: 'Mali' },
    { code: 'MT', name: 'Malta' },
    { code: 'MH', name: 'Marshall Islands' },
    { code: 'MR', name: 'Mauritania' },
    { code: 'MU', name: 'Mauritius' },
    { code: 'MX', name: 'Mexico' },
    { code: 'FM', name: 'Micronesia' },
    { code: 'MD', name: 'Moldova' },
    { code: 'MC', name: 'Monaco' },
    { code: 'MN', name: 'Mongolia' },
    { code: 'ME', name: 'Montenegro' },
    { code: 'MA', name: 'Morocco' },
    { code: 'MZ', name: 'Mozambique' },
    { code: 'MM', name: 'Myanmar' },
    { code: 'NA', name: 'Namibia' },
    { code: 'NR', name: 'Nauru' },
    { code: 'NP', name: 'Nepal' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'NZ', name: 'New Zealand' },
    { code: 'NI', name: 'Nicaragua' },
    { code: 'NE', name: 'Niger' },
    { code: 'NG', name: 'Nigeria' },
    { code: 'MK', name: 'North Macedonia' },
    { code: 'NO', name: 'Norway' },
    { code: 'OM', name: 'Oman' },
    { code: 'PK', name: 'Pakistan' },
    { code: 'PW', name: 'Palau' },
    { code: 'PS', name: 'Palestine' },
    { code: 'PA', name: 'Panama' },
    { code: 'PG', name: 'Papua New Guinea' },
    { code: 'PY', name: 'Paraguay' },
    { code: 'PE', name: 'Peru' },
    { code: 'PH', name: 'Philippines' },
    { code: 'PL', name: 'Poland' },
    { code: 'PT', name: 'Portugal' },
    { code: 'QA', name: 'Qatar' },
    { code: 'RO', name: 'Romania' },
    { code: 'RU', name: 'Russia' },
    { code: 'RW', name: 'Rwanda' },
    { code: 'KN', name: 'Saint Kitts and Nevis' },
    { code: 'LC', name: 'Saint Lucia' },
    { code: 'VC', name: 'Saint Vincent and the Grenadines' },
    { code: 'WS', name: 'Samoa' },
    { code: 'SM', name: 'San Marino' },
    { code: 'ST', name: 'Sao Tome and Principe' },
    { code: 'SA', name: 'Saudi Arabia' },
    { code: 'SN', name: 'Senegal' },
    { code: 'RS', name: 'Serbia' },
    { code: 'SC', name: 'Seychelles' },
    { code: 'SL', name: 'Sierra Leone' },
    { code: 'SG', name: 'Singapore' },
    { code: 'SK', name: 'Slovakia' },
    { code: 'SI', name: 'Slovenia' },
    { code: 'SB', name: 'Solomon Islands' },
    { code: 'SO', name: 'Somalia' },
    { code: 'ZA', name: 'South Africa' },
    { code: 'SS', name: 'South Sudan' },
    { code: 'ES', name: 'Spain' },
    { code: 'LK', name: 'Sri Lanka' },
    { code: 'SD', name: 'Sudan' },
    { code: 'SR', name: 'Suriname' },
    { code: 'SE', name: 'Sweden' },
    { code: 'CH', name: 'Switzerland' },
    { code: 'SY', name: 'Syria' },
    { code: 'TW', name: 'Taiwan' },
    { code: 'TJ', name: 'Tajikistan' },
    { code: 'TZ', name: 'Tanzania' },
    { code: 'TH', name: 'Thailand' },
    { code: 'TL', name: 'Timor-Leste' },
    { code: 'TG', name: 'Togo' },
    { code: 'TO', name: 'Tonga' },
    { code: 'TT', name: 'Trinidad and Tobago' },
    { code: 'TN', name: 'Tunisia' },
    { code: 'TR', name: 'Turkey' },
    { code: 'TM', name: 'Turkmenistan' },
    { code: 'TV', name: 'Tuvalu' },
    { code: 'UG', name: 'Uganda' },
    { code: 'UA', name: 'Ukraine' },
    { code: 'AE', name: 'United Arab Emirates' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'US', name: 'United States' },
    { code: 'UY', name: 'Uruguay' },
    { code: 'UZ', name: 'Uzbekistan' },
    { code: 'VU', name: 'Vanuatu' },
    { code: 'VA', name: 'Vatican City' },
    { code: 'VE', name: 'Venezuela' },
    { code: 'VN', name: 'Vietnam' },
    { code: 'YE', name: 'Yemen' },
    { code: 'ZM', name: 'Zambia' },
    { code: 'ZW', name: 'Zimbabwe' }
  ];

  useEffect(() => {
    const initializeData = async () => {
      await fetchCategories();
      fetchData(); 
    };
    initializeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedCategory !== '') { 
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region, selectedCategory]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const cachedData = localStorage.getItem(`trending_${region}_${selectedCategory}`);
      const cachedTimestamp = localStorage.getItem(`trending_timestamp_${region}_${selectedCategory}`);
      
      if (cachedData && cachedTimestamp) {
        const isDataFresh = (Date.now() - parseInt(cachedTimestamp)) < 30 * 60 * 1000; 
        if (isDataFresh) {
          const parsedData = JSON.parse(cachedData);
          if (parsedData && parsedData.length > 0) {
            setVideos(parsedData);
            setLoading(false);
            return;
          }
        }
      }

      const response = await axios.get(`${YOUTUBE_API_BASE_URL}/videos`, {
        params: {
          part: 'snippet,statistics',
          chart: 'mostPopular',
          regionCode: region,
          videoCategoryId: selectedCategory === '0' ? undefined : selectedCategory,
          maxResults: 12,
          key: API_KEYS.YOUTUBE
        }
      });

      if (response.data.items && response.data.items.length > 0) {
        localStorage.setItem(`trending_${region}_${selectedCategory}`, JSON.stringify(response.data.items));
        localStorage.setItem(`trending_timestamp_${region}_${selectedCategory}`, Date.now().toString());
        setVideos(response.data.items);
      } else {
        throw new Error('No videos found');
      }
    } catch (err) {
      console.error('Error fetching videos:', err);
      if (err.response?.data?.error?.message?.includes('quota')) {
        setError(
          <div className="text-center">
            <p className="text-lg font-semibold mb-2">API Quota Exceeded</p>
            <p className="mb-4">We've reached our daily API limit. Please try again later or:</p>
            <ul className="list-disc text-left max-w-md mx-auto space-y-2 mb-4">
              <li>Check back in a few hours</li>
              <li>View cached content if available</li>
              <li>Try changing your region</li>
            </ul>
          </div>
        );
      } else {
        setError('An error occurred while fetching trending videos. Please try again later.');
      }
      const cachedData = localStorage.getItem(`trending_${region}_${selectedCategory}`);
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        if (parsedData && parsedData.length > 0) {
          setVideos(parsedData);
          setError('Showing cached data. Some information might be outdated.');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${YOUTUBE_API_BASE_URL}/videoCategories`,
        {
          params: {
            part: 'snippet',
            regionCode: region,
            key: API_KEYS.YOUTUBE,
          },
        }
      );

      const validCategories = response.data.items.filter(
        category => category.snippet.assignable
      );

      const allCategories = [
        { id: '0', snippet: { title: 'All Categories' } },
        ...validCategories
      ];

      setCategories(allCategories);
      if (selectedCategory === '') {
        setSelectedCategory('0'); 
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to fetch categories. Please try again later.');
    }
  };

  const chartData = {
    labels: videos.map(video => video.snippet.title.substring(0, 30) + '...'),
    datasets: [
      {
        label: 'Views',
        data: videos.map(video => parseInt(video.statistics.viewCount)),
        borderColor: COLORS.primary,
        backgroundColor: `${COLORS.primary}44`,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#e2e8f0'
        }
      },
      title: {
        display: true,
        text: 'Views for Trending Videos',
        color: '#e2e8f0',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(148, 163, 184, 0.1)'
        },
        ticks: {
          color: '#e2e8f0',
          callback: value => {
            if (value >= 1000000) {
              return (value / 1000000).toFixed(1) + 'M';
            }
            if (value >= 1000) {
              return (value / 1000).toFixed(1) + 'K';
            }
            return value;
          },
        },
      },
      x: {
        grid: {
          color: 'rgba(148, 163, 184, 0.1)'
        },
        ticks: {
          color: '#e2e8f0',
        }
      }
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#1A1A2E] to-[#16162A] text-white">
      <div className="container mx-auto px-4 pt-16">
        <div className="max-w-7xl mx-auto mt-16">
          <div className="flex flex-col items-center justify-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-[#6B46C1] to-purple-600 text-transparent bg-clip-text leading-tight py-2 mb-6">
              YouTube Trending Videos
            </h1>
            <p className="text-gray-400 text-lg mb-12">
              Discover what's trending across different regions and categories
            </p>
          </div>
          
          {error && (
            <div className="bg-red-500/10 backdrop-blur-lg border border-red-500/20 rounded-xl p-8 max-w-2xl mx-auto mb-12">
              <div className="text-center text-red-400 text-lg">
                {error}
              </div>
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="bg-gray-800/30 backdrop-blur-lg text-gray-200 rounded-xl px-6 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-purple-500/25 bg-gradient-to-r from-purple-500/10 to-purple-600/10"
            >
              {regions.map((r) => (
                <option key={r.code} value={r.code} className="bg-gray-800 text-gray-200">
                  {r.name}
                </option>
              ))}
            </select>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-800/30 backdrop-blur-lg text-gray-200 rounded-xl px-6 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-purple-500/25 bg-gradient-to-r from-purple-500/10 to-purple-600/10"
            >
              <option value="" className="bg-gray-800 text-gray-200">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id} className="bg-gray-800 text-gray-200">
                  {category.snippet.title}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500/80"></div>
            </div>
          ) : (
            <div className="space-y-12 mb-24">
              {videos.length > 0 ? (
                <div className="bg-gray-800/30 backdrop-blur-lg p-8 rounded-xl shadow-lg border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300">
                  <Line data={chartData} options={chartOptions} />
                </div>
              ) : (
                <div className="bg-gray-800/30 backdrop-blur-lg text-gray-200 p-8 rounded-xl text-center border border-purple-500/20">
                  No videos found for the selected category.
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {videos.map((video) => (
                  <div
                    key={video.id}
                    className="group bg-gray-800/30 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-purple-500/25 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300"
                  >
                    <a
                      href={`https://youtube.com/watch?v=${video.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={video.snippet.thumbnails.high.url}
                          alt={video.snippet.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-200 mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors duration-300">
                          {video.snippet.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-3">
                          {video.snippet.channelTitle}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-400">
                          <span>{parseInt(video.statistics.viewCount).toLocaleString()} views</span>
                          <span>{new Date(video.snippet.publishedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Trending;
