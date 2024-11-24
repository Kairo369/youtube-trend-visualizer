# Trend Buster Server - Stripe Integration

This is the backend server for Trend Buster's premium subscription functionality using Stripe.

## Setup Instructions

1. Install dependencies:
```bash
cd server
npm install
```

2. Set up your Stripe account:
   - Go to [Stripe Dashboard](https://dashboard.stripe.com/)
   - Create a new account or sign in
   - Get your API keys from the Developers section
   - Create a Premium product and subscription price in the Products section
   - Note down the Price ID

3. Configure Stripe Webhook:
   - In the Stripe Dashboard, go to Developers > Webhooks
   - Add an endpoint: `http://your-domain/api/stripe/webhook`
   - Select events to listen for: `checkout.session.completed`
   - Get the Webhook Signing Secret

4. Update the .env file with your Stripe credentials:
```env
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_PRICE_ID=your_premium_plan_price_id
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
CLIENT_URL=http://localhost:3000
PORT=5000
```

5. Start the server:
```bash
npm run dev
```

## Testing

1. Use Stripe's test cards for testing:
   - Success: 4242 4242 4242 4242
   - Decline: 4000 0000 0000 0002

2. Use any future expiration date and any 3-digit CVC

## Important Notes

- Keep your Stripe secret key and webhook secret secure
- Never commit the .env file to version control
- Use test mode in Stripe dashboard during development
- Update the webhook URL when deploying to production
