export const COLORS = {
  primary: '#6B46C1',
  secondary: '#4A5568',
  white: '#FFFFFF',
  text: {
    primary: '#1A202C',
    secondary: '#4A5568',
  },
  background: {
    light: '#F7FAFC',
    dark: '#1A202C',
  }
};

export const API_KEYS = {
  YOUTUBE: process.env.REACT_APP_YOUTUBE_API_KEY || 'AIzaSyBgHkWFJDjy8X2SeuG5GaRzCqSGVCSvTqk',
  STRIPE: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_live_51MrHcUSDWLeyUEQmHiwjOsnXmpfJaFs3xKUEa6S4GZK2g08VdPsNi4bUvchtBkKdFTveyshnsrC0CQwRYn7jIdoa000WSsGShB'
};

export const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const SUBSCRIPTION_PLANS = {
  PREMIUM: {
    id: 'premium_monthly',
    name: 'Premium',
    price: 9.99,
    features: [
      'Advanced Analytics',
      'Real-time Trend Alerts',
      'Custom Reports',
      'API Access',
      'Priority Support'
    ]
  }
};
