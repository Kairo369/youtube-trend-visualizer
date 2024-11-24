const express = require('express');
const router = express.Router();
const StripeService = require('../services/stripe.service');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { SUBSCRIPTION_PLANS } = require('../config/constants');

// Create checkout session
router.post('/create-checkout-session', async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const session = await StripeService.createCheckoutSession(req.user.id, {
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: SUBSCRIPTION_PLANS.PREMIUM.name,
              description: 'Access to all premium features',
            },
            unit_amount: Math.round(SUBSCRIPTION_PLANS.PREMIUM.price * 100), // Convert to cents
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.CLIENT_URL}/premium/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/premium`,
      metadata: {
        userId: req.user.id, // Assuming you have user data in request
      },
    });
    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Stripe session creation error:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// Verify subscription
router.post('/verify-subscription', async (req, res) => {
  try {
    const { sessionId } = req.body;
    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID is required' });
    }

    const { verified, userId } = await StripeService.verifySession(sessionId);
    if (!verified) {
      return res.status(400).json({ error: 'Payment not verified' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Subscription verification error:', error);
    res.status(500).json({ error: 'Failed to verify subscription' });
  }
});

// Cancel subscription
router.post('/cancel-subscription', async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { subscriptionId } = req.body;
    if (!subscriptionId) {
      return res.status(400).json({ error: 'Subscription ID is required' });
    }

    await StripeService.cancelSubscription(subscriptionId);
    res.json({ success: true });
  } catch (error) {
    console.error('Subscription cancellation error:', error);
    res.status(500).json({ error: 'Failed to cancel subscription' });
  }
});

// Stripe webhook
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    await StripeService.handleWebhookEvent(event);
    res.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

module.exports = router;
