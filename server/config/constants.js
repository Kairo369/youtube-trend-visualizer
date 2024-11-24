const SUBSCRIPTION_PLANS = {
  PREMIUM: {
    id: 'premium',
    name: 'Premium Plan',
    price: 9.99,
    features: [
      'Unlimited trend analysis',
      'Advanced analytics',
      'Custom reports',
      'Priority support',
      'Early access to new features'
    ]
  }
};

const STRIPE_CONFIG = {
  SUCCESS_URL: process.env.NODE_ENV === 'production' 
    ? 'https://your-domain.com/premium/success'
    : 'http://localhost:3000/premium/success',
  CANCEL_URL: process.env.NODE_ENV === 'production'
    ? 'https://your-domain.com/premium'
    : 'http://localhost:3000/premium'
};

module.exports = {
  SUBSCRIPTION_PLANS,
  STRIPE_CONFIG
};
