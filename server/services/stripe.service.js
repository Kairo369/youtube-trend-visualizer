const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { SUBSCRIPTION_PLANS, STRIPE_CONFIG } = require('../config/constants');

class StripeService {
  static async createCheckoutSession(userId) {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: SUBSCRIPTION_PLANS.PREMIUM.name,
                description: 'Access to all premium features',
              },
              unit_amount: Math.round(SUBSCRIPTION_PLANS.PREMIUM.price * 100),
              recurring: {
                interval: 'month',
              },
            },
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${STRIPE_CONFIG.SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: STRIPE_CONFIG.CANCEL_URL,
        metadata: {
          userId,
        },
      });

      return session;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  }

  static async verifySession(sessionId) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      return {
        verified: session.payment_status === 'paid',
        userId: session.metadata.userId,
      };
    } catch (error) {
      console.error('Error verifying session:', error);
      throw error;
    }
  }

  static async cancelSubscription(subscriptionId) {
    try {
      return await stripe.subscriptions.cancel(subscriptionId);
    } catch (error) {
      console.error('Error canceling subscription:', error);
      throw error;
    }
  }

  static async handleWebhookEvent(event) {
    switch (event.type) {
      case 'checkout.session.completed':
        await this.handleSuccessfulSubscription(event.data.object);
        break;
      case 'customer.subscription.deleted':
        await this.handleCancelledSubscription(event.data.object);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  }

  static async handleSuccessfulSubscription(session) {
    // Update user's subscription status in your database
    const userId = session.metadata.userId;
    // Implement your database update logic here
    console.log(`Subscription activated for user ${userId}`);
  }

  static async handleCancelledSubscription(subscription) {
    // Remove user's premium status in your database
    const userId = subscription.metadata.userId;
    // Implement your database update logic here
    console.log(`Subscription cancelled for user ${userId}`);
  }
}

module.exports = StripeService;
