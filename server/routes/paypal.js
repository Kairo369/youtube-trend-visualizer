const express = require('express');
const router = express.Router();
const paypal = require('@paypal/checkout-server-sdk');

// Configure PayPal environment
const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_CLIENT_SECRET
);
const client = new paypal.core.PayPalHttpClient(environment);

// Middleware to verify authentication
const requireAuth = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ error: 'No authorization token provided' });
    }

    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Invalid authorization format' });
    }

    // Here you would typically verify the JWT token
    // For now, we'll just set the user object
    req.user = { token };
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ error: 'Authentication failed' });
  }
};

// Create order endpoint
router.post('/create-order', requireAuth, async (req, res) => {
  try {
    console.log('Creating PayPal order...');
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'USD',
          value: '9.99',
          breakdown: {
            item_total: {
              currency_code: 'USD',
              value: '9.99'
            }
          }
        },
        items: [{
          name: "YouTube Trend Visualizer Premium",
          quantity: "1",
          unit_amount: {
            currency_code: "USD",
            value: "9.99"
          },
          category: "DIGITAL_GOODS"
        }],
        description: 'YouTube Trend Visualizer Premium Subscription'
      }],
      application_context: {
        shipping_preference: "NO_SHIPPING",
        user_action: "PAY_NOW"
      }
    });

    console.log('Executing PayPal order request...');
    const order = await client.execute(request);
    console.log('Order created successfully:', order.result);
    res.json({ orderId: order.result.id });
  } catch (error) {
    console.error('PayPal order creation error:', error);
    if (error.statusCode) {
      res.status(error.statusCode).json({ 
        error: error.message || 'Failed to create order',
        details: error.details || []
      });
    } else {
      res.status(500).json({ error: 'Failed to create order' });
    }
  }
});

// Capture payment endpoint
router.post('/capture-payment', requireAuth, async (req, res) => {
  try {
    console.log('Capturing payment for order:', req.body.orderId);
    const { orderId } = req.body;
    if (!orderId) {
      return res.status(400).json({ error: 'Order ID is required' });
    }

    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});
    
    console.log('Executing payment capture...');
    const capture = await client.execute(request);
    console.log('Payment captured successfully:', capture.result);
    
    const captureId = capture.result.purchase_units[0].payments.captures[0].id;
    
    // Here you would:
    // 1. Update user's subscription status in database
    // 2. Create subscription record
    // 3. Send confirmation email
    
    res.json({
      success: true,
      captureId,
      message: 'Payment captured successfully'
    });
  } catch (error) {
    console.error('PayPal payment capture error:', error);
    if (error.statusCode) {
      res.status(error.statusCode).json({ 
        error: error.message || 'Failed to capture payment',
        details: error.details || []
      });
    } else {
      res.status(500).json({ error: 'Failed to capture payment' });
    }
  }
});

// Subscription webhook endpoint
router.post('/webhook', async (req, res) => {
  try {
    const event = req.body;
    console.log('Received webhook event:', event.event_type);
    
    // Verify webhook signature (implement in production)
    // const isValid = await verifyWebhookSignature(req);
    // if (!isValid) return res.status(400).send('Invalid signature');
    
    switch (event.event_type) {
      case 'PAYMENT.CAPTURE.COMPLETED':
        console.log('Payment successful:', event.resource);
        break;
      case 'BILLING.SUBSCRIPTION.ACTIVATED':
        console.log('Subscription activated:', event.resource);
        break;
      case 'BILLING.SUBSCRIPTION.CANCELLED':
        console.log('Subscription cancelled:', event.resource);
        break;
      default:
        console.log('Unhandled webhook event:', event.event_type);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

module.exports = router;
