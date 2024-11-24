import axios from 'axios';
import { YOUTUBE_API_KEY } from '../config/constants';

const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const fetchTrendingVideos = async (region = 'US', category = '', maxResults = 20) => {
  try {
    const response = await axios.get(`${BASE_URL}/videos`, {
      params: {
        part: 'snippet,statistics',
        chart: 'mostPopular',
        regionCode: region,
        videoCategoryId: category,
        maxResults,
        key: YOUTUBE_API_KEY,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error('Error fetching trending videos:', error);
    throw error;
  }
};

export const fetchVideoCategories = async (region = 'US') => {
  try {
    const response = await axios.get(`${BASE_URL}/videoCategories`, {
      params: {
        part: 'snippet',
        regionCode: region,
        key: YOUTUBE_API_KEY,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error('Error fetching video categories:', error);
    throw error;
  }
};
